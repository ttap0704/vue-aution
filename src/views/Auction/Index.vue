<template>
  <div class="contents_container">
    <div class="util_box">
      <input
        type="text"
        placeholder="해시태그를 입력해주세요."
        @keydown.enter="searchHashtag"
        v-model="search_value"
      />
      <button @click="registerStuff">상품 등록</button>
    </div>
    <div
      class="list-box b-b-e3e3e3"
      v-for="(item, index) in items"
      :key="index"
      @click="moveDetails(index)"
    >
      <div class="img-box" @click="increaseIdx(item)">
        <img :src="setImgPath(item.images[item.cur_img])" :alt="item.imgAlt" />
      </div>
      <div class="text-box">
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
        <small>남은시간 : {{ f_time_arr[index] }}</small>
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
      f_time_arr: [],

      search_value: "",
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
    increaseIdx(item) {
      const max = item.images.length - 1;

      if (item.cur_img == max) {
        item.cur_img = 0;
        return;
      }

      item.cur_img++;
    },
    setImgPath(path) {
      return `${this.$host}/assets/uploads/${path}`;
    },
    setTimer() {
      for (let i = 0, leng = this.time_arr.length; i < leng; i++) {
        let time = this.time_arr[i];
        let remain_time =
          new Date(time).setDate(new Date(time).getDate() + 1) - new Date();
        let hour = parseInt(remain_time / 1000 / 3600);
        let second = parseInt((remain_time / 1000 / 60) % 60);

        this.f_time_arr[i] = `${hour}시간 ${second}분`;
      }
    },
    moveDetails(idx) {
      const aid = this.items[idx].id;
      const auction = this.items[idx];
      console.log(auction);
      this.$router.push({ name: "auction-details", params: { aid, auction } });
    },
    searchHashtag() {
      const hashtag = this.search_value;

      if (hashtag) {
        console.log('gi')
      }
      this.search_value = "";
    },
  },
  created() {
    this.$axios
      .get(`${this.$host}/auction/getauctionlist`)
      .then((data) => {
        for (let i = 0, leng = data.data.length; i < leng; i++) {
          this.items.push(data.data[i]);
          this.items[i].cur_img = 0;
          this.time_arr.push(data.data[i].created_at);
        }

        if (this.time_arr.length > 0) {
          this.setTimer();
          this.timer = setInterval(this.setTimer, 1000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
  beforeUnmount() {
    this.timer = undefined;
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
  cursor: pointer;
}
.img-box {
  width: 100px;
  height: 100px;
  border: 1px solid #e3e3e3;
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