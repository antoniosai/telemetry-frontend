<template>
    <div>
        <PageHeader title="Support Ticket System" :breadcrumb_arr="breadcrumb_arr">
            <template v-slot:button>
                <button class="btn btn-primary">
                    <i class="fa fa-sync-alt"></i> Refresh
                </button>
            </template>
        </PageHeader>

        <div class="row">
            <div class="col-md-9">
                <TicketCard />
                <TicketCard />
                <TicketCard />
            </div>
            <div class="col-md-3">
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
                                            @keyup.enter="submitFilter"
                                            type="text"
                                            class="form-control"
                                            id="inputname1"
                                            placeholder="Search here anything"
                                        />
                                    </div>
                                    <div class="col-md-9">
                                        <p class="mb-2">Ticket Status</p>
                                        <div>
                                            <div class="form-check-inline my-2">
                                                <div class="custom-control custom-checkbox">
                                                    <input
                                                        checked
                                                        type="checkbox"
                                                        class="custom-control-input"
                                                        id="customCheck6"
                                                        data-parsley-multiple="groups"
                                                        data-parsley-mincheck="2"
                                                    />
                                                    <label
                                                        class="custom-control-label"
                                                        for="customCheck6"
                                                    >Show All</label>
                                                </div>
                                            </div>
                                            <div class="form-check-inline my-2">
                                                <div class="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        class="custom-control-input"
                                                        id="customCheck7"
                                                        data-parsley-multiple="groups"
                                                        data-parsley-mincheck="2"
                                                    />
                                                    <label
                                                        class="custom-control-label"
                                                        for="customCheck7"
                                                    >CSS</label>
                                                </div>
                                            </div>
                                            <div class="form-check-inline my-2">
                                                <div class="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        class="custom-control-input"
                                                        id="customCheck8"
                                                        data-parsley-multiple="groups"
                                                        data-parsley-mincheck="2"
                                                    />
                                                    <label
                                                        class="custom-control-label"
                                                        for="customCheck8"
                                                    >Javascript</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
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
</template>

<script>
import PageHeader from "~~/layouts/components/PageHeader";
import TicketCard from "~~/pages/admin/support/ticket/components/Card";

export default {
    components: {
        PageHeader,
        TicketCard,
    },

    computed: {
        breadcrumb_arr: function () {
            return [
                {
                    title: "Dashboard",
                    dest: "/",
                },
                {
                    title: "Support",
                    dest: "/admin/support",
                },
                {
                    title: "Ticket",
                    dest: "/admin/support/ticket",
                },
            ];
        },
    },

    methods: {
        submitFilter: function () {
            // this.devices = [];
            // this.initData();
            // this.filters.page = 1;
            // this.devices = [];
            // this.$refs.InfiniteLoading.stateChanger.reset();
        },

        resetFilter: function () {
            // this.filters = {
            //     page: 1,
            //     searchTerm: null,
            //     status: null,
            //     province: null,
            //     regency: null,
            //     district: null,
            // };
            // this.submitFilter();
        },
    },
};
</script>

<style scoped>
/* .card {
    border-radius: 30px;
}

.card-footer {
    border-radius: 30px;
} */
</style>