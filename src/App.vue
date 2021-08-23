<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>
<script>
  const DEFAULT_LAYOUT = "layout-default";

  export default {
    name: 'app',
    components: {},
    computed: {
      layout () {
        return this.$route.meta.layout || DEFAULT_LAYOUT;
      }
    }
  }
</script>

