export default function ({
  $axios,
  $toast,
  $swal,
  redirect
}) {

  let token = localStorage.getItem('token')
      
  $axios.onRequest(config => {
    config.headers.common['Authorization'] = `Bearer ${token}`;
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      $swal({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,

      })

    }

    if (code === 401) {

      console.log(error.response)

      $swal({
        icon: 'error',
        title: 'Oops...',
        text: "You are not allowed to This Page",

      })
      window.location = '/auth/login'

    }
  })
}