<template>
  <div>
    <h1 class="text-center" style="padding: 40px 0">내 정보</h1>
    <div class="user_info_container">
      <h2>닉네임: {{ userInfo.nick }}</h2>
      <h2>잔여 캐쉬: {{ userInfo.cash }}원</h2>
      <button @click="$router.push({name: 'cash'})">캐쉬 충전</button>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex"

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters("User", ["userInfo"])
  },
  created() {
    if (this.userInfo.cid == undefined) {
      this.$router.push({name: 'login'});
    }
  }
};
</script>
<style lang="scss" scoped>
.user_info_container {
  width: 100%;
  height: 250px;
  border: 1px solid #f0f0f0;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #41b883;
  color: #fff;
  h2 {
    padding:12px 0;
  }
  button {
    width: 75px;
    height: 25px;
    background-color: #34495e;
    border-color: #34495e;
    color: #fff;
    float: right;
    cursor: pointer;
    margin: 12px 0 0;
  }
}
</style>