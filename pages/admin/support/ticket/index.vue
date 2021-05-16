<template>
    <div>
        <PageHeader title="Support Ticket System" :breadcrumb_arr="breadcrumb_arr" />

        <div class="row">
            <div class="col-md-9">
                <TicketCard />
            </div>
            <div class="col-md-3"></div>
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