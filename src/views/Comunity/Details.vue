<template>
  <div id="detail_container">
    <h2 style="border-bottom: 1px solid #eee; padding: 12px !important">{{ detail.title }}</h2>
    <p style="font-size: 16px; padding: 12px;">{{ detail.content }}</p>
    <span style="float: right">{{ detail.created_at }}</span> <br>
    <span style="float: right">{{ detail.unick }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {
        title: "",
        content: "",
        created_at: "",
        unick: "",
      }
    }
  },
  created() {
    this.$axios.get(`${this.$host}/comunity/post/detail/${this.$route.params.pid}`)
      .then(data => {
        this.detail = data.data.detail;
        console.log(this.detail)
      })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>

<style>
  #detail_container {
    width: 90%;
    height: auto;
    margin: 0 auto;
    padding-top: 20px;
  }
</style>