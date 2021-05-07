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
            <div class="col-md-8"></div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <i class="fa fa-info-circle"></i> RAW Data From Sensor
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div class="alert alert-success">
                                <h4>
                                    <i class="fa fa-check"></i> RAW Data
                                </h4>
                                <p>Last Fetched Tiem: May 8th, 2020 23:15</p>
                            </div>
                            <table class="table table-hover table-striped table-condensed">
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(raw, index) in raw_data" :key="index">
                                        <td>{{ raw.time }}</td>
                                        <td>{{ raw.data }}</td>
                                    </tr>
                                </tbody>
                            </table>
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

export default {
    components: {
        PageHeader,
    },

    data: () => ({
        device: {
            owner: {},
            province: {},
            regency: {},
            district: {},
        },

        raw_data: [],

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
        initData: function () {
            this.$axios
                .get("/admin_area/devices/" + this.$route.params.id)
                .then((res) => {
                    if (res.data.status == 1) {
                        this.initBroker();
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

                this.raw_data.push(parsedMessage);
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