<template>
  <div class="contents_container">
    <div class="img_box">
      <img :src="cur_img" alt="stuff" style="width: 100%; height: 100%" />
    </div>
    <div class="host_info">
      <span>닉네임 : {{ auction.unick }}</span> <br />
      <span>남은 시간 : {{ timer }}</span>
    </div>
    <div class="price_box">
      <div>
        <h3>현재 가격</h3>
        <h1>{{ moneyFormat(this.auction.c_price) }}</h1>
      </div>
      <div>
        <h3>바로구매 가격</h3>
        <h1>{{ moneyFormat(this.auction.d_price) }}</h1>
      </div>
    </div>
    <div class="bid_box">
      <input type="number" placeholder="입찰가격을 입력해주세요" />
      <button>입찰</button>
    </div>
    <button class="direct_btn">바로구매</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      auction: {},
      cur_img: "",
      cur_img_idx: 0,

      img_interval: undefined,

      timer: "",
      timer_interval: undefined,
    };
  },
  computed: {},
  methods: {
    setImgPath(path) {
      this.cur_img = `${this.$host}/assets/uploads/${path}`;
    },
    moneyFormat(price) {
      return `${Number(price).toLocaleString()}원`;
    },
    increaseIdx() {
      const max = this.auction.images.length - 1;

      this.cur_img_idx++;

      if (this.cur_img_idx > max) {
        this.cur_img_idx = 0;
      }

      this.setImgPath(this.auction.images[this.cur_img_idx]);
    },
    setTimer() {
      let time = this.auction.created_at;
      let remain_time =
        new Date(time).setDate(new Date(time).getDate() + 1) - new Date();
      let hour = parseInt(remain_time / 1000 / 3600);
      let second = parseInt((remain_time / 1000 / 60) % 60);

      this.timer = `${hour}시간 ${second}분`;
    },
  },
  created() {
    console.log(this.moneyFormat());
    this.$axios
      .get(`${this.$host}/auction/detail/${this.$route.params.aid}`)
      .then((data) => {
        this.auction = data.data;
        this.auction.cur_img = 0;
        this.setImgPath(this.auction.images[this.cur_img_idx]);
        this.setTimer();
        this.img_interval = setInterval(this.increaseIdx, 2000);
        this.timer_interval = setInterval(this.setTimer, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  beforeUnmount() {
    clearInterval(this.img_interval);
    clearInterval(this.timer_interval);
  },
};
</script>

<style lang="scss" scoped>
.img_box {
  width: 250px;
  height: 250px;
  border: 1px solid #e3e3e3;
  margin: 0 auto 30px;
}
.host_info {
  margin-bottom: 12px;
}
.price_box {
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #41b883;
  border-radius: 5px;
  color: #fff;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:first-of-type {
      margin-right: 50px;
    }
  }
}

.bid_box {
  height: auto;
  margin: 30px 0;
  input {
    height: 45px;
    width: calc(100% - 85px);
    border-width: 1px;
    border-radius: 6px;
    font-size: 14px;
    padding-left: 8px;
    float: left;
  }
  button {
    width: 75px;
    float: right;
    cursor: pointer;
    border-radius: 6px;
  }
}

.direct_btn {
  width: 100%;
  margin-top: 8px
}

button {
  height: 45px;
  background-color: #41b883;
  border-color: #41b883;
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
  box-shadow: unset;
}
</style>