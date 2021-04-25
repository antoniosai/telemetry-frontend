<template>
    <div>
        <Nuxt />
    </div>
</template>

<script>
export default {
    name: "auth-layout",

    components: {},

    computed: {
        isLoggedIn: function () {
            return true;
        },
    },
};
</script>
