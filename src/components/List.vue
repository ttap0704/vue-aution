<template>
  <div class="list-box">
    <div class="img-box">
      <img :src="item.imgUrl" :alt="item.imgAlt" />
    </div>
    <div class="text-box">
      <h3>{{ item.title }}</h3>
      <p>{{ item.explain }}</p>
      <div class="hashtag-box">
        <span v-for="(item, index) in item.hashtags" :key="index" style="margin-right: 4px;">#{{item}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      item: {
        title: "안녕",
        explain: "나는 조이야",
        hashtags: ["경매", "시작"],
        imgUrl: "../assets/logo.png",
        imgAlt: "몰라",
      },
    };
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
  border-bottom: thin solid #666;
}
.img-box {
  width: 100px;
  height: 100px;
  border: 1px solid #666;
}
.text-box {
  width: calc(90% - 100px);
  height: 100px;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}
.hashtag-box {
  display: flex;
  justify-content: flex-end;
}
</style>