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
        console.log(data.post_id > 0);

        if (data.post_id > 0) {
          this.$router.push({name: "comunity"})
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
<style lang="scss" scoped>
</style>