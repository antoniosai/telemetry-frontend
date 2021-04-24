<template>
    <div class="navbar-custom">
        <div class="container-fluid">
            <div id="navigation">
                <!-- Navigation Menu-->
                <ul class="navigation-menu text-center">

                    <li class="has-submenu ">
                        <NuxtLink to="/"><i class="mdi mdi-airplay"></i>Dashboard</NuxtLink>
                    </li>

                    <li class="has-submenu ">
                        <NuxtLink to="/admin/clients"><i class="mdi mdi-account"></i>Client Area</NuxtLink>
                    </li>

                    <li class="has-submenu">
                        <a href="#"><i class="fa fa-toolbox"></i>Devices Management</a>
                        <ul class="submenu megamenu">
                            <li>
                                <ul>
                                    <li><NuxtLink to="/admin/devices/list">Device List</NuxtLink></li>
                                    <li><a href="ui-cards.html">Category</a></li>
                                    <li><a href="ui-tabs-accordions.html">Owner</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    
                </ul>
                
                
                <!-- End navigation menu -->
            </div> <!-- end #navigation -->
        </div> <!-- end container -->
    </div>
</template>

<script>
export default {
    name: 'PageMenu'
}
</script>

<style>

</style>