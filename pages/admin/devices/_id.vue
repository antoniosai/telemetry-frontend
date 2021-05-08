<template>
    <div>
        <PageHeader
            title="List of All Devices"
            :sub_title="'Showing 0 from 0 client(s)'"
            :breadcrumb_arr="breadcrumb_arr"
        >
            <template v-slot:button></template>
        </PageHeader>

        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <i class="fa fa-chart"></i> Sensor Chart
                    </div>
                    <div class="card-body">
                        <LineChart />
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
                                <li class="nav-item">
                                    <a
                                        class="nav-link show"
                                        data-toggle="tab"
                                        href="#raw_data"
                                        role="tab"
                                        aria-selected="false"
                                    >
                                        <i class="fa fa-table"></i> Raw Data
                                    </a>
                                </li>
                            </ul>

                            <div class="tab-content">
                                <div class="tab-pane p-3 show active" id="info" role="tabpanel">
                                    <div class="row">
                                        <div
                                            class="col-lg-12 col-sm-12 text-center align-self-center"
                                        >
                                            <h6 class>San Francisco, California</h6>
                                            <p class="text-muted">
                                                SUNDAY
                                                <span>
                                                    25
                                                    <sup>th</sup> Jan
                                                </span>
                                            </p>
                                            <canvas id="clear-day" width="50" height="50"></canvas>
                                            <h5 class="mt-0">
                                                <b>32°</b>
                                            </h5>
                                            <p class="text-muted font-12">Clear Day</p>
                                            <p class="text-muted">
                                                There are many variations of passages of
                                                Lorem Ipsum available, but the majority have suffered alteration.
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-4 text-center align-self-center">
                                            <h6 class="text-muted mt-0 font-14">MON</h6>
                                            <canvas id="rain" width="28" height="18"></canvas>
                                            <h6 class="text-muted font-14 mb-0">
                                                28°
                                                <i class="wi-degrees"></i>
                                            </h6>
                                        </div>
                                        <div class="col-4 text-center align-self-center">
                                            <h6 class="text-muted mt-0 font-14">TUE</h6>
                                            <canvas id="wind" width="35" height="18"></canvas>
                                            <h6 class="text-muted font-14 mb-0">
                                                32°
                                                <i class="wi-degrees"></i>
                                            </h6>
                                        </div>
                                        <div class="col-4 text-center align-self-center">
                                            <h6 class="text-muted mt-0 font-14">WEN</h6>
                                            <canvas id="snow" width="35" height="18"></canvas>
                                            <h6 class="text-muted font-14 mb-0">
                                                10°
                                                <i class="wi-degrees"></i>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane p-3 show" id="location" role="tabpanel"></div>
                                <div class="tab-pane p-3 show" id="raw_data" role="tabpanel">
                                    <div class="table-responsive" v-if="raw_data.length > 0">
                                        <div class="alert alert-success">
                                            <p
                                                class="mb-1"
                                            >Last Fetched Tiem: {{ raw_data[0].date }}</p>
                                            <p
                                                class="mb-1"
                                            >Showing last {{ raw_data.length }} records</p>
                                        </div>
                                        <table
                                            class="table table-hover table-striped table-condensed"
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Data</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(raw, index) in raw_data" :key="index">
                                                    <td>{{ raw.x }}</td>
                                                    <td>
                                                        {{ raw.y }}
                                                        <small>cm</small>
                                                    </td>
                                                    <td>GOOD</td>
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
        </div>
    </div>
</template>

<script>
import mqtt from "mqtt";

import PageHeader from "~~/layouts/components/PageHeader";

import LineChart from "../../../components/chart/Line";

export default {
    name: "admin-device-detail",

    components: {
        PageHeader,
        LineChart,
    },

    data: () => ({
        device: {
            owner: {},
            province: {},
            regency: {},
            district: {},
        },

        raw_data: [],
        chart_data: [],

        connection: {
            host: "mqtt.dioty.co",
            port: 8080,
            endpoint: "",
            clean: true, // Reserved session
            connectTimeout: 4000, // Time out
            reconnectPeriod: 4000, // Reconnection interval
            // Certification Information
            clientId: "mqtt_telemetry_app",
            username: "finallyantonio@gmail.com",
            password: "3e24e448",
        },
        subscription: {
            topic: "/finallyantonio@gmail.com/",
            qos: 0,
        },
        publish: {
            topic: "/finallyantonio@gmail.com/",
            qos: 0,
            payload: '{ "msg": "Hello, I am browser." }',
        },
        receiveNews: "",
        qosList: [
            { label: 0, value: 0 },
            { label: 1, value: 1 },
            { label: 2, value: 2 },
        ],
        client: {
            connected: false,
        },
        subscribeSuccess: false,
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
                        // this.initBroker();
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

        initBroker: function () {
            this.createConnection();
            this.doSubscribe();
        },

        createConnection: function () {
            // Connect string, and specify the connection method used through protocol
            // ws unencrypted WebSocket connection
            // wss encrypted WebSocket connection
            // mqtt unencrypted TCP connection
            // mqtts encrypted TCP connection
            // wxs WeChat mini app connection
            // alis Alipay mini app connection
            const { host, port, endpoint, ...options } = this.connection;
            const connectUrl = `ws://${host}:${port}${endpoint}`;
            try {
                this.client = mqtt.connect(connectUrl, options);
            } catch (error) {
                console.log("mqtt.connect error", error);
            }
            this.client.on("connect", (res) => {
                // console.log("Connection succeeded!", res);
            });
            this.client.on("error", (error) => {
                console.log("Connection failed", error);
            });
            this.client.on("message", (topic, message) => {
                this.receiveNews = this.receiveNews.concat(message);
                let parsedMessage = JSON.parse(message);

                console.log("Main", parsedMessage);
                parsedMessage.x = this.getCurrentDate();

                this.raw_data.unshift(parsedMessage);
                this.chart_data.push(parsedMessage.data);
                if (this.raw_data.length > 15) {
                    this.raw_data.pop();
                }

                // console.log(`Received message ${message} from topic ${topic}`);
            });
        },
        doSubscribe: function () {
            const { topic, qos } = this.subscription;
            this.client.subscribe(topic, { qos }, (error, res) => {
                if (error) {
                    console.log("Subscribe to topics error", error);
                    return;
                }
                this.subscribeSuccess = true;
                console.log("Subscribe to topics res", res);
            });
        },
        doUnSubscribe: function () {
            const { topic } = this.subscription;
            this.client.unsubscribe(topic, (error) => {
                if (error) {
                    console.log("Unsubscribe error", error);
                }
            });
        },
    },
};
</script>

<style>
</style>