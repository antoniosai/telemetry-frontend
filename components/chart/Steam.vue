<template>
    <div>
        <div class="alert alert-primary">
            <i class="fa fa-info-circle"></i> Chart will be resetted every 60 seconds due to preventing leak memory
        </div>

        <apexchart
            ref="realtimeChart"
            type="line"
            height="400"
            :options="chart.chartOptions"
            :series="chart.series"
        />
    </div>
</template>

<script>
import mqtt from "mqtt";
import VueApexChart from "vue-apexcharts";

var lastDate = 0,
    data1 = [];

function getDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    while (i < count) {
        let x = baseval,
            y =
                Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
                yrange.min;

        data1.push({ x, y });
        lastDate = baseval;
        baseval += 5000;
        i++;
    }
}

getDayWiseTimeSeries(new Date().getTime(), 10, {
    min: 10,
    max: 90,
});

function getNewSeries(baseval, data) {
    var newDate = baseval + 5000;
    lastDate = newDate;

    data1.push({
        x: newDate,
        y: data,
    });
}

function resetData() {
    data1 = data1.slice(data1.length - 10, data1.length);
}

export default {
    components: {
        apexchart: VueApexChart,
    },

    data() {
        return {
            mqttBroker: {
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
                    topic: "/finallyantonio@gmail.com/devices/awlr-logung-1/",
                    qos: 0,
                },
                publish: {
                    topic: "/finallyantonio@gmail.com/devices/awlr-logung-1/",
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
            },

            chart: {
                chartOptions: {
                    chart: {
                        animations: {
                            enabled: true,
                            easing: "linear",
                            dynamicAnimation: {
                                speed: 5000,
                            },
                        },
                        toolbar: {
                            show: false,
                        },
                        zoom: {
                            enabled: false,
                        },
                        foreColor: "#000",
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: "smooth",
                    },
                    title: {
                        text: "Dynamic Updating Chart",
                        align: "left",
                    },
                    fill: {
                        colors: ["#F44336", "#E91E63", "#9C27B0"],
                    },
                    markers: {
                        colors: ["#F44336", "#E91E63", "#9C27B0"],
                    },
                    xaxis: {
                        type: "time",
                        // range: 777600000,
                        labels: {
                            show: true,
                            formatter: (value) => {
                                return this.$moment(value).format("H:m:ss");
                            },
                        },
                    },
                    yaxis: {},
                    legend: {
                        show: false,
                    },
                },
                series: [],
            },
        };
    },
    created() {
        this.initBroker();
        this.setDataLineChart();
    },
    methods: {
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
            const {
                host,
                port,
                endpoint,
                ...options
            } = this.mqttBroker.connection;
            const connectUrl = `ws://${host}:${port}${endpoint}`;
            try {
                this.mqttBroker.client = mqtt.connect(connectUrl, options);
            } catch (error) {
                console.log("mqtt.connect error", error);
            }
            this.mqttBroker.client.on("connect", (res) => {
                // console.log("Connection succeeded!", res);
            });
            this.mqttBroker.client.on("error", (error) => {
                console.log("Connection failed", error);
            });
            this.mqttBroker.client.on("message", (topic, message) => {
                this.mqttBroker.receiveNews = this.mqttBroker.receiveNews.concat(
                    message
                );

                let parsedMessage = JSON.parse(message);
                parsedMessage.y = parsedMessage.sensor_data;
                if (
                    typeof parsedMessage === "object" &&
                    parsedMessage !== null
                ) {
                    getNewSeries(lastDate, parsedMessage.y);
                    this.$refs.realtimeChart.updateSeries([{ data: data1 }]);
                }
            });
        },
        doSubscribe: function () {
            const { topic, qos } = this.mqttBroker.subscription;
            this.mqttBroker.client.subscribe(topic, { qos }, (error, res) => {
                if (error) {
                    console.log("Subscribe to topics error", error);
                    return;
                }
                this.mqttBroker.subscribeSuccess = true;
            });
        },
        doUnSubscribe: function () {
            const { topic } = this.mqttBroker.subscription;
            this.mqttBroker.client.unsubscribe(topic, (error) => {
                if (error) {
                    console.log("Unsubscribe error", error);
                }
            });
        },

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

        getRandomArbitrary(min, max) {
            return 0;
        },
        setDataLineChart() {
            // every 120 seconds, we reset the data to prevent memory leaks
            window.setInterval(function () {
                resetData();
                this.$refs.realtimeChart.updateSeries(
                    [{ data: [] }],
                    false,
                    true
                );
            }, 120000);
        },
        updateSeriesLine() {
            this.$refs.realtimeChart.updateSeries(
                [
                    {
                        data: this.chart.series[0].data,
                    },
                ],
                false,
                true
            );
        },
    },
};
</script>