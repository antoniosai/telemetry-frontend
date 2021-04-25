<template>
    <div>
        <PageHeader title="Add New Client" sub_title="Showing Summary on System" :breadcrumb_arr="breadcrumb_arr" />

        <div class="row">
            <div class="col-md-8">

                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <i class="fa fa-user"></i> Personal Detail
                    </div>
                    <div class="card-body">
                        
                        <div class="form-group">
                            <label for="phone_number"><span style="color: red; font-weight: bold">*)</span> Full Name</label>
                            <input type="text" v-model="client.name" required class="form-control" v-bind:class="{ 'parsley-error': errors.name }">
                            <ul class="parsley-errors-list filled" id="parsley-id-9" v-if="errors.name">
                                <li class="parsley-required" v-for="(err, index) in errors.name" :key="index">{{ err }}</li>
                            </ul>
                        </div>

                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" v-model="client.user.username" class="form-control">
                            
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="phone_number"><span style="color: red; font-weight: bold">*)</span> Phone Number</label>
                                    <input type="text" v-model="client.phone_number" v-bind:class="{ 'parsley-error': errors.phone_number }" required class="form-control">
                                    <ul class="parsley-errors-list filled" id="parsley-id-9" v-bind:class="{ 'parsley-error': errors.phone_number }" v-if="errors.name">
                                        <li class="parsley-required" v-for="(err, index) in errors.phone_number" :key="index">{{ err }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="email">E-Mail Address</label>
                                    <input type="email" v-model="client.email" required class="form-control" v-bind:class="{ 'parsley-error': errors.phone_number }">
                                    <ul class="parsley-errors-list filled" id="parsley-id-9" v-bind:class="{ 'parsley-error': errors.phone_number }" v-if="errors.name">
                                        <li class="parsley-required" v-for="(err, index) in errors.email" :key="index">{{ err }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="password"><span style="color: red; font-weight: bold">*)</span> Password</label>
                                    <input type="text" v-model="client.password" required class="form-control" v-bind:class="{ 'parsley-error': errors.password }">
                                    <ul class="parsley-errors-list filled" id="parsley-id-9" v-bind:class="{ 'parsley-error': errors.password }" v-if="errors.name">
                                        <li class="parsley-required" v-for="(err, index) in errors.password" :key="index">{{ err }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="password_confirmation"><span style="color: red; font-weight: bold">*)</span> Password Confirmation</label>
                                    <input type="email" v-model="client.password_confirmation" required class="form-control" v-bind:class="{ 'parsley-error': errors.password_confirmation }">
                                    <ul class="parsley-errors-list filled" id="parsley-id-9" v-bind:class="{ 'parsley-error': errors.password }" v-if="errors.name">
                                        <li class="parsley-required" v-for="(err, index) in errors.password" :key="index">{{ err }}</li>
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
                            <div v-if="edit_area">
                                <select v-model="client.province" class="form-control" @change="selectProvince" v-bind:class="{ 'parsley-error': errors.province }">
                                    <option v-for="province in area.provinces" :key="province.id" :value="province">{{ province.name }}</option>
                                </select>
                                <ul class="parsley-errors-list filled" id="parsley-id-9" v-bind:class="{ 'parsley-error': errors.province }" v-if="errors.province">
                                    <li class="parsley-required" v-for="(err, index) in errors.province" :key="index">{{ err }}</li>
                                </ul>
                            </div>
                            <div style="color: grey" v-else>
                                {{ client.province ? client.province.name : 'Not Set' }}
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="regency">Regency</label>
                            <div v-if="edit_area">
                                <select v-model="client.regency" class="form-control" @change="selectRegency" v-bind:class="{ 'parsley-error': errors.regency }" >
                                    <option v-for="regency in area.regencies" :key="regency.id" :value="regency">{{ regency.name }}</option>
                                </select>
                                <ul class="parsley-errors-list filled" id="parsley-id-9" v-bind:class="{ 'parsley-error': errors.regency }" v-if="errors.regency">
                                    <li class="parsley-required" v-for="(err, index) in errors.regency" :key="index">{{ err }}</li>
                                </ul>
                            </div>
                            <div style="color: grey" v-else>
                                {{ client.regency ? client.regency.name : 'Not Set' }}
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="district">District</label>
                            <div v-if="edit_area">
                                <select v-model="client.district" class="form-control" v-bind:class="{ 'parsley-error': errors.district }" >
                                    <option v-for="district in area.districts" :key="district.id" :value="district">{{ district.name }}</option>
                                </select>
                                <ul class="parsley-errors-list filled" id="parsley-id-9" v-bind:class="{ 'parsley-error': errors.district }" v-if="errors.district">
                                    <li class="parsley-required" v-for="(err, index) in errors.district" :key="index">{{ err }}</li>
                                </ul>
                            </div>
                            <div style="color: grey" v-else>
                                {{ client.district ? client.district.name : 'Not Set' }}
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="address">Address</label>
                            <div v-if="edit_area">
                                <textarea v-model="client.address" rows="4" class="form-control" v-bind:class="{ 'parsley-error': errors.address }" ></textarea>
                                <ul class="parsley-errors-list filled" id="parsley-id-9" v-bind:class="{ 'parsley-error': errors.address }" v-if="errors.address">
                                    <li class="parsley-required" v-for="(err, index) in errors.address" :key="index">{{ err }}</li>
                                </ul>
                            </div>
                            <div style="color: grey" v-else>
                                {{ client.address ? client.address : 'Not Set' }}
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="zip_code">ZIP Code</label>
                            
                            <div v-if="edit_area">
                                <input name="zip_code" v-model="client.zip_code" class="form-control" v-bind:class="{ 'parsley-error': errors.zip_code }" />
                                <ul class="parsley-errors-list filled" id="parsley-id-9" v-bind:class="{ 'parsley-error': errors.zip_code }" v-if="errors.zip_code">
                                    <li class="parsley-required" v-for="(err, index) in errors.zip_code" :key="index">{{ err }}</li>
                                </ul>
                            </div>
                            <div style="color: grey" v-else>
                                {{ client.zip_code ? client.zip_code : 'Not Set' }}
                            </div>
                        </div>

                        <div class="clearfix">
                            <div class="pull-right">
                                <button v-if="edit_area == false" class="btn btn-primary" v-on:click="editArea"><i class="fa fa-cog"></i> Edit Address Detail</button>
                                <button v-else class="btn btn-primary" v-on:click="editArea"><i class="fa fa-save"></i> Finish Editing Detail</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <div class="col-md-4">
                <div class="alert alert-danger">
                    <h4 class="title"><i class="fa fa-exclamation-triangle"></i> Cautions!</h4>
                    <ul style="margin-left: -20px">
                        <li>Form with tag <span style="color: red; font-weight: bold"> *)</span> is required / cannot be blank</li>
                        <li>Please make sure form filled correctly</li>
                        <li>Dont fill form Password & Password Confirmation if you don't want to change it</li>
                    </ul>
                </div>

                <button class="btn btn-block btn-info" v-on:click="generateRandomPassword"><i class="fa fa-key"></i> Generate Random Password</button>
                <button class="btn btn-block btn-warning"><i class="fa fa-redo-alt"></i> Reset Form</button>
                <button v-on:click="saveData" class="btn btn-block btn-success"><i class="fa fa-plus"></i> Save Data</button>
            </div>
        </div>
    </div>
</template>

<script>

import PageHeader from '~~/layouts/components/PageHeader'

export default {

    loading: true,

	name: 'admin-clients-edit',

    components: {
        PageHeader,
    },

    data: () => ({

        breadcrumb_arr: [
            { title: 'Dashboard', dest: '/' },
            { title: 'Client Area', dest: '/admin/clients' },
            { title: 'Add New Client', dest: '/admin/clients/add' },
        ],

        area: {
            provinces: [],
            regencies: [],
            districts: []
        },

        errors: {},

        edit_area: false,

        client: {
            name: null,
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

            user: {
                username: ''
            }
        }
    }),
    
    mounted() {
        this.initData()
        this.getProvinces()
    },

    methods: {

        initData: function() {
            this.$axios.get('/admin_area/clients/' + this.$route.params.id)
            .then( res => {
                if(res.data.status == 1) {
                    this.client = res.data.data

                    this.client.province = JSON.parse(res.data.data.province)
                    this.client.regency = JSON.parse(res.data.data.regency)
                    this.client.district = JSON.parse(res.data.data.district)

                    this.selectProvince()
                    this.selectRegency()
                }
            })
        },

        editArea: function() {
            if(this.edit_area) {
                this.edit_area = false
            } else {
                this.edit_area = true
            }
        },

        saveData: function() {

            this.$swal({
                title: "You Are Going To Add New Client",
                text: "Continue?",
                icon: "warning",
                buttons: true,
                dangerMode: false,
            })
            .then((value) => {
                if (value) {
                    this.$axios.put('/admin_area/clients/' + this.$route.params.id, this.client)
                    .then( res => {
                        if(res.data.status == 1) {
                            this.$swal({
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500,
                                showCloseButton: true,
                            }).then( val => {
                                if(val) {
                                    window.location = '/admin/clients'
                                }
                            })

                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            this.$swal({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!',
                                footer: '<a href>Why do I have this issue?</a>'
                            })
                            this.errors = error.response.data
                            return false
                        }
                    })
                }
            })
        },

        generateRandomPassword: function() {
            var length = 6,
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            
            this.client.password = retVal
            this.client.password_confirmation = retVal
            return retVal;
        },

        getProvinces: function() {
            this.$axios.get('https://kcd.e-belajar.id/api/area/province')
            .then( res => {
                if(res.data.status == 1) {
                    this.area.provinces = res.data.data
                }
            })
        },

        selectProvince: function() {
            // Empty Address Form
            // this.client.regency = null
            // this.client.district = null

            // Empty Selection
            // this.area.regencies = []
            // this.area.districts = []

            if(this.client.province) {
                this.$axios.get('https://kcd.e-belajar.id/api/area/province/' + this.client.province.id)
                .then( res => {
                    if(res.data.status == 1) {
                        this.area.regencies = res.data.data.regency
                    }
                })
            }
        },

        selectRegency: function() {

            if(this.client.regency) {
                this.$axios.get('https://kcd.e-belajar.id/api/area/regency/' + this.client.regency.id)
                .then( res => {
                    if(res.data.status == 1) {
                        this.area.districts = res.data.data.district
                    }
                })
            }

            // Empty Address Form
            // this.client.regency = null
            // this.client.district = null

            // Empty Selection
            // this.area.districts = []

            
        }
    }

}
</script>

<style>

</style>