<template>
  <div class="header">
    <ul>
      <li>
        <router-link to="/auction">경매</router-link>
      </li>
      <li><router-link to="/comunity">커뮤니티</router-link></li>
      <li v-if="!loginPass"><router-link to="/login" >로그인</router-link></li>
      <li v-else-if="loginPass"><router-link to="/info" >내 정보</router-link></li>
    </ul>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters("Login", ["loginPass"])
  },
  methods: {
    movePage() {
    },
  },
  created() {
  },
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}

ul {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  background-color: #41b883;
  li {
    width: 75px;
    text-align: center;
    a {
      color: #fff;
      &.active {
        color: yellow;
      }
    }
  }
}
</style>