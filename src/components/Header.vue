<template>
  <div class="header">
    <ul>
      <li><a href="#">경매</a></li>
      <li><a href="#">커뮤니티</a></li>
      <li><a href="#">로그인</a></li>
    </ul>
  </div>
</template>
<script>
export default {
  
}
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
    }
  }
}
</style>