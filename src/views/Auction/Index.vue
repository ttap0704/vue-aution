<template>
  <div class="contents_container">
    <div class="util_box">
      <button @click="registerStuff">상품 등록</button>
    </div>
    <list></list>
  </div>
</template>
<script>
import List from "@/components/List.vue";

import { mapGetters } from "vuex"
export default {
  components: {
    List,
  },
  computed: {
    ...mapGetters("Login", ["loginPass"])
  },
  methods: {
    registerStuff() {
      if (!this.loginPass) {
        alert("로그인 해주세요.");
        return false;
      }
      this.$router.push({name: 'register'})
    }
  },
};
</script>
<style lang="scss" scoped>
</style>