<template>
  <div>
    <h1 class="text-center" style="padding: 40px 0">내 정보</h1>
    <div class="user_info_container">
      <h2>닉네임: {{ userInfo.nick }}</h2>
      <h2>잔여 캐쉬: (예정)</h2>
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
    console.log(this.userInfo)
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
}
</style>