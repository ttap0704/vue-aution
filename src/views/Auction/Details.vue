<template>
  <div class="contents_container">
    <div class="img_box">
      <img
        :src="setImgPath(auction.images[auction.cur_img])"
        alt=""
        style="width: 100%; height: 100%"
      />
    </div>
    <div class="detail_box">
      <div class="host_info">
        <span>닉네임 : {{ auction.unick }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      auction: {},
    };
  },
  methods: {
    setImgPath(path) {
      return `${this.$host}/assets/uploads/${path}`;
    },
  },
  created() {
    this.$axios
      .get(`${this.$host}/auction/detail/${this.$route.params.aid}`)
      .then((data) => {
        this.auction = data.data;
        this.auction.cur_img = 0;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.img_box {
  width: 250px;
  height: 250px;
  border: 1px solid #e3e3e3;
  margin: 0 auto 30px;
}
</style>