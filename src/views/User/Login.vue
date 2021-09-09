<template>
  <div class="contents_container">
    <h1 style="text-align: center; margin-bottom: 12px">Vue Auction!</h1>
    <form class="login_form" @submit.prevent.stop="onSubmit($event)">
      <input
        type="text"
        name="name"
        placeholder="이름를 입력해주세요"
        v-model="name"
        v-if="mode == 'join'"
      />
      <input
        type="text"
        name="loginId"
        placeholder="아이디를 입력해주세요"
        v-model="loginId"
      />
      <input
        type="password"
        name="loginPwd"
        placeholder="비밀번호를 입력해주세요."
        v-model="loginPwd"
      />
      <input
        type="text"
        name="nick"
        v-model="nick"
        placeholder="닉네임을 입력해주세요."
        v-if="mode == 'join'"
      />
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
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      mode: "login",
      name: "",
      loginId: "",
      loginPwd: "",
      nick: "",
    };
  },
  computed: {
    ...mapGetters("Login", ["loginPass"]),
  },
  methods: {
    ...mapActions("Login", ["setLoginPass"]),
    ...mapActions("User", ["setUserInfo"]),
    changeMode() {
      if (this.mode == "login") {
        this.mode = "join";
      } else {
        this.mode = "login";
      }
    },
    onSubmit() {
      const id = this.loginId;
      const pwd = this.loginPwd;
      const name = this.name;
      const nick = this.nick;

      if (id.length == 0 || pwd.length == 0) {
        alert("정보를 입력해주세요.");
      }

      if (this.mode == "login") {
        this.loginUser();
      } else if (this.mode == "join") {
        if (name.length == 0 || nick.length == 0) {
          alert("정보를 입력해주세요.");
        } else {
          this.createUser();
        }
      }
    },
    loginUser() {
      const login_data = {
        email: this.loginId,
        password: this.loginPwd,
      };
      this.$axios
        .post(`${this.$host}/users/login`, login_data)
        .then((res) => {
          const data = res.data.user_data;

          console.log(data)

          if (data.pass == true) {
            const sendUserData = {
              cid: data.id,
              name: data.name,
              nick: data.nick,
              cash: data.cash
            };

            alert("환영합니다.");
            this.setLoginPass();
            this.setUserInfo(sendUserData);
            this.$router.push({ name: "info" });
          } else {
            alert("로그인 실패.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createUser() {
      const user_data = {
        name: this.name,
        email: this.loginId,
        password: this.loginPwd,
        nick: this.nick,
      };

      this.$axios
        .post(`${this.$host}/users/join`, user_data)
        .then((res) => {
          const user_id = res.data.user_id;

          if (user_id >= 0) {
            alert("환영합니다. 로그인 해주세요.");
            this.clearInputs();
            this.mode = "loign";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearInputs() {
      this.loginId = "";
      this.loginPwd = "";
      this.name = "";
      this.nick = "";
    },
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