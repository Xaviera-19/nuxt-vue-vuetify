<!-- pages/animal/detail.vue -->
<style>
img {
  height: 500px;
}
</style>
<template>
  <div>
    <p>新增時間：{{ $route.params.animal.cDate }}</p>
    <p>動物品種：{{ $route.params.animal.animal_Variety }}</p>
    <p>動物毛色：{{ $route.params.animal.animal_colour }}</p>
    <p>捕獲地點：{{ $route.params.animal.animal_foundplace }}</p>
    <p>地點：{{ $route.params.animal.animal_place }}</p>
    <p>單位名稱：{{ $route.params.animal.shelter_name }}</p>
    <p>領養地點：{{ $route.params.animal.shelter_address }}</p>
    <p>單位電話：{{ $route.params.animal.shelter_tel }}</p>
    <img :src="$route.params.animal.album_file" alt="">
  </div>
</template>

<script>
export default{
  created() {
    console.log('動物詳細資料:', this.$route.params.animal);
  }
}
</script>