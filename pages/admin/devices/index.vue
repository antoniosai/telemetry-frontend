<template>
    <div>
        <div class="row">
            <div class="col-md-8">
                <PageHeader
                    title="Add New Client"
                    sub_title="Showing Summary on System"
                    :breadcrumb_arr="breadcrumb_arr"
                />
                <div class="row">
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-row">
                                    <div class="col-3 align-self-center">
                                        <div class="round">
                                            <i class="fa fa-tablet-alt"></i>
                                        </div>
                                    </div>
                                    <div class="col-9 align-self-center text-right">
                                        <div class="m-l-10">
                                            <h5 class="mt-0">18090</h5>
                                            <p class="mb-0 text-muted">
                                                Device(s) Registered
                                                <span
                                                    class="badge bg-soft-success"
                                                >
                                                    <i class="mdi mdi-arrow-up"></i>2.35%
                                                </span>
                                            </p>
                                            <NuxtLink
                                                to="/admin/devices/list"
                                                class="btn btn-success mt-3"
                                            >Manage Device</NuxtLink>
                                        </div>
                                    </div>
                                </div>
                                <div class="progress mt-3" style="height:5px;">
                                    <div
                                        class="progress-bar bg-success"
                                        role="progressbar"
                                        style="width: 100%;"
                                        aria-valuenow="100"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                            </div>
                            <!--end card-body-->
                        </div>
                        <!--end card-->
                    </div>
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-row">
                                    <div class="col-3 align-self-center">
                                        <div class="round">
                                            <i class="fa fa-tablet-alt"></i>
                                        </div>
                                    </div>
                                    <div class="col-9 align-self-center text-right">
                                        <div class="m-l-10">
                                            <h5 class="mt-0">4</h5>
                                            <p class="mb-0 text-muted">Categories Available</p>
                                            <button class="btn btn-primary mt-3">Manage Category</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="progress mt-3" style="height:5px;">
                                    <div
                                        class="progress-bar bg-primary"
                                        role="progressbar"
                                        style="width: 100%;"
                                        aria-valuenow="100"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                            </div>
                            <!--end card-body-->
                        </div>
                        <!--end card-->
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <PageHeader
                    title="Installed Device(s) Location"
                    :breadcrumb_arr="installed_devices"
                />
                <div id="map-wrap" style="height: 400px">
                    <no-ssr>
                        <l-map :zoom="4" :center="[1.3371023399773747, 114.39261166161292]">
                            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                            <l-marker :lat-lng="[-7.219553792200063, 107.94007298210984]"></l-marker>
                            <l-marker :lat-lng="[-5.219553792200063, 102.94007298210984]"></l-marker>
                            <l-marker :lat-lng="[-6.758251126556629, 110.92253022660924]"></l-marker>
                            <l-marker :lat-lng="[-8.268919645596707, 114.96051620307709]"></l-marker>
                            <l-marker :lat-lng="[3.632529701146298, 98.87560743956004]"></l-marker>
                        </l-map>
                    </no-ssr>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PageHeader from "~~/layouts/components/PageHeader";

export default {
    name: "admin-devices",

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
                    title: "Register New Device",
                    dest: "/admin/devices/register",
                },
            ];
        },
        installed_devices: function () {
            return [
                {
                    title: "Showing 40 locations",
                    dest: "/",
                },
            ];
        },
    },

    components: {
        PageHeader,
    },
};
</script>

<style>
</style>