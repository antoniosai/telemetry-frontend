export default function ({
  $axios,
  $toast,
  $swal,
  redirect
}) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    console.log(error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      $swal({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,

      })

    }

    if (code === 401) {

      // store.dispatch('logout')
      // .then(() => {
      //     window.location.href = "/login"
      // })

      // setTimeout(function(){ window.location = '/'; }, 3000);
        
        
    }
  })
}