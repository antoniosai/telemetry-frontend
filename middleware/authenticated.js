export default function ({
  store,
  redirect
}) {
  // If the user is not authenticated
  if (!store.getters.isLoggedIn) {
    console.log('you are unauthenticated')
    return redirect('/auth/login')
}

if (store.getters.isLoggedIn) {
      console.log('you are authenticated')
    // return window.location('/')
  }
}