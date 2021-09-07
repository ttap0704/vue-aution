<template>
  <div class="contents_container">
    <div class="util_box">
      <router-link to="/comunity/write">
        <button>글 작성</button>
      </router-link>
    </div>
    <div
      class="posts b-b-e3e3e3"
      v-for="(item, index) in posts"
      :key="index"
    >
      <h3>{{ item.contents }}</h3>
      <small style="text-align: right"
        >{{ item.nick }} <br />
        {{ item.post_date }}</small
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      posts: [
        {
          contents: "조이입니다.",
          nick: "조이",
          post_date: "2021. 08. 25",
        },
      ],
    };
  },
  // created () {
  //   this.$axios.get()
  // }
};
</script>
<style lang="scss" scoped>
.posts {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 60px;
  padding: 0 10px;
}

.util_box {
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  button {
    width: 75px;
    height: 25px;
    background-color: #34495e;
    border-color: #34495e;
    color: #fff;
    float: right;
    cursor: pointer;
  }
}
</style>