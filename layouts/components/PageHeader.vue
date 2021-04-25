<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="page-title-box">
                <div class="btn-group pull-right">
                    <div class="mt-2">
                        <slot name="button"></slot>
                    </div>
                </div>
                <h4 class="page-title">{{ title }}
                    <br>
                    <small>
                        <ol class="breadcrumb hide-phone p-0 m-0" v-if="breadcrumb_arr">
                            <li class="breadcrumb-item" v-for="(breadcrumb, index) in breadcrumb_arr" :key="index">
                                <NuxtLink 
                                    :to="breadcrumb.dest"
                                >
                                    {{ breadcrumb.title }}
                                </NuxtLink>
                            </li>
                        </ol>
                    </small>
                </h4>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    props: ['title', 'sub_title', 'breadcrumb_arr'],

    name: 'page-header'
}
</script>

<style>

</style>