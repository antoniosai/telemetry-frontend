<template>
    <div>
        <div class="accountbg"></div>
        <div class="wrapper-page">

            <div class="card">
                <div class="card-body">

                    <div class="text-center mt-2 mb-4">
                        <a href="index.html" class="logo logo-admin"><img src="/assets/images/logo-igi.png" height="120" alt="logo"></a>
                    </div>

                    <div class="px-3 pb-3">
                        <form class="form-horizontal m-t-20" @submit.prevent="doLogin">

                            <div class="form-group row">
                                <div class="col-12">
                                    <input class="form-control" v-model="form.username" type="text" required autocomplete="username" placeholder="Username">
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-12">
                                    <input class="form-control" v-model="form.password" type="password" required autocomplete="current-password" placeholder="Password">
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-12">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="customCheck1">
                                        <label class="custom-control-label" for="customCheck1">Remember me</label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group text-center row m-t-20">
                                <div class="col-12">
                                    <button class="btn btn-danger btn-block waves-effect waves-light" type="submit">Log In</button>
                                </div>
                            </div>

                            <div class="form-group m-t-10 mb-0 row">
                                <div class="col-sm-7 m-t-20">
                                    <a href="pages-recoverpw.html" class="text-muted"><i class="mdi mdi-lock"></i> <small>Forgot your password ?</small></a>
                                </div>
                                <!-- <div class="col-sm-5 m-t-20">
                                    <a href="pages-register.html" class="text-muted"><i class="mdi mdi-account-circle"></i> <small>Create an account ?</small></a>
                                </div> -->
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    layout: 'auth',
    
    data: () => ({
        form: {
            grant_type: 'password',
            client_id: 1,
            client_secret: 'FC8GACiKVBtZnbXUI1ZYAHh2vQjVyFjoUocVKdG1',
            scope: '*',
            // username: '',
            // password: ''
            username: 'antoniosai',
            password: 'd0nthide!@#'
        }
    }),

    computed: {
        isLoggedIn: function() {
            return this.$store.getters.isLoggedIn
        }
    },

    mounted() {
        if(this.isLoggedIn) {
            window.location = '/'
        }
    },

    methods: {

        async doLogin() {
            if (this.form.username == '') {
                alert('Username can\'t be empty')
            } else if (this.form.password == '') {
                alert('Password can\'t be empty')
            } else {
                this.$store.dispatch('login', this.form)
                .then(res => {
                    if (res.data.status == 1) {
                        this.$swal(res.data.message, "Welcome");
                        window.location = '/'
                    } else if (res.data.status == 0) {
                        this.$swal({
                            title: "Something Wrong",
                            text: res.data.message,
                            icon: "warning",
                            button: "Ok",
                        })
                    }
                })
                .catch(err => {})
            }
        },
    }
}
</script>

<style scoped>
body {
    background-color: #fff;
}
.accountbg {
  background: url("/assets/images/bg-bottom.png");
  background-repeat: repeat-x;
  position: absolute;
  height: 40%;
  width: 100%;
  top: 70%;
}
</style>