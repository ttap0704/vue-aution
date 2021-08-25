<template>
  <div class="contents_container">
    <div class="com_list b-b-e3e3e3" v-for="(item, index) in com_list" :key="index">
      <h3> {{ item.contents }} </h3>
      <small style="text-align: right">{{ item.nick }} <br> {{ item.post_date }}</small>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      com_list: [
        {
          contents: '조이입니다.',
          nick: '조이',
          post_date: '2021. 08. 25'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.com_list {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 60px;
  padding: 0 10px;
}
</style>