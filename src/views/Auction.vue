<template>
  <div class="contents_container">
    <list></list>
  </div>
</template>
<script>
  import List from "../components/List.vue"

  export default {
    components: {
      List
    },
    created () {
      console.log('hi')
    }
  }
</script>
<style lang="scss" scoped>
</style>