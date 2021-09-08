<template>
  <div class="contents_container">
    <list></list>
  </div>
</template>
<script>
import List from "@/components/List.vue";

export default {
  components: {
    List,
  },
  created() {
    this.$axios
      .get(`${this.$host}/`)
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
<style lang="scss" scoped>
</style>