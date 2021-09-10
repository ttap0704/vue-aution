<template>
  <div class="contents_container">
    <form @submit.prevent.stop="onSubmit">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <h2>금액</h2>
        <input
          type="number"
          placeholder="숫자만 입력해주세요."
          v-model="cash"
        />
      </div>
      <button type="submit">충전</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      cash: 0,
      totalCash: 0,
    };
  },
  computed: {
    ...mapGetters("User", ["userInfo"]),
  },
  methods: {
    ...mapActions("User", ["updateUserCash"]),
    onSubmit() {
      console.log(this.userInfo);
      this.totalCash = Number(this.cash) + Number(this.userInfo.cash);
      const data = {
        cash: this.totalCash,
        id: this.userInfo.cid,
      };

      this.$axios
        .post(`${this.$host}/users/cash`, data)
        .then((data) => {
          console.log(data);
          if (data.data.pass == true) {
            this.updateUserCash(this.totalCash);
            alert('캐쉬가 충전되었습니다.')
            this.$router.push({name: "info"})
          } else {
            alert("실패")
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created () {
    if (this.userInfo.cid == undefined) {
      this.$router.push({path: '/'})
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  width: 100%;
  height: 170px;
  margin: 0px auto;
  padding: 30px 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  input {
    width: 85%;
    border-width: 1px;
    border-radius: 6px;
    font-size: 14px;
    height: 45px;
    padding-left: 8px;
  }
  button {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    background-color: #34495e;
    border-color: #34495e;
    color: #fff;
    float: right;
    cursor: pointer;
  }
}
</style>>
