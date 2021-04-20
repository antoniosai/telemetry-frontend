<template>
  <div>
    
    <div v-if="isLoggedIn">
        <!-- <LoginPage /> -->
    </div>
    <div v-else>
        <!-- <div id="preloader">
            <div id="status">
                <div class="spinner"></div>
            </div>
        </div> -->
        <PageNavigation />
        <div class="wrapper">
        <div class="container-fluid">
            <Nuxt />
        </div>
        </div>
        <PageFooter />
    </div>
  </div>
</template>

<script>

// import LoginPage from '~~/pages/auth/login'

import PageNavigation from '~~/layouts/components/PageNavigation'
import PageFooter from '~~/layouts/components/PageFooter'

export default {

    name: 'layout',

    components: {
        // LoginPage,
        PageNavigation, PageFooter
    },

    computed: {
        isLoggedIn: function() {
            return false
        }
    }
}
</script>
