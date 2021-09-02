<template>
  <div class="contents_container">
    <h1 style="text-align: center; margin-bottom: 12px;">Vue Auction!</h1>
    <form class="login_form" @submit="onSubmit($event)">
      <input type="text" name="loginId" placeholder="아이디를 입력해주세요" v-model="loginId">
      <input type="password" name="loginPwd" placeholder="비밀번호를 입력해주세요." v-model="loginPwd">
      <input type="text" name="nick" v-model="nick" placeholder="닉네임을 입력해주세요." v-if="mode == 'join'">
      <button type="submit" class="cursor-p">
        {{ mode == "login" ? "로그인" : "회원가입" }}
      </button>
    </form>
    <div class="util_box">
      <span v-if="mode == 'login'">혹시 아이디가 없으신가요 ?</span>
      <span @click="changeMode" class="cursor-p">
        {{ mode == "join" ? "로그인" : "회원가입" }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mode: "login",
      loginId: "",
      loginPwd: "",
      nick: "",
    };
  },
  methods: {
    changeMode() {
      if (this.mode == "login") {
        this.mode = "join";
      } else {
        this.mode = "login";
      }
    },
    onSubmit(e) {
      const id = this.loginId;
      const pwd = this.loginPwd
      if (id.length == 0 || pwd.length ==0 ) {
        alert('정보를 입력해주세요.')
      }
      e.preventDefault();
      console.log(e)
    }
  },
};
</script>
<style lang="scss" scoped>
.login_form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: auto;
  input,
  button {
    width: 250px;
    height: 45px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 6px;
    margin-bottom: 15px;
  }
  input {
    padding: 0 10px;
  }
  button {
    background-color: #41b883;
    border: none;
    color: #fff;
  }
}
.util_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  width: 250px;
  margin: 0 auto;
}
</style>