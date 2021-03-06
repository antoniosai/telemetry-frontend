<template>
    <div>
        <PageHeader
            title="Client Management"
            :sub_title="'Showing 0 from 0 client(s)'"
            :breadcrumb_arr="breadcrumb_arr"
        >
            <template v-slot:button>
                <NuxtLink to="/admin/clients/trashed" class="btn btn-danger">
                    <i class="fa fa-trash"></i> Trashed Client
                </NuxtLink>
                <NuxtLink to="/admin/clients/add" class="btn btn-primary">
                    <i class="fa fa-plus"></i> Add New Client
                </NuxtLink>
            </template>
        </PageHeader>

        <div class="row">
            <div class="col-md-12">
                <div class="table-responsive-sm">
                    <vue-good-table
                        theme="polar-bear"
                        :search-options="{
                            enabled: true,
                            trigger: 'enter',
                            skipDiacritics: true,
                            placeholder: 'Type and enter to search',
                        }"
                        mode="remote"
                        @on-selected-rows-change="selectionChanged"
                        @on-search="onColumnSearch"
                        @on-page-change="onPageChange"
                        @on-sort-change="onSortChange"
                        @on-column-filter="onColumnFilter"
                        @on-per-page-change="onPerPageChange"
                        :totalRows="table.totalRows"
                        :pagination-options="{
                            enabled: true,
                            mode: 'pages',
                            perPage: table.serverParams.perPage,
                            position: 'bottom',
                            perPageDropdown: table.perPageDropDown,
                            dropdownAllowAll: false,
                            setCurrentPage: table.serverParams.page,
                            nextLabel: 'Next',
                            prevLabel: 'Prev',
                            rowsPerPageLabel: 'Rows per page',
                            ofLabel: 'of',
                            pageLabel: 'page', // for 'pages' mode
                            allLabel: 'All',
                        }"
                        :columns="table.columns"
                        :rows="table.rows"
                        styleClass="vgt-table condensed pgTble"
                    >
                        <template
                            slot="table-row"
                            style="background-color: #c5e1a5"
                            :doc_due_date="doc_due_date"
                            slot-scope="props"
                        >
                            <span v-if="props.column.field == 'name'">
                                <NuxtLink
                                    :to="
                                        '/admin/clients/' +
                                        props.row.id +
                                        '/detail'
                                    "
                                    style="font-size: 18px"
                                >
                                    <strong>{{ props.row.name }}</strong>
                                </NuxtLink>
                                <br />
                                {{ props.row.phone_number }}
                                <br />
                                {{ props.row.email }}
                            </span>
                            <span v-if="props.column.field == 'created_at'">
                                {{
                                $moment(props.row.created_at).format(
                                "lll"
                                )
                                }}
                            </span>
                            <span v-if="props.column.field == 'owned_device_count'">
                                <span class="device-badge badge badge-success">
                                    <i class="fa fa-tablet-alt"></i>
                                    Owned
                                    {{ props.row.owned_device_count }}
                                    Device(s)
                                </span>
                            </span>
                            <span v-if="props.column.field == 'devices'">
                                <span class="device-badge badge badge-success">
                                    <i class="fa fa-chart-line"></i>
                                    {{ props.row.device_count }}
                                    integrated device(s)
                                </span>
                            </span>
                            <span v-if="props.column.field == 'ticket'">
                                <span class="device-badge badge badge-success">
                                    <i class="fa fa-check"></i> 2 done
                                </span>
                                <br />
                                <span class="device-badge badge badge-primary mt-2">
                                    <i class="fa fa-chart-line"></i> 1
                                    active
                                </span>
                            </span>
                            <span v-if="props.column.field == 'region'">
                                <span v-if="props.row.province">
                                    <strong>
                                        <i>
                                            {{
                                            props.row.province
                                            ? JSON.parse(props.row.province)
                                            .name
                                            : ""
                                            }}
                                        </i>
                                    </strong>
                                </span>
                                <br />
                                <span v-if="props.row.regency">
                                    {{
                                    props.row.regency
                                    ? JSON.parse(props.row.regency).name
                                    : ""
                                    }}
                                </span>
                                <br />
                                <span v-if="props.row.zip_code">
                                    {{
                                    props.row.zip_code
                                    ? "ZIP Code: " + props.row.zip_code
                                    : ""
                                    }}
                                </span>
                            </span>

                            <span v-if="props.column.field == 'action'">
                                <NuxtLink
                                    :to="
                                        '/admin/clients/' +
                                        props.row.id +
                                        '/detail'
                                    "
                                    class="btn btn-sm btn-info"
                                >
                                    <i class="fa fa-info"></i> Detail
                                </NuxtLink>
                                <NuxtLink
                                    :to="
                                        '/admin/clients/' +
                                        props.row.id +
                                        '/edit'
                                    "
                                    class="btn btn-sm btn-warning"
                                >
                                    <i class="fa fa-cog"></i>
                                </NuxtLink>
                                <button
                                    class="btn btn-sm btn-danger"
                                    @click="deleteClient(props.row)"
                                >
                                    <i class="fa fa-trash"></i>
                                </button>
                            </span>
                        </template>
                    </vue-good-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PageHeader from "~~/layouts/components/PageHeader";

export default {
    loading: true,

    name: "admin-clients",

    components: {},

    computed: {
        breadcrumb_arr: function () {
            return [
                {
                    title: "Dashboard",
                    dest: "/",
                },
                {
                    title: "Client Management",
                    dest: "/admin/clients",
                },
            ];
        },
    },

    data: () => ({
        table: {
            columns: [
                {
                    label: "Full Name",
                    field: "name",
                },
                {
                    label: "Region",
                    field: "region",
                },
                {
                    label: "Is Owner",
                    field: "owned_device_count",
                },
                {
                    label: "Integrated Devices",
                    field: "devices",
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

    components: {
        PageHeader,
    },

    mounted() {
        this.initData();
    },

    methods: {
        initData: function () {
            let params = this.table.serverParams;

            this.$axios.get("/admin_area/clients", { params }).then((res) => {
                this.table.rows = res.data.data;
                this.table.totalRows = res.data.total;
            });
        },
        selectionChanged(params) {
            this.table.selectedRows = [];
            for (let i = 0; i < params.selectedRows.length; i++) {
                this.table.selectedRows.push(params.selectedRows[i].pg_id);
            }
        },
        onColumnSearch(params) {
            this.updateParams(params);
            this.updateParams({
                page: 1,
            });
            this.initData();
        },
        onPageChange(params) {
            this.updateParams({
                page: params.currentPage,
            });
            this.initData();
        },
        onPerPageChange(params) {
            this.updateParams({
                perPage: params.currentPerPage,
            });
            this.initData();
        },
        onSortChange(params) {
            this.updateParams({
                sort_type: params[0].type,
                sort_field: params[0].field,
            });
            this.updateParams({
                page: 1,
            });
            this.initData();
        },

        onColumnFilter(params) {
            let col_filter = params.columnFilters;
            // this.updateParams(params)
            let new_params = {
                page: 1,
                // new
            };
            this.updateParams(new_params);
            this.initData();
        },
        onColumnSearch(params) {
            this.updateParams(params);
            this.updateParams({
                page: 1,
            });
            this.initData();
        },
        // load items is what brings back the rows from server
        loadItems() {
            this.handleDatatableChange(this.table.serverParams).then(() => {
                // this.loading.isLoading = false
            });
        },
        updateParams(newProps) {
            this.table.serverParams = Object.assign(
                {},
                this.table.serverParams,
                newProps
            );
        },

        deleteClient: function (client) {
            this.$swal({
                title: "You Are Going To Delete " + client.name,
                text: "Continue?",
                showDenyButton: true,
                denyButtonText: `Cancel`,
                icon: "warning",
                buttons: true,
                dangerMode: false,
            }).then((value) => {
                if (value.isConfirmed) {
                    this.$axios
                        .delete("/admin_area/clients/" + client.id, this.client)
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.$swal({
                                    icon: "success",
                                    title: res.data.message,
                                    showConfirmButton: false,
                                    timer: 1500,
                                    showCloseButton: true,
                                });
                                this.initData();
                            } else if (res.data.status == 0) {
                                this.$swal({
                                    icon: "error",
                                    title: res.data.message,
                                    showConfirmButton: false,
                                    timer: 1500,
                                    showCloseButton: true,
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
                                return false;
                            }
                        });
                }
            });
        },
    },
};
</script>

<style scoped>
.device-badge {
    font-size: 16px;
}

::v-deep .vgt-table {
    /* height: 100%; */
    /* border-collapse: collapse !important; */
    border-top: none !important;
}

::v-deep .vgt-table thead tr:first-child th,
.vgt-table thead tr:first-child td {
    position: sticky !important;
    position: -webkit-sticky !important; /* Safari */
    top: 0 !important;
    z-index: 1 !important;
    box-shadow: inset 0 2px 0 #dcdfe6, inset 0 -1px 0 #dcdfe6 !important;
    border: none !important;
}

::v-deep .vgt-table thead tr:nth-child(2) th,
.vgt-table thead tr:nth-child(2) td {
    position: sticky !important;
    position: -webkit-sticky !important;
    top: 34.12px !important;
    z-index: 1 !important;
    box-shadow: inset 0 1px 0 #dcdfe6, inset 0 -2px 0 #dcdfe6 !important;
    border: none !important;
}
</style>