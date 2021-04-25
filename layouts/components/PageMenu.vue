<template>
    <div class="navbar-custom">
        <div class="container-fluid">
            <div id="navigation">
                <!-- Navigation Menu-->
                <ul class="navigation-menu text-center">
                    <li class="has-submenu">
                        <NuxtLink to="/">
                            <i class="mdi mdi-airplay"></i>Dashboard
                        </NuxtLink>
                    </li>

                    <li class="has-submenu">
                        <NuxtLink to="/admin/clients">
                            <i class="mdi mdi-account"></i>Client Area
                        </NuxtLink>
                    </li>

                    <li class="has-submenu">
                        <NuxtLink to="/admin/devices">
                            <i class="fa fa-toolbox"></i> Devices
                        </NuxtLink>
                    </li>
                </ul>

                <!-- End navigation menu -->
            </div>
            <!-- end #navigation -->
        </div>
        <!-- end container -->
    </div>
</template>

<script>
export default {
    name: "page-menu",
};
</script>

<style>
</style>