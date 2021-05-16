<template>
    <div class="card shadow rounded">
        <div class="card-body">
            <div class="row">
                <div class="col-md-2">
                    <div class="container d-flex h-100">
                        <div class="row justify-content-center align-self-center">
                            <span>Ticket Number</span>
                            <p class="mb-0" style="font-size: 22px">
                                <strong>#TIA-9942132</strong>
                            </p>
                            <span style="font-size: 18px" class="badge badge-success">SOLVED</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-10">
                    <h3>Excellent Service</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                    <div class="clearfix">
                        <div class="pull-right">
                            <button class="btn btn-success">
                                <i class="fa fa-check"></i> Close Ticket
                            </button>
                            <button class="btn btn-primary">
                                <i class="fa fa-reply"></i> Reply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer bg-secondary text-white">
            <div class="row">
                <div class="col-md-3">
                    <center>
                        <span>Client Name</span>
                        <p class="mb-0" style="font-size: 20px">
                            <NuxtLink class="style-none" to="/admin/support/ticket">
                                <strong>Antonio Saiful Islam</strong>
                            </NuxtLink>
                        </p>
                    </center>
                </div>
                <div class="col-md-2">
                    <center>
                        <span>Total Conversations</span>
                        <p class="mb-0" style="font-size: 20px">
                            <strong>12 reply</strong>
                        </p>
                    </center>
                </div>
                <div class="col-md-1">
                    <center>
                        <span>Status</span>
                        <p class="mb-0" style="font-size: 20px">
                            <strong>OPEN</strong>
                        </p>
                    </center>
                </div>
                <div class="col-md-2">
                    <center>
                        <span>Priority</span>
                        <p class="mb-0" style="font-size: 20px">
                            <strong>NORMAL</strong>
                        </p>
                    </center>
                </div>
                <div class="col-md-2">
                    <center>
                        <span>Last Reply</span>
                        <p class="mb-0" style="font-size: 20px">
                            <strong>20 May 2021 20:12</strong>
                        </p>
                    </center>
                </div>
                <div class="col-md-2">
                    <center>
                        <span>Issue Date</span>
                        <p class="mb-0" style="font-size: 20px">
                            <strong>18 May 2021 13:41</strong>
                        </p>
                    </center>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.style-none {
    text-decoration: none;
    color: white;
}
</style>