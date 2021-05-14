<template>
    <div>
        <PageHeader
            :title="device.name"
            :sub_title="'Showing 0 from 0 client(s)'"
            :breadcrumb_arr="breadcrumb_arr"
        >
            <template v-slot:button>
                <button class="btn btn-warning">
                    <i class="fa fa-cogs"></i> Manual Calibration
                </button>
                <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#modalGenerateReport"
                >
                    <i class="fa fa-file-alt"></i> Generate Report
                </button>
            </template>
        </PageHeader>

        <div class="row">
            <div class="col-md-8">
                <div class="card h-100">
                    <div class="card-header bg-primary text-white">
                        <i class="fa fa-chart-area"></i> Live Sensor Log
                    </div>
                    <div class="card-body">
                        <!-- <SteamChart /> -->
                        <LineChart :categories="categories" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <i class="fa fa-info-circle"></i> Device Details
                    </div>
                    <div class="card-body">
                        <div id="tab_area">
                            <ul class="nav nav-tabs" role="tablist">
                                <li class="nav-item">
                                    <a
                                        class="nav-link show active"
                                        data-toggle="tab"
                                        href="#info"
                                        role="tab"
                                        aria-selected="true"
                                    >
                                        <i class="fa fa-info"></i> Main Information
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link show"
                                        data-toggle="tab"
                                        href="#location"
                                        role="tab"
                                        aria-selected="false"
                                    >
                                        <i class="fa fa-map-marker"></i> Location
                                    </a>
                                </li>
                            </ul>

                            <div class="tab-content">
                                <div class="tab-pane p-3 show active" id="info" role="tabpanel">
                                    <div class="row">
                                        <div
                                            class="col-lg-12 col-sm-12 text-center align-self-center"
                                        >
                                            <div class="alert alert-success">
                                                <i class="fa fa-check-circle fa-4x"></i>
                                                <h2>Your Device at Good Status</h2>
                                                <p>Last Synchronized : May 8th, 2021 20:31</p>
                                            </div>

                                            <table class="table table-condensed">
                                                <tr>
                                                    <td>Device Category</td>
                                                    <td>:</td>
                                                    <th>{{ device.category.name }}</th>
                                                </tr>
                                                <tr>
                                                    <td>Device Name</td>
                                                    <td>:</td>
                                                    <th>{{ device.name }}</th>
                                                </tr>
                                                <tr>
                                                    <td>Device Code</td>
                                                    <td>:</td>
                                                    <th>{{ device.code }}</th>
                                                </tr>
                                                <tr>
                                                    <td>Device Category</td>
                                                    <td>:</td>
                                                    <th>{{ device.category.name }}</th>
                                                </tr>
                                                <tr>
                                                    <td>Device Owner</td>
                                                    <td>:</td>
                                                    <th>{{ device.owner.name }}</th>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane p-3 show" id="location" role="tabpanel">
                                    <iframe
                                        height="350"
                                        width="100%"
                                        frameborder="0"
                                        scrolling="no"
                                        marginheight="0"
                                        marginwidth="0"
                                        :src="'https://maps.google.com/maps?q='+device.latitude+','+device.longitude+'&hl=id&z=14&amp;output=embed'"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Generate Report -->
        <div
            id="modalGenerateReport"
            class="modal fade"
            tabindex="-1"
            role="dialog"
            aria-labelledby="modalGenerateReportLabel"
            style="display: none;"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5>Generate Report</h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-hidden="true"
                        >×</button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="start_date">From</label>
                                        <input type="datetime-local" class="form-control" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="start_date">From</label>
                                        <input type="datetime-local" class="form-control" />
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <center>
                                        <label for="output_format">Output Format</label>
                                        <br />
                                        <button class="btn btn-danger">
                                            <i class="fa fa-file-pdf"></i> PDF
                                        </button>

                                        <button class="btn btn-success">
                                            <i class="fa fa-file-excel"></i> Excel
                                        </button>
                                        <button class="btn btn-info">
                                            <i class="fa fa-file-csv"></i>
                                            CSV
                                        </button>
                                    </center>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- End Modal Generate Report -->
    </div>
</template>

<script>
import mqtt from "mqtt";

import PageHeader from "~~/layouts/components/PageHeader";

import SteamChart from "../../../components/chart/Steam";
import LineChart from "../../../components/chart/Line";

export default {
    name: "admin-device-detail",

    components: {
        PageHeader,
        SteamChart,
        LineChart,
    },

    data: () => ({
        device: {
            category: { name: null },
            owner: { name: null },
            province: {},
            regency: {},
            district: {},
        },

        categories: [
            "20 Mei 2021",
            "21 Mei 2021",
            "22 Mei 2021",
            "23 Mei 2021",
            "24 Mei 2021",
            "25 Mei 2021",
            "26 Mei 2021",
            "27 Mei 2021",
            "28 Mei 2021",
            "31 Mei 2021",
            "1 June 2021",
            "2 June 2021",
            "3 June 2021",
            "4 June 2021",
            "5 June 2021",
            "6 June 2021",
            "7 June 2021",
            "8 June 2021",
            "9 June 2021",
            "10 June 2021",
            "11 June 2021",
            "12 June 2021",
            "13 June 2021",
            "14 June 2021",
        ],
    }),

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
                    title: "Detail",
                    dest: "/admin/devices/" + this.$route.params.id,
                },
            ];
        },
    },

    mounted() {
        this.initData();
    },

    methods: {
        getCurrentDate: function () {
            let date = new Date(); //10 May 2019, 3:30:20 PM
            let dateStr = date.toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
            }); // 10/05/19

            let arr = dateStr.split("/"); // [ '10', '05', '19' ]
            let d = arr[0]; //e.g. 10
            let m = arr[1]; //e.g. 5
            let y = arr[2]; //e.g. 19

            let timeStr = date.toLocaleTimeString("en-GB", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }); //
            let arr2 = timeStr.split(":"); // 15:30:20
            let H = arr2[0]; //e.g. 15
            let i = arr2[1]; //e.g. 30
            let s = arr2[2]; //e.g. 20

            // let ymdHms = m + d + H + i + s;
            let ymdHms = m + "/" + d + " " + H + ":" + i + ":" + s;
            return ymdHms;
        },

        initData: function () {
            this.$axios
                .get("/admin_area/devices/" + this.$route.params.id)
                .then((res) => {
                    if (res.data.status == 1) {
                        this.device = res.data.data;
                        this.device.province = JSON.parse(
                            res.data.data.province
                        );
                        this.device.regency = JSON.parse(res.data.data.regency);
                        this.device.district = JSON.parse(
                            res.data.data.district
                        );
                    }
                });
        },
    },
};
</script>

<style>
</style>