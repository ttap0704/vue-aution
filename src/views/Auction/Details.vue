<template>
  <div class="contents_container">
    <div class="img_box">
      <img :src="cur_img" alt="stuff" style="width: 100%; height: 100%" />
    </div>
    <div class="host_info">
      <span>닉네임 : {{ auction.unick }}</span> <br />
      <span v-if="auction.done == 0">남은 시간 : {{ timer }}</span>
      <span v-else>종료된 경매입니다.</span>
    </div>
    <h2 style="margin-top: 12px">경매설명</h2>
    <div class="content_box">
      <div>
        {{ auction.content }}
      </div>
    </div>
    <h2 style="margin-top: 12px">입찰내역</h2>
    <div class="content_box">
      <div class="history_row" style="margin-bottom: 8px">
        <span>입찰가</span>
        <span>입찰자</span>
      </div>
      <div v-for="(item, index) in auction.history" :key="index">
        <div class="history_row">
          <span>{{ item.price }}</span>
          <span>{{ item.unick }}</span>
        </div>
      </div>
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
      <input
        type="number"
        placeholder="입찰가격을 입력해주세요"
        v-model="bid_price"
      />
      <button @click="bidAuction('c')">입찰</button>
    </div>
    <button @click="bidAuction('d')" class="direct_btn">바로구매</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      auction: {},
      cur_img: "",
      cur_img_idx: 0,

      img_interval: undefined,

      timer: "",
      timer_interval: undefined,

      bid_price: 0,
    };
  },
  computed: {
    ...mapGetters("User", ["userInfo"]),
  },
  methods: {
    ...mapActions("User", ["updateUserCash"]),
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
    bidAuction(type) {
      const login_user = this.userInfo.cid;

      let price = 0;
      if (type == "c") {
        price = this.bid_price;
      } else {
        price = this.auction.d_price;
      }

      if (login_user == this.auction.uid) {
        alert("본인이 등록한 상품은 입찰할 수 없습니다.");
        return;
      } else if (login_user == undefined) {
        alert("로그인 해주세요.");
        return;
      }

      if (price < this.auction.c_price) {
        alert("현재 가격보다 높은 가격을 입력해주세요.");
        return;
      } else if (price > this.auction.d_price) {
        alert("바로구매 가격보다 낮은 가격을 입력해주세요.");
        return;
      }

      if (this.auction.done == 1) {
        alert('종료된 경매입니다.')
        return;
      }


      const data = {
        uid: login_user,
        cash: price,
        aid: this.auction.id,
      };

      this.$axios
        .post(`${this.$host}/auction/bid`, data)
        .then((data) => {
          const res = data.data.result.success;
          if (res) {
            alert("입찰에 성공하였습니다.");
            this.updateUserCash(data.data.result.remain_cash.cash);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dircertBuy() {
      const login_user = this.userInfo.cid;
      const user_cash = this.userInfo.cash;

      if (login_user == this.auction.uid) {
        alert("본인이 등록한 상품은 구매할 수 없습니다.");
        return;
      } else if (login_user == undefined) {
        alert("로그인 해주세요.");
        return;
      }

      if (user_cash < this.auction.d_price) {
        alert("잔여 캐쉬가 부족합니다.");
        return;
      }

      // const data = {

      // }
    },
  },
  created() {
    this.$axios
      .get(`${this.$host}/auction/detail/${this.$route.params.aid}`)
      .then((data) => {
        this.auction = data.data;
        this.auction.cur_img = 0;
        this.setImgPath(this.auction.images[this.cur_img_idx]);
        this.img_interval = setInterval(this.increaseIdx, 2000);
        this.timer_interval = setInterval(this.setTimer, 1000);

        if (this.auction.done == 0) {
          this.setTimer();
        }
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
.content_box {
  width: 100%;
  height: 200px;
  border: 1px solid #e3e3e3;
  border-radius: 6px;
  padding: 12px;
  overflow: auto;
  margin-bottom: 12px;
  .history_row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    span {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.img_box {
  width: 200px;
  height: 200px;
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
  margin-top: 8px;
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