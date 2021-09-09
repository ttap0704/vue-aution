<template>
  <div class="contents_container" style="overflow-y: auto">
    <div class="util_box">
      <button @click="addPost">글 작성</button>
    </div>
    <div class="posts b-b-e3e3e3" v-for="(item, index) in posts" :key="index" @click="moveDetails(item.id)">
      <div>
        <h3>{{ item.title }}</h3>
        <small>{{ contentForamt(item.content) }}</small>
      </div>
      <small style="text-align: right"
        >{{ item.unick }} <br />
        {{ item.created_at }}</small
      >
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    ...mapGetters("Login", ["loginPass"]),
  },
  methods: {
    addPost() {
      if (!this.loginPass) {
        alert("로그인 해주세요.");
        return false;
      } else {
        this.$router.push({ name: "write" });
      }
    },
    moveDetails(pid) {
      this.$router.push({name: "details", params: {pid}})
    },
    contentForamt (content) {
      let output = "";

      if (content.length > 50) {
        output = content.slice(0, 50) + "..."
      } else {
        output = content;
      }

      return output;
    }
  },
  created() {
    this.$axios
      .get(`${this.$host}/comunity/post`)
      .then((data) => {
        console.log(data.data.posts);
        this.posts = data.data.posts;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
<style lang="scss" scoped>
.posts {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 90px;
  padding: 0 10px;
  cursor: pointer;
}

.util_box {
  width: 100%;
  height: 30px;
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