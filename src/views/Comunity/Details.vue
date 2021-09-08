<template>
  <div>
    hi
  </div>
</template>

<script>
export default {
  created() {
    this.$axios.get(`${this.$host}/comunity/post/detail?pid=${this.$route.params.pid}`)
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.error(error)
      })
    console.log(this.$route.params.pid)
  }
}
</script>

<style>

</style>