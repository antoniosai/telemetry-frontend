<template>
    <div>
        <div class="clearfix">
            <div class="pull-right">
                <div class="form-group">
                    <label for="date">Select Date</label>
                    <input type="date" class="form-control" />
                </div>
            </div>
        </div>
        <apexchart height="550" width="100%" type="area" :options="options" :series="series"></apexchart>
    </div>
</template>

<script>
import VueApexChart from "vue-apexcharts";

export default {
    props: ["categories"],

    name: "LineChart",
    components: {
        apexchart: VueApexChart,
    },

    watch: {
        categories: function (newVal) {
            this.options.xaxis.categories = newVal;
        },
    },
    data: () => ({
        options: {
            chart: {
                id: "vuechart-example",
                group: "social",
                type: "line",
            },
            xaxis: {
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
            },
            yaxis: {
                labels: {
                    minWidth: 40,
                },
            },
            title: {
                text: "Water Level Name",
                align: "center",
                style: {
                    fontSize: "24px",
                },
            },
            colors: ["#00897b", "#415b91"],
        },
        series: [
            {
                name: "Water Level (in cm)",
                data: [
                    55,
                    62,
                    89,
                    66,
                    98,
                    72,
                    101,
                    75,
                    94,
                    120,
                    117,
                    139,
                    55,
                    62,
                    89,
                    66,
                    98,
                    72,
                    101,
                    75,
                    94,
                    120,
                    117,
                    139,
                ],
            },
            {
                name: "Rainfall Recorder (in cm)",
                data: [
                    42,
                    21,
                    12,
                    44,
                    12,
                    52,
                    141,
                    51,
                    12,
                    30,
                    17,
                    33,
                    44,
                    51,
                    52,
                    71,
                    32,
                    67,
                    91,
                    12,
                    51,
                    120,
                    117,
                    139,
                ],
            },
        ],
    }),
};
</script>

<style scoped>
div.chart-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>