<template>
  <div class="list-box b-b-e3e3e3">
    <div class="img-box">
      <img
        src="../assets/images/test.jpeg"
        :alt="item.imgAlt"
        style="width: 100%; height: 100%"
      />
    </div>
    <div class="text-box b-e3e3e3">
      <h3>{{ item.title }}</h3>
      <p>{{ item.explain }}</p>
      <small>남은시간 : 24시간</small>
      <div class="hashtag-box">
        <span
          v-for="(item, index) in item.hashtags"
          :key="index"
          style="margin-right: 4px"
          >#{{ item }}</span
        >
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
        hashtags: ["경매", "시작", "개인"],
        imgUrl: "../assets/images/test.jpeg",
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
}
.img-box {
  width: 100px;
  height: 100px;
  border: 1px solid #666;
}
.text-box {
  width: calc(90% - 100px);
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0 10px;
  .hashtag-box {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
}
</style>