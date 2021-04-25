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
                        <i class="fa fa-user"></i> Personal Detail
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="name">
                                        <span style="color: red; font-weight: bold">*)</span> Full Name
                                    </label>
                                    <input
                                        type="text"
                                        v-model="form.name"
                                        required
                                        class="form-control"
                                        v-bind:class="{ 'parsley-error': errors.name }"
                                    />
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

                                <div class="form-group">
                                    <label for="code">
                                        <span style="color: red; font-weight: bold">*)</span> Device Code
                                    </label>

                                    <input
                                        type="text"
                                        v-model="form.code"
                                        required
                                        class="form-control"
                                        v-bind:class="{ 'parsley-error': errors.code }"
                                    />
                                    <ul
                                        class="parsley-errors-list filled"
                                        id="parsley-id-9"
                                        v-if="errors.code"
                                    >
                                        <li
                                            class="parsley-required"
                                            v-for="(err, index) in errors.code"
                                            :key="index"
                                        >{{ err }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea
                                v-model="form.description"
                                rows="4"
                                class="form-control"
                                v-bind:class="{ 'parsley-error': errors.description }"
                            ></textarea>
                            <ul
                                class="parsley-errors-list filled"
                                id="parsley-id-9"
                                v-bind:class="{ 'parsley-error': errors.description }"
                                v-if="errors.description"
                            >
                                <li
                                    class="parsley-required"
                                    v-for="(err, index) in errors.description"
                                    :key="index"
                                >{{ err }}</li>
                            </ul>
                        </div>
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

                <button class="btn btn-block btn-info" v-on:click="generateRandomPassword">
                    <i class="fa fa-key"></i> Generate Random Password
                </button>
                <button class="btn btn-block btn-warning">
                    <i class="fa fa-redo-alt"></i> Reset Form
                </button>
                <button v-on:click="saveData" class="btn btn-block btn-success">
                    <i class="fa fa-plus"></i> Save Data
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Qrcode from "v-qrcode/src/index";

import PageHeader from "~~/layouts/components/PageHeader";

export default {
    loading: true,

    name: "admin-devices-register",

    components: {
        Qrcode,
        PageHeader,
    },

    data: () => ({
        breadcrumb_arr: [
            { title: "Dashboard", dest: "/" },
            { title: "Client Area", dest: "/admin/clients" },
            { title: "Add New Client", dest: "/admin/clients/add" },
        ],

        area: {
            provinces: [],
            regencies: [],
            districts: [],
        },

        errors: {},

        selected_client: {
            id: "",
        },

        form: {
            client_id: null,
            code: null,
            name: null,
            description: null,
        },
    }),

    mounted() {
        this.getProvinces();
    },

    methods: {
        getProvinces: function () {
            this.$axios
                .get("https://kcd.e-belajar.id/api/area/province")
                .then((res) => {
                    if (res.data.status == 1) {
                        this.area.provinces = res.data.data;
                    }
                });
        },

        saveData: function () {
            this.$swal({
                title: "You Are Going To Add New Client",
                text: "Continue?",
                icon: "warning",
                buttons: true,
                dangerMode: false,
            }).then((value) => {
                if (value) {
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
                                    footer:
                                        "<a href>Why do I have this issue?</a>",
                                });
                                this.errors = error.response.data;
                                return false;
                            }
                        });
                }
            });
        },

        generateRandomPassword: function () {
            var length = 6,
                charset =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }

            this.form.password = retVal;
            this.form.password_confirmation = retVal;
            return retVal;
        },

        selectProvince: function () {
            // Empty Address Form
            this.form.regency = null;
            this.form.district = null;

            // Empty Selection
            this.area.regencies = [];
            this.area.districts = [];

            this.$axios
                .get(
                    "https://kcd.e-belajar.id/api/area/province/" +
                        this.form.province.id
                )
                .then((res) => {
                    if (res.data.status == 1) {
                        this.area.regencies = res.data.data.regency;
                    }
                });
        },

        selectRegency: function () {
            // Empty Address Form
            // this.form.regency = null
            this.form.district = null;

            // Empty Selection
            this.area.districts = [];

            this.$axios
                .get(
                    "https://kcd.e-belajar.id/api/area/regency/" +
                        this.form.regency.id
                )
                .then((res) => {
                    if (res.data.status == 1) {
                        this.area.districts = res.data.data.district;
                    }
                });
        },
    },
};
</script>

<style>
</style>