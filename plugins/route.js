import decode from 'jwt-decode'

export default ({ app }) => {
    // Every time the route changes (fired on initialization too)
    app.router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (app.store.getters.isLoggedIn) {
    
                function errorResponseHandler(error) {
                    // check for errorHandle config
                    if( error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false ) {
                        return Promise.reject(error);
                    }
                
                    // if has response show the error 
                    if (error.response) {
                        if(error.response.data.message == 'Unauthenticated.')
                        {
                            app.store.dispatch('logout')
                            .then(() => {
                                window.location.href = "/auth/login"
                            })
                        }
                        if(error.response.data.message == 'This action is unauthorized.')
                        {
                            app.toastr.error(error.response.data.message);
                            // router.push({name: 'module1.abmp_report'})
                        }
                    }
                }
                
                // apply interceptor on response
                app.axios.interceptors.response.use(
                   response => response,
                   errorResponseHandler
                )
                
                const token = localStorage.getItem('token');
                if (!token) {
                    app.store.dispatch('logout')
                    .then(() => {
                        window.location.href = "/login";
                        // toastr.success('Successfully logged out')
                    })
                }
                
                try {
                    const { exp } = decode(token);
                    if (exp < new Date().getTime() / 1000) {
                        swal({
                            title: "Sesi Login Anda Telah Berakhir",
                            text: "Anda harus login Kembali",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                        .then((value) => {
                            if (value) {
                                app.store.dispatch('logout')
                                .then(() => {
                                    toastr.success('You will be redirected to Login page')
                                    window.location.href = "/login"
                                })
                            } else {
                                app.store.dispatch('logout')
                                .then(() => {
                                    toastr.success('You will be redirected to Login page')
                                    window.location.href = "/login"
                                })
                            }
                        })
                        
                    }
                } catch (e) {
                    app.store.dispatch('logout')
                    .then(() => {
                        window.location.href = "/login";
                        // toastr.success('Successfully logged out')
                    })
                }
                next()
                return
            }
            next('/login')
        } else {
            next()
        }
    })

}
