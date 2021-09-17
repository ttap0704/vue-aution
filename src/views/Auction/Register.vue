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
            v-model="form_data.start"
          />
        </div>
        <div class="half-input">
          <span>바로 낙찰금액</span>
          <input
            type="number"
            placeholder="바로 낙찰금액"
            v-model="form_data.direct"
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

      form_data: {
        title: "",
        content: "",
        hashtags: [],
        start: 0,
        direct: 0,
        images: [],
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

      this.check_cnt++;
      if (this.check_cnt == 1) {
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
              this.form_data.images.push(data.data[`${i}`]);
            }
            console.log(this.form_data.images);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (this.check_cnt >= 2) {
        this.check_cnt = 0;
      }
    },
    onSubmit() {
      if (this.hash_focus) {
        return;
      }

      const hashtag = this.hashtag_arr;

      this.$axios
        .post(`${this.$host}/auction/hashtag`, hashtag)
        .then((data) => {
          console.log(data);
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