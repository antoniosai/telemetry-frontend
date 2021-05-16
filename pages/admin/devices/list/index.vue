<template>
    <div>
        <PageHeader
            title="List of All Devices"
            :sub_title="'Showing 0 from 0 client(s)'"
            :breadcrumb_arr="breadcrumb_arr"
        >
            <template v-slot:button>
                <button @click="triggerFilter" class="btn btn-secondary">
                    <i class="fa fa-filter"></i>
                    {{ open_filter ? 'Close Filter' : 'Open Filter' }}
                </button>
                <NuxtLink to="/admin/devices/register" class="btn btn-primary">
                    <i class="fa fa-plus"></i> Register New Devices
                </NuxtLink>
            </template>
        </PageHeader>

        <div class="row">
            <div
                v-bind:class="{
                    'col-md-9' : open_filter == true,
                    'col-md-12' : open_filter == false
                }"
            >
                <div class="row">
                    <div
                        v-bind:class="{
                            'col-md-6 col-lg-6 pb-2' : open_filter == true,
                            'col-md-6 col-lg-4 pb-2' : open_filter == false
                        }"
                        v-for="(device, index) in devices"
                        :key="index"
                    >
                        <!-- Add a style="height: XYZpx" to div.card to limit the card height and display scrollbar instead -->
                        <DeviceCard :device="device" />
                    </div>
                </div>
                <infinite-loading ref="InfiniteLoading" @infinite="infiniteHandler"></infinite-loading>
            </div>
            <div class="col-md-3" v-if="open_filter">
                <div
                    v-if="
                        (filters.searchTerm != null) ||
                        (filters.searchTerm == '') ||
                        (filters.status != null) ||
                        (filters.province != null) ||
                        (filters.regency != null) ||
                        (filters.district != null)
                    "
                    class="card mb-3"
                >
                    <div class="card-header bg-primary text-white">Applied Filter(s)</div>
                    <div class="card-body">
                        <div v-if="filters.searchTerm" class="mb-3">
                            Search Query:
                            <span class="badge badge-area badge-primary">
                                <strong>{{ filters.searchTerm }}</strong>
                            </span>
                        </div>
                        <div v-if="filters.status" class="mb-2">
                            Status:
                            <span class="badge badge-area badge-primary">{{ filters.status }}</span>
                        </div>
                        <div v-if="filters.province" class="mb-2">
                            Prov.
                            <span
                                class="badge badge-area badge-primary"
                            >{{ filters.province.name }}</span>
                        </div>
                        <div v-if="filters.regency" class="mb-2">
                            Kota
                            <span
                                class="badge badge-area badge-success"
                            >{{ filters.regency.name }}</span>
                        </div>
                        <div v-if="filters.district" class="mb-2">
                            Kec.
                            <span
                                class="badge badge-area badge-success"
                            >{{ filters.district.name }}</span>
                        </div>
                    </div>
                </div>
                <div class="card card-shadow">
                    <div class="card-header bg-primary text-white">
                        <h5 class="card-title font-20 mt-0 mb-0">
                            <i class="fa fa-search"></i> Filter
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <input
                                            v-model="filters.searchTerm"
                                            @keyup.enter="submitFilter"
                                            @change="searchTerm"
                                            type="text"
                                            class="form-control"
                                            id="inputname1"
                                            placeholder="Search here anything"
                                        />
                                    </div>
                                    <div class="col-md-12">
                                        <p class="mb-2">Status</p>
                                        <div class="form-group">
                                            <select class="form-control">
                                                <option :value="null">-- All Status --</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <p class="mb-2">Filter By Area</p>
                                        <div class="form-group">
                                            <multiselect
                                                v-model="filters.province"
                                                @input="selectProvince"
                                                :multiple="false"
                                                :custom-label="selectLabel"
                                                :options="area.provinces"
                                                :searchable="true"
                                                :close-on-select="true"
                                                :allow-empty="false"
                                                :show-labels="false"
                                                placeholder="Select Province"
                                                label="name"
                                                track-by="name"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <multiselect
                                                v-model="filters.regency"
                                                @input="selectRegency"
                                                :multiple="false"
                                                :custom-label="selectLabel"
                                                :options="area.regencies"
                                                :searchable="true"
                                                :close-on-select="true"
                                                :allow-empty="false"
                                                :show-labels="false"
                                                placeholder="Select Regency"
                                                label="name"
                                                track-by="name"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <multiselect
                                                v-model="filters.district"
                                                @input="submitFilter"
                                                :multiple="false"
                                                :custom-label="selectLabel"
                                                :options="area.districts"
                                                :searchable="true"
                                                :close-on-select="true"
                                                :allow-empty="false"
                                                :show-labels="false"
                                                placeholder="Select District"
                                                label="name"
                                                track-by="name"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-auto p-0">
                                    <div class="clearfix">
                                        <div class="pull-right">
                                            <button @click="resetFilter" class="btn btn-warning">
                                                <i class="fa fa-redo-alt"></i> Reset
                                            </button>
                                            <button @click="submitFilter" class="btn btn-primary">
                                                <i class="fa fa-check"></i> Submit Filters
                                            </button>
                                        </div>
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
import InfiniteLoading from "vue-infinite-loading";
import Multiselect from "vue-multiselect";

import PageHeader from "~~/layouts/components/PageHeader";

import DeviceCard from "~~/pages/admin/devices/list/components/Card";

export default {
    loading: true,

    name: "admin-devices-list",

    components: {
        InfiniteLoading,
        Multiselect,
        PageHeader,
        DeviceCard,
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

    data: () => ({
        open_filter: true,

        filters: {
            page: 1,
            searchTerm: null,
            status: null,
            province: null,
            regency: null,
            district: null,
        },
        area: {
            provinces: [],
            regencies: [],
            districts: [],
        },

        devices: [],

        table: {
            columns: [
                {
                    label: "Device Name",
                    field: "name",
                },
                {
                    label: "Device Code",
                    field: "code",
                },
                {
                    label: "Status",
                    field: "status",
                },
                {
                    label: "Owner",
                    field: "owner",
                },
                {
                    label: "Support Ticket",
                    field: "ticket",
                },
                {
                    label: "Created Date",
                    field: "created_at",
                },
                {
                    label: "",
                    field: "action",
                },
            ],
            rows: [],
            totalRows: "",
            serverParams: {
                manual_filter: 0,
                perPage: 10,
                searchTerm: "",
            },
            perPageDropDown: [10, 25, 50, 100],
            selectedRows: [],
        },
    }),

    mounted() {
        // this.initData();
        this.getProvinces();
    },

    methods: {
        selectLabel({ name }) {
            return `${name}`;
        },

        infiniteHandler($state) {
            let params = this.filters;

            this.$axios
                .get("/admin_area/devices", { params })
                .then(({ data }) => {
                    console.log(data.data);
                    if (data.data.length) {
                        this.filters.page += 1;
                        this.devices.push(...data.data);
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                });
        },

        triggerFilter: function () {
            if (this.open_filter) {
                this.open_filter = false;
                this.resetFilter();
            } else {
                this.open_filter = true;
            }
        },

        submitFilter: function () {
            // this.devices = [];
            // this.initData();
            this.filters.page = 1;
            this.devices = [];
            this.$refs.InfiniteLoading.stateChanger.reset();
        },

        resetFilter: function () {
            this.filters = {
                page: 1,
                searchTerm: null,
                status: null,
                province: null,
                regency: null,
                district: null,
            };

            this.submitFilter();
        },

        searchTerm: function () {
            this.filters.searchTerm == ""
                ? (this.filters.searchTerm = null)
                : null;
            console.log(this.filters.searchTerm);
        },

        getProvinces: function () {
            this.$axios.get("/area/provinces").then((res) => {
                if (res.data.status == 1) {
                    this.area.provinces = res.data.data;
                }
            });
        },

        selectProvince: function () {
            // Empty Address Form
            this.filters.regency = null;
            this.filters.district = null;

            // Empty Selection
            this.area.regencies = [];
            this.area.districts = [];

            this.$axios
                .get("/area/province/" + this.filters.province.id)
                .then((res) => {
                    if (res.data.status == 1) {
                        this.area.regencies = res.data.data.regency;
                    }
                });
        },

        selectRegency: function () {
            // Empty Address Form
            // this.filters.regency = null
            this.filters.district = null;

            // Empty Selection
            this.area.districts = [];

            this.$axios
                .get("/area/regency/" + this.filters.regency.id)
                .then((res) => {
                    if (res.data.status == 1) {
                        this.area.districts = res.data.data.district;
                    }
                });
        },
    },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
h3,
.desc-badge {
    color: #01579b;
}

.badge-area {
    font-size: 12px;
}

.card-custom {
    overflow: hidden;
    min-height: 450px;
}

.card-shadow {
    box-shadow: 0 0 15px rgba(10, 10, 10, 0.3);
}

.card-custom-img {
    height: 200px;
    min-height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-color: inherit;
}

/* First border-left-width setting is a fallback */
.card-custom-img::after {
    position: absolute;
    content: "";
    top: 161px;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-top-width: 40px;
    border-right-width: 0;
    border-bottom-width: 0;
    border-left-width: 545px;
    border-left-width: calc(575px - 5vw);
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: inherit;
}

.card-custom-avatar img {
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(10, 10, 10, 0.3);
    position: absolute;
    top: 100px;
    left: 1.25rem;
    width: 100px;
    height: 100px;
}
</style>