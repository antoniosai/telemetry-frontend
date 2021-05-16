<template>
    <div>
        <PageHeader
            title="Add New Client"
            sub_title="Showing Summary on System"
            :breadcrumb_arr="breadcrumb_arr"
        />

        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <i class="fa fa-user"></i> Owner Detail
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="name">
                                        <span style="color: red; font-weight: bold">*)</span> Full Name
                                    </label>
                                    <multiselect
                                        v-model="selected_owner"
                                        autocomplete="off"
                                        id="ajax"
                                        label="name"
                                        track-by="code"
                                        placeholder="Type to search"
                                        open-direction="bottom"
                                        :options="owner_list"
                                        :multiple="false"
                                        :searchable="true"
                                        :clear-on-select="true"
                                        :close-on-select="true"
                                        :options-limit="300"
                                        :limit="3"
                                        :max-height="600"
                                        @search-change="asyncFind"
                                    >
                                        <span
                                            slot="noResult"
                                        >Oops! No elements found. Consider changing the search query.</span>
                                    </multiselect>
                                    <ul
                                        class="parsley-errors-list filled"
                                        id="parsley-id-9"
                                        v-if="errors.name"
                                    >
                                        <li
                                            class="parsley-required"
                                            v-for="(err, index) in errors.name"
                                            :key="index"
                                        >{{ err }}</li>
                                    </ul>
                                </div>

                                <div v-if="selected_owner">
                                    <div class="card shadow">
                                        <div class="card-header">
                                            <i class="fa fa-check"></i> Selected Owner
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="mb-2">
                                                        <div class="mb-1 title-text mb-0">Full Name</div>
                                                        <span>{{ selected_owner.name }}</span>
                                                    </div>
                                                    <div class="mb-2">
                                                        <div
                                                            class="mb-1 title-text mb-0"
                                                        >Phone Number</div>
                                                        <span>{{ selected_owner.phone_number }}</span>
                                                    </div>
                                                    <div class="mb-2">
                                                        <div
                                                            class="mb-1 title-text mb-0"
                                                        >Email Address</div>
                                                        <span>{{ selected_owner.email }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <div
                                                            class="mb-1 title-text mb-0"
                                                        >Full Address</div>
                                                        <span
                                                            class="content-text"
                                                        >{{ selected_owner.address ? selected_owner.address : 'Not Set' }}</span>

                                                        <div
                                                            class="content-text"
                                                        >{{ selected_owner.district ? JSON.parse(selected_owner.district).name : 'Not Set' }}</div>

                                                        <div
                                                            class="content-text"
                                                        >{{ selected_owner.regency ? JSON.parse(selected_owner.regency).name : 'Not Set' }}</div>

                                                        <div
                                                            class="content-text"
                                                        >{{ selected_owner.province ? JSON.parse(selected_owner.province).name : 'Not Set' }}</div>

                                                        <div
                                                            class="content-text"
                                                        >{{ selected_owner.zip_code ? selected_owner.zip_code : 'Not Set' }}</div>
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
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <i class="fa fa-tablet-alt"></i> Device Information
                    </div>
                    <div class="card-body">
                        <div class="form-group"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <qrcode v-if="form.code" style="width: 100%" :cls="'qrcode'" :value="form.code"></qrcode>

                <div class="alert alert-danger">
                    <h4 class="title">
                        <i class="fa fa-exclamation-triangle"></i> Cautions!
                    </h4>
                    <ul style="margin-left: -20px">
                        <li>
                            Form with tag
                            <span style="color: red; font-weight: bold">*)</span> is required / cannot be blank
                        </li>
                        <li>Please make sure form filled correctly</li>
                        <li>Phone Number will be used as Username</li>
                    </ul>
                </div>
                <button class="btn btn-block btn-warning">
                    <i class="fa fa-redo-alt"></i> Reset Form
                </button>
                <button @click="saveData" class="btn btn-block btn-success">
                    <i class="fa fa-plus"></i> Save Data
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Qrcode from "v-qrcode/src/index";
import Multiselect from "vue-multiselect";

import PageHeader from "~~/layouts/components/PageHeader";

export default {
    loading: true,

    name: "admin-devices-register",

    components: {
        Qrcode,
        Multiselect,
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
                    title: "Register New Device",
                    dest: "/admin/devices/register",
                },
            ];
        },
    },

    data: () => ({
        errors: {},

        owner_list: [],

        selected_owner: null,

        form: {
            code: null,
            name: null,
            description: null,
        },
    }),

    mounted() {},

    methods: {
        asyncFind(query) {
            this.isLoading = true;

            if (query.length > 5) {
                let params = {
                    searchTerm: query,
                };

                this.$axios
                    .get("/admin_area/clients", { params })
                    .then((res) => {
                        if (res.data.data.length > 0) {
                            this.owner_list = res.data.data;
                        }
                    });
            }
        },

        saveData: function () {
            if (!this.selected_owner) {
                this.$toast.error("Please select Owner First");
                return false;
            }

            this.$swal({
                title:
                    "Register New Device & " +
                    this.selected_owner.name +
                    " as Owner?",
                text: "Continue?",
                icon: "warning",
                showDenyButton: true,
                confirmButtonText: `Yes`,
                denyButtonText: `No`,
                customClass: {
                    confirmButton: "order-2",
                    denyButton: "order-3",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$axios
                        .post("/admin_area/clients", this.form)
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.$swal({
                                    icon: "success",
                                    title: "Your work has been saved",
                                    showConfirmButton: false,
                                    timer: 1500,
                                    showCloseButton: true,
                                }).then((val) => {
                                    if (val) {
                                        window.location = "/admin/clients";
                                    }
                                });
                            }
                        })
                        .catch((error) => {
                            if (error.response) {
                                this.$swal({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "Something went wrong!",
                                });
                                this.errors = error.response.data;
                                return false;
                            }
                        });
                } else if (result.isDenied) {
                    this.$swal("Changes are not saved", "", "info");
                }
            });
        },
        selectLabel({ name }) {
            return `${name}`;
        },
    },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.title-text {
    font-weight: bold;
    font-size: 14px;
}
</style>