<template>
    <div>
        <PageHeader
            title="List of All Devices"
            :sub_title="'Showing 0 from 0 client(s)'"
            :breadcrumb_arr="breadcrumb_arr"
        ></PageHeader>
    </div>
</template>

<script>
import PageHeader from "~~/layouts/components/PageHeader";

export default {
    name: "admin-category-index",

    components: {
        PageHeader,
    },

    computed: {
        breadcrumb_arr: function () {
            return [
                {
                    title: "Dashboard",
                    dest: "/",
                },
                {
                    title: "Devices Management",
                    dest: "/admin/devices",
                },
                {
                    title: "List",
                    dest: "/admin/devices/list",
                },
            ];
        },
    },
};
</script>

<style>
</style>