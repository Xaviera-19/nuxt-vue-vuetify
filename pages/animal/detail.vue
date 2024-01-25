<!-- pages/animal/detail.vue -->
<style>
img {
  height: 500px;
}
</style>
<template>
  <div>
    <p>新增時間：{{ itemData.cDate }}</p>
    <p>動物品種：{{ itemData.animal_Variety }}</p>
    <p>動物毛色：{{ itemData.animal_colour }}</p>
    <p>捕獲地點：{{ itemData.animal_foundplace }}</p>
    <p>地點：{{ itemData.animal_place }}</p>
    <p>單位名稱：{{ itemData.shelter_name }}</p>
    <p>領養地點：{{ itemData.shelter_address }}</p>
    <p>單位電話：{{ itemData.shelter_tel }}</p>
    <img :src="itemData.album_file" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemData: null,
    };
  },
  created() {
    console.log("動物詳細資料 ID:", this.$route.params.id);
    // 將 Vuex store 中的 animalDetail 資料塞進 itemData 中
    this.itemData = this.$store.state.animalDetail;
    console.log("動物詳細資料:", this.itemData);
  },
};
</script>

