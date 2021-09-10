<template>
  <div class="contents_container">
    <form>
      <div class="contents">
        <input type="text" placeholder="경매 제목을 입력해주세요." />
      </div>
      <div class="contents">
        <textarea placeholder="물건에 대한 설명을 적어주세요." />
      </div>
      <div class="contents-half">
        <div>
          <span>경매 시작금액</span>
          <input type="number" placeholder="경매 시작금액" />
        </div>
        <div>
          <span>바로 낙찰금액</span>
          <input type="number" placeholder="바로 낙찰금액" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
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
    input,
    textarea {
      width: 100%;
      padding: 8px;
    }
  }
  .contents-half {
    width: 100%;
    display: flex;
    flex-direction: column;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        width: 70%;
        padding: 8px;
      }
    }
  }
  input {
    height: 35px;
  }
}
</style>