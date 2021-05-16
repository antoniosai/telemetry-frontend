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
                        <div class="form-group">
                            <label for="phone_number">
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
                            <label for="username">Username</label>
                            <input
                                type="text"
                                v-model="form.phone_number"
                                disabled
                                class="form-control"
                            />
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="phone_number">
                                        <span style="color: red; font-weight: bold">*)</span> Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        v-model="form.phone_number"
                                        v-bind:class="{ 'parsley-error': errors.phone_number }"
                                        required
                                        class="form-control"
                                    />
                                    <ul
                                        class="parsley-errors-list filled"
                                        id="parsley-id-9"
                                        v-bind:class="{ 'parsley-error': errors.phone_number }"
                                        v-if="errors.name"
                                    >
                                        <li
                                            class="parsley-required"
                                            v-for="(err, index) in errors.phone_number"
                                            :key="index"
                                        >{{ err }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="email">E-Mail Address</label>
                                    <input
                                        type="email"
                                        v-model="form.email"
                                        required
                                        class="form-control"
                                        v-bind:class="{ 'parsley-error': errors.phone_number }"
                                    />
                                    <ul
                                        class="parsley-errors-list filled"
                                        id="parsley-id-9"
                                        v-bind:class="{ 'parsley-error': errors.phone_number }"
                                        v-if="errors.name"
                                    >
                                        <li
                                            class="parsley-required"
                                            v-for="(err, index) in errors.email"
                                            :key="index"
                                        >{{ err }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="password">
                                        <span style="color: red; font-weight: bold">*)</span> Password
                                    </label>
                                    <input
                                        type="text"
                                        v-model="form.password"
                                        required
                                        class="form-control"
                                        v-bind:class="{ 'parsley-error': errors.password }"
                                    />
                                    <ul
                                        class="parsley-errors-list filled"
                                        id="parsley-id-9"
                                        v-bind:class="{ 'parsley-error': errors.password }"
                                        v-if="errors.name"
                                    >
                                        <li
                                            class="parsley-required"
                                            v-for="(err, index) in errors.password"
                                            :key="index"
                                        >{{ err }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="password_confirmation">
                                        <span style="color: red; font-weight: bold">*)</span> Password Confirmation
                                    </label>
                                    <input
                                        type="email"
                                        v-model="form.password_confirmation"
                                        required
                                        class="form-control"
                                        v-bind:class="{ 'parsley-error': errors.password_confirmation }"
                                    />
                                    <ul
                                        class="parsley-errors-list filled"
                                        id="parsley-id-9"
                                        v-bind:class="{ 'parsley-error': errors.password }"
                                        v-if="errors.name"
                                    >
                                        <li
                                            class="parsley-required"
                                            v-for="(err, index) in errors.password"
                                            :key="index"
                                        >{{ err }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <i class="fa fa-home"></i> Address Detail
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="province">Province</label>
                            <select
                                v-model="form.province"
                                class="form-control"
                                @change="selectProvince"
                                v-bind:class="{ 'parsley-error': errors.province }"
                            >
                                <option
                                    v-for="province in area.provinces"
                                    :key="province.id"
                                    :value="province"
                                >{{ province.name }}</option>
                            </select>
                            <ul
                                class="parsley-errors-list filled"
                                id="parsley-id-9"
                                v-bind:class="{ 'parsley-error': errors.province }"
                                v-if="errors.province"
                            >
                                <li
                                    class="parsley-required"
                                    v-for="(err, index) in errors.province"
                                    :key="index"
                                >{{ err }}</li>
                            </ul>
                        </div>

                        <div class="form-group">
                            <label for="regency">Regency</label>
                            <select
                                v-model="form.regency"
                                class="form-control"
                                @change="selectRegency"
                                v-bind:class="{ 'parsley-error': errors.regency }"
                            >
                                <option
                                    v-for="regency in area.regencies"
                                    :key="regency.id"
                                    :value="regency"
                                >{{ regency.name }}</option>
                            </select>
                            <ul
                                class="parsley-errors-list filled"
                                id="parsley-id-9"
                                v-bind:class="{ 'parsley-error': errors.regency }"
                                v-if="errors.regency"
                            >
                                <li
                                    class="parsley-required"
                                    v-for="(err, index) in errors.regency"
                                    :key="index"
                                >{{ err }}</li>
                            </ul>
                        </div>

                        <div class="form-group">
                            <label for="district">District</label>
                            <select
                                v-model="form.district"
                                class="form-control"
                                v-bind:class="{ 'parsley-error': errors.district }"
                            >
                                <option
                                    v-for="district in area.districts"
                                    :key="district.id"
                                    :value="district"
                                >{{ district.name }}</option>
                            </select>
                            <ul
                                class="parsley-errors-list filled"
                                id="parsley-id-9"
                                v-bind:class="{ 'parsley-error': errors.district }"
                                v-if="errors.district"
                            >
                                <li
                                    class="parsley-required"
                                    v-for="(err, index) in errors.district"
                                    :key="index"
                                >{{ err }}</li>
                            </ul>
                        </div>

                        <div class="form-group">
                            <label for="address">Address</label>
                            <textarea
                                v-model="form.address"
                                rows="4"
                                class="form-control"
                                v-bind:class="{ 'parsley-error': errors.address }"
                            ></textarea>
                            <ul
                                class="parsley-errors-list filled"
                                id="parsley-id-9"
                                v-bind:class="{ 'parsley-error': errors.address }"
                                v-if="errors.address"
                            >
                                <li
                                    class="parsley-required"
                                    v-for="(err, index) in errors.address"
                                    :key="index"
                                >{{ err }}</li>
                            </ul>
                        </div>

                        <div class="form-group">
                            <label for="zip_code">ZIP Code</label>
                            <input
                                name="zip_code"
                                v-model="form.zip_code"
                                class="form-control"
                                v-bind:class="{ 'parsley-error': errors.zip_code }"
                            />
                            <ul
                                class="parsley-errors-list filled"
                                id="parsley-id-9"
                                v-bind:class="{ 'parsley-error': errors.zip_code }"
                                v-if="errors.zip_code"
                            >
                                <li
                                    class="parsley-required"
                                    v-for="(err, index) in errors.zip_code"
                                    :key="index"
                                >{{ err }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
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

                <button class="btn btn-block btn-info" @click="generateRandomPassword">
                    <i class="fa fa-key"></i> Generate Random Password
                </button>
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
import PageHeader from "~~/layouts/components/PageHeader";

export default {
    loading: true,

    name: "admin-clients-add",

    components: {
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

        form: {
            name: null,
            username: null,
            phone_number: null,
            email: null,
            password: null,
            password_confirmation: null,

            // Address Detail
            zip_code: null,
            address: null,
            province: null,
            regency: null,
            district: null,
        },
    }),

    mounted() {
        this.getProvinces();
    },

    methods: {
        getProvinces: function () {
            this.$axios.get("/area/provinces").then((res) => {
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
                .get("/area/province/" + this.form.province.id)
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
                .get("/area/regency/" + this.form.regency.id)
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