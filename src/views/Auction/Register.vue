<template>
  <div class="contents_container">
    <form @submit.prevent.stop="onSubmit" ref="auction-form">
      <div class="contents">
        <input
          type="text"
          placeholder="경매 제목을 입력해주세요."
          v-model="form_data.title"
        />
      </div>
      <div class="contents">
        <textarea
          placeholder="물건에 대한 설명을 입력해주세요."
          v-model="form_data.content"
        />
      </div>
      <div class="contents-half" style="margin-bottom: 12px">
        <div class="hashtag_box">
          <span
            v-for="(item, index) in hashtag_arr"
            :key="index"
            style="margin-right: 4px"
            >#{{ item }}</span
          >
        </div>
        <input
          type="text"
          placeholder="해시태그를 입력해주세요."
          @keyup.prevent.stop.enter="addHashtag"
          v-model="hashtag"
          @focus="hash_focus = true"
          @blur="hash_focus = false"
        />
      </div>
      <div class="contents-half">
        <label for="stuff-img">이미지</label>
        <input
          id="stuff-img"
          type="file"
          name="stuff-img"
          enctype="multipart/form-data"
          @change="handleFileChange($event)"
          multiple
        />
      </div>
      <div class="contents-half">
        <div class="half-input">
          <span>경매 시작금액</span>
          <input
            type="number"
            placeholder="경매 시작금액"
            v-model="form_data.s_price"
          />
        </div>
        <div class="half-input">
          <span>바로 낙찰금액</span>
          <input
            type="number"
            placeholder="바로 낙찰금액"
            v-model="form_data.d_price"
          />
        </div>
      </div>
      <div class="util_box" style="text-align: center">
        <button type="submit">등록하기</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      check_cnt: 0,

      hashtag: "",
      hashtag_arr: [],
      hash_focus: false,

      images: [],

      form_data: {
        host: undefined,
        title: "",
        content: "",
        hashtags: [],
        s_price: 0,
        d_price: 0,
      },
    };
  },
  computed: {
    ...mapGetters("Login", ["loginPass"]),
    ...mapGetters("User", ["userInfo"]),
  },
  methods: {
    handleFileChange(e) {
      const files = e.target.files;

      if (files.length == 0) {
        return false;
      }
      let formData = new FormData();

      for (let i = 0, leng = files.length; i < leng; i++) {
        formData.append(`file${i}`, files[i]);
      }

      this.$axios
        .post(`${this.$host}/utils/upload`, formData)
        .then((data) => {
          for (let i = 0, leng = data.data.length; i < leng; i++) {
            this.images.push(data.data[`${i}`]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onSubmit() {
      if (this.hash_focus) {
        return;
      }
      const hashtag = this.hashtag_arr;

      this.$axios
        .post(`${this.$host}/auction/hashtag`, hashtag)
        .then((data) => {
          let res_hashtags = data.data.hashtags.sort().toString();
          this.form_data.hashtags = res_hashtags;
          this.form_data.host = this.userInfo.cid;

          this.$axios
            .post(`${this.$host}/auction`, this.form_data)
            .then((data) => {
              const auction_id = data.data.result;
              let send_data = [];
              let contents = {};

              for (let i = 0, leng = this.images.length; i < leng; i++) {
                contents = {
                  file_name: this.images[i],
                  user_id: this.userInfo.cid,
                  auction_id: auction_id,
                };

                send_data.push(contents);
              }

              this.$axios
                .post(`${this.$host}/auction/addimages`, send_data)
                .then((data) => {
                  const images_id = data.data.toString();
                  const update_data = {
                    files_id: images_id,
                    auction_id: auction_id,
                  };

                  this.$axios
                    .post(`${this.$host}/auction/updateimages`, update_data)
                    .then((data) => {
                      console.log(data);
                      if (data.data.success) {
                        alert("경매가 등록되었습니다.");
                        this.$router.push({ path: "/" });
                      } else {
                        alert("경매를 다시 등록해주세요.");
                      }
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    },

    addHashtag() {
      this.check_cnt++;
      if (this.hashtag_arr.length <= 5 && this.check_cnt == 1) {
        this.hashtag_arr.push(this.hashtag.replace(" ", ""));
        this.hashtag = "";
      }
      if (this.check_cnt >= 2) {
        this.check_cnt = 0;
      }
    },
  },
  created() {
    this.test = "<span style='backgorund-color: gold'>hihi</span>";
    if (this.userInfo.cid == undefined) {
      this.$router.push({ path: "/" });
    }
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .contents {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    margin-bottom: 12px;
    input,
    textarea {
      width: 100%;
    }
    textarea {
      height: 300px;
      resize: none;
    }
  }
  .contents-half {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
    .hashtag_box {
      width: 100%;
      height: 75px;
      border: 3px solid #41b883;
      border-radius: 5px;
      padding: 8px;
      margin-bottom: 4px;
    }
    .half-input {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      input {
        width: 70%;
      }
    }
  }
  input,
  textarea {
    height: 35px;
    padding: 8px;
  }

  button {
    float: unset;
  }
}
</style>