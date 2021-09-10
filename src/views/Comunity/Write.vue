<template>
  <div class="contents_container">
    <form id="post_write_form" @submit.prevent.stop="onSubmit">
      <input
        type="text"
        name="title"
        placeholder="제목을 입력해주세요."
        v-model="post.title"
      />
      <textarea placeholder="내용을 입력해주세요." v-model="post.content" />
      <button type="submit">작성하기</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      post: {
        title: "",
        content: "",
      },
      mode: "add",
    };
  },
  computed: {
    ...mapGetters("User", ["userInfo"]),
  },
  methods: {
    onSubmit() {
      const data = {
        title: this.post.title,
        content: this.post.content,
        writer: this.userInfo.cid,
      };

      if (this.mode == "add") {
        this.addPost(data);
      }
    },
    addPost(data) {
      this.$axios
        .post(`${this.$host}/comunity/post/add`, data)
        .then((data) => {
          console.log(data.data.post_id);

          if (data.data.post_id > 0) {
            alert("게시글이 등록되었습니다.");
            this.$router.push({ name: "comunity" });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#post_write_form {
  width: 300px;
  height: 350px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
  input,
  textarea {
    width: 100%;
    border-width: 1px;
    border-radius: 6px;
    font-size: 14px;
    padding-left: 8px;
  }
  input {
    height: 45px;
  }
  textarea {
    height: 200px;
    resize: none;
    padding-top: 8px;
  }
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
</style> >
