<template>
  <div class="contents_container">
    <div class="util_box">
      <button @click="registerStuff">상품 등록</button>
    </div>
    <div
      class="list-box b-b-e3e3e3"
      v-for="(item, index) in items"
      :key="index"
    >
      <div class="img-box" @click="increaseIdx">
        <img
          v-for="(path, img_idx) in item.images"
          :src="setImgPath(path)"
          :alt="item.imgAlt"
          :key="img_idx"
        />
      </div>
      <div class="text-box b-e3e3e3">
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
        <small>남은시간 : {{ setTimer(item.created_at) }}</small>
        <div class="hashtag-box">
          <span
            v-for="(hashtag, index) in item.hashtags"
            :key="index"
            style="margin-right: 4px"
            >#{{ hashtag }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      items: [],

      timer: undefined,
      time_arr: [],
    };
  },
  computed: {
    ...mapGetters("Login", ["loginPass"]),
  },
  methods: {
    registerStuff() {
      if (!this.loginPass) {
        alert("로그인 해주세요.");
        return false;
      }
      this.$router.push({ name: "register" });
    },
    setImgPath(path) {
      return `${this.$host}/assets/uploads/${path}`;
    },
    setTimer(time) {
      let remain_time =
        new Date(time).setDate(new Date(time).getDate() + 1) - new Date();
      let hour = parseInt(remain_time / 1000 / 3600);
      let second = parseInt((remain_time / 1000 / 60) % 60);

      return `${hour}시간 ${second}분`;
    },
  },
  created() {
    this.$axios
      .get(`${this.$host}/auction/getauctionlist`)
      .then((data) => {
        for (let i = 0, leng = data.data.length; i < leng; i++) {
          this.items.push(data.data[i]);
          this.setTimer(data.data[i].created_at, i);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
<style lang="scss" scoped>
.list-box {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.img-box {
  width: 100px;
  height: 100px;
  border: 1px solid #666;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
.text-box {
  width: calc(90% - 100px);
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0 10px;
  .hashtag-box {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
}
</style>