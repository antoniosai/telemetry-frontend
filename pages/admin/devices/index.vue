<template>
    <div>
        <div class="alert alert-primary shadow mt-3">
            <center>
                <h4>Administrator Restritected Area</h4>
                <i class="fa fa-info-circle"></i> This page only accessible for Administrator Only
            </center>
        </div>

        <div class="row mt-5">
            <div class="col-md-8">
                <!-- <PageHeader
                    title="Devices Dashboard"
                    sub_title="Showing Summary of Installed Devices"
                    :breadcrumb_arr="breadcrumb_arr"
                />-->

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
                                            <h5 class="mt-0">{{ count.devices }}</h5>
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
                                            <i class="fa fa-list"></i>
                                        </div>
                                    </div>
                                    <div class="col-9 align-self-center text-right">
                                        <div class="m-l-10">
                                            <h5 class="mt-0">{{ count.categories }}</h5>
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
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-row">
                                    <div class="col-3 align-self-center">
                                        <div class="round">
                                            <i class="fa fa-users"></i>
                                        </div>
                                    </div>
                                    <div class="col-9 align-self-center text-right">
                                        <div class="m-l-10">
                                            <h5 class="mt-0">{{ count.owners }}</h5>
                                            <p class="mb-0 text-muted">Owner/Client Registered</p>
                                            <NuxtLink
                                                to="/admin/clients"
                                                class="btn btn-danger mt-3"
                                            >Manage Owner</NuxtLink>
                                        </div>
                                    </div>
                                </div>
                                <div class="progress mt-3" style="height:5px;">
                                    <div
                                        class="progress-bar bg-danger"
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

                <div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header bg-primary text-white">Device(s) Summary</div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table
                                            class="table table-hover table-striped table-condensed"
                                        >
                                            <thead>
                                                <tr>
                                                    <td>Device Name</td>
                                                    <td>Location</td>
                                                    <td>Owner</td>
                                                    <td>Last Read</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="summ in device_summaries" :key="summ.id">
                                                    <td>{{ summ.device.name }}</td>
                                                    <td>{{ summ.device.address }}</td>
                                                    <td>{{ summ.device.owner.name }}</td>
                                                    <td>
                                                        {{
                                                        $moment(summ.created_at).format(
                                                        "lll"
                                                        )
                                                        }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <PageHeader
                    title="Installed Device(s) Location"
                    :breadcrumb_arr="installed_devices"
                />
                <div>
                    <div id="map-wrap" style="height: 400px">
                        <client-only>
                            <l-map :zoom="4" :center="[1.3371023399773747, 114.39261166161292]">
                                <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                                <l-marker
                                    v-for="(loc, index) in count.locations"
                                    :key="index"
                                    :lat-lng="[loc.latitude, loc.longitude]"
                                ></l-marker>
                            </l-map>
                        </client-only>
                    </div>
                    <p class="text-muted mt-1">Kab. Garut, Kab. Ponorogo, Kab. Kudus</p>
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
            ];
        },
        installed_devices: function () {
            return [
                {
                    title:
                        "Showing " + this.count.locations.length + " locations",
                    dest: "/admin/devices",
                },
            ];
        },
    },

    components: {
        PageHeader,
    },

    data: () => ({
        count: {
            devices: 0,
            owners: 0,
            categories: 0,
            locations: [],
        },

        device_summaries: [],
    }),

    mounted() {
        this.initData();
        this.deviceSummary();
    },

    methods: {
        initData: function () {
            this.$axios.get("/admin_area/devices/get/count").then((res) => {
                if (res.data.status == 1) {
                    this.count = res.data.data;
                }
            });
        },

        deviceSummary: function () {
            this.$axios.get("/admin_area/sensor").then((res) => {
                this.device_summaries = res.data.data;
            });
        },
    },
};
</script>

<style>
</style>