<template>
    <div class="card card-custom card-shadow bg-white border-white border-0">
        <div class="card-custom-img">
            <iframe
                height="100%"
                width="100%"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                :src="'https://maps.google.com/maps?q='+device.latitude+','+device.longitude+'&hl=id&z=14&amp;output=embed'"
            ></iframe>
        </div>
        <div class="card-custom-avatar">
            <!-- <img
                            class="img-fluid"
                            src="http://res.cloudinary.com/d3/image/upload/c_pad,g_center,h_200,q_auto:eco,w_200/bootstrap-logo_u3c8dx.jpg"
                            alt="Avatar"
            />-->
        </div>
        <div class="card-body" style="overflow-y: auto">
            <div class="card-title">
                <h3 class="mb-2">{{ device.name }}</h3>
                <span class="mr-2 pointer desc-badge">
                    <i class="fa fa-user mr-0"></i>
                    {{ device.owner.name }}
                </span>
                <span class="mr-2 pointer desc-badge">
                    <i class="fa fa-map-marker mr-0"></i>
                    {{ device.regency ? JSON.parse(device.regency).name : '' }}
                </span>
                <span class="mr-2 pointer desc-badge">
                    <i class="fa fa-clock mr-0"></i>
                    {{ $moment(device.created_at).format(
                    "D MMMM yyyy"
                    ) }}
                </span>
                <span class="mr-2 desc-badge">
                    <i class="fa fa-sync mr-0"></i>
                    {{ device.sensor.length > 0 ? $moment(device.sensor[0].created_at).format(
                    "D MMMM yyyy LT"
                    ) : 'No Sensor Data' }}
                </span>
            </div>
            <hr />
            <div class="row">
                <div class="col-md-6">
                    <div class="card card-shadow card-secondary">
                        <div class="card-body">
                            <blockquote class="card-bodyquote">
                                <p v-html="device.description"></p>
                            </blockquote>
                        </div>
                    </div>
                </div>
                <div class="col-md-6"></div>
            </div>
        </div>
        <div class="card-footer" style="background: inherit; border-color: inherit;">
            <div class="row">
                <div class="col-md-6">
                    <button class="btn btn-success">
                        <i class="fa fa-database"></i> Reset Device
                    </button>
                </div>
                <div class="col-md-6">
                    <div class="clearfix">
                        <div class="pull-right">
                            <div class="btn-group">
                                <a href="#" class="btn btn-danger">
                                    <i class="fa fa-trash"></i>
                                </a>
                                <a href="#" class="btn btn-warning">
                                    <i class="fa fa-cog"></i>
                                </a>
                                <a
                                    :href="
                                                            '/admin/devices/' +
                                                            device.id
                                                        "
                                    class="btn btn-primary"
                                >
                                    <i class="fa fa-info"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["device"],
};
</script>

<style>
</style>