<template>
    <div class="navbar-custom">
        <div class="container-fluid">
            <div id="navigation">
                <!-- Navigation Menu-->
                <MenuAdmin v-if="user_type == 'admin' " />
                <!-- End navigation menu -->
            </div>
            <!-- end #navigation -->
        </div>
        <!-- end container -->
    </div>
</template>

<script>
import MenuAdmin from "~~/layouts/components/menu/Admin.vue";

export default {
    name: "page-menu",

    components: {
        MenuAdmin,
    },

    computed: {
        user_type: function () {
            return JSON.parse(localStorage.getItem("user")).user_type;
        },
    },
    mounted() {
        console.log(this.user_type);
    },
};
</script>

<style>
</style>