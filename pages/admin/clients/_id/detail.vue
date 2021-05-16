<template>
    <div>
        <PageHeader :title="'Showing Data of ' + client.name" :breadcrumb_arr="breadcrumb_arr">
            <template v-slot:button>
                <div v-if="client.deleted_at">
                    Deleted At {{ $moment(client.deleted_at).format('lll') }}
                    <button
                        @click="restore"
                        class="btn btn-success ml-3"
                    >
                        <i class="fa fa-upload"></i> Restore
                    </button>
                </div>
            </template>
        </PageHeader>

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <ul
                            class="nav nav-pills border-bottom mb-5 pb-3"
                            id="pills-tab"
                            role="tablist"
                        >
                            <li class="nav-item">
                                <a
                                    class="nav-link show active"
                                    id="pills-home-tab"
                                    data-toggle="pill"
                                    href="#client-profile"
                                >
                                    <i class="fa fa-user"></i> Profile Detail
                                </a>
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link show"
                                    id="pills-profile-tab"
                                    data-toggle="pill"
                                    href="#integrated-devices"
                                >
                                    <i class="fa fa-tablet-alt"></i> Integrated Devices
                                </a>
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link show"
                                    id="pills-contact-tab"
                                    data-toggle="pill"
                                    href="#setting"
                                >
                                    <i class="fa fa-cog"></i> Setting
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                            <div
                                class="tab-pane fade active show"
                                id="client-profile"
                                role="tabpanel"
                            >Profile</div>
                            <!--end tab-pane-->

                            <div
                                class="tab-pane fade"
                                id="integrated-devices"
                                role="tabpanel"
                            >Devices</div>
                            <!--end tab-pane-->

                            <div class="tab-pane fade" id="setting" role="tabpanel">Settings</div>
                            <!--end tab-pane-->
                        </div>
                        <!--end tab-contant-->
                    </div>
                    <!--end card-body-->
                </div>
                <!-- end card -->
            </div>
        </div>
    </div>
</template>

<script>
import PageHeader from "~~/layouts/components/PageHeader";

export default {
    loading: true,

    name: "admin-clients-detail",

    components: {
        PageHeader,
    },

    data: () => ({
        breadcrumb_arr: [
            { title: "Dashboard", dest: "/" },
            { title: "Client Area", dest: "/admin/clients" },
            { title: "Detail", dest: "/admin/clients/" },
        ],

        client: {
            user: {},
        },
    }),

    mounted() {
        this.initData();
    },

    methods: {
        initData: function () {
            this.$axios
                .get("/admin_area/clients/" + parseInt(this.$route.params.id))
                .then((res) => {
                    if (res.data.status == 1) {
                        this.client = res.data.data;
                    }
                });
        },

        restore: function () {
            this.$swal({
                title: "You Are Going To Restore " + this.client.name,
                text: "Continue?",
                showDenyButton: true,
                denyButtonText: `Cancel`,
                icon: "warning",
                buttons: true,
                dangerMode: false,
            }).then((value) => {
                if (value.isConfirmed) {
                    this.$axios
                        .put(
                            "/admin_area/clients/" +
                                parseInt(this.client.id) +
                                "/restore"
                        )
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.$swal({
                                    title: res.data.message,
                                    text:
                                        "Successfuly Restored " +
                                        this.client.name,
                                    icon: "success",
                                    buttons: true,
                                }).then((val) => {
                                    this.initData();
                                    if (val.isConfirmed) {
                                        window.location = "/admin/clients";
                                    }
                                });
                            }
                        });
                }
            });
        },
    },
};
</script>

<style>
</style>