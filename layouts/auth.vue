<template>
  <div>
    
    <Nuxt />
  </div>
</template>

<script>

export default {

    name: 'layout',

    components: {
    },

    computed: {
        isLoggedIn: function() {
            return true
        }
    }
}
</script>
