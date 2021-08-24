<template>
  <div>
    <router-view />
  </div>
</template>
<script>
export default {
  components: {},
  created() {
    console.log("layout");
  },
};
</script>
<style lang="scss" scoped>
div {
  display: flex;
}
</style>