<template>
    <div>
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
            <li class="has-submenu">
                <NuxtLink to="/admin/support/ticket">
                    <i class="fa fa-ticket-alt"></i> Support Ticket
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script>
export default {};
</script>

<style>
</style>