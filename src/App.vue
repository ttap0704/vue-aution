<template>
  <component :is="layout">
    <Header />
    <router-view />
  </component>
</template>
<script>
import LayoutDefault from "./layout/LayoutDefault.vue";
import Header from "./components/Header.vue"

export default {
  name: "app",
  components: {
    Header
  },
  computed: {
    layout() {
      return this.$route.meta.layout || LayoutDefault;
    },
  },
};
</script>

<style lang="scss">
@import "assets/sass/app.scss"
</style>

