<template>
    <div>
        <PageNavigation />
        <div class="wrapper">
            <div class="container-fluid">
                <Nuxt />
            </div>
        </div>
        <PageFooter />
    </div>
</template>

<script>
import LoginPage from "~~/pages/auth/login";

import PageNavigation from "~~/layouts/components/PageNavigation";
import PageFooter from "~~/layouts/components/PageFooter";

export default {
    name: "layout",

    components: {
        LoginPage,
        PageNavigation,
        PageFooter,
    },

    computed: {
        isLoggedIn: function () {
            return this.$store.getters.isLoggedIn;
        },
    },
};
</script>
