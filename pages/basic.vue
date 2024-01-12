<style>
.big-title {
  font-size: 20px;
  font-weight: bolder;
}
#animals {
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  background-color: white;
  margin: 20px 0;
  overflow-x: scroll;
  overflow-y: hidden;
}
#animals v-card {
  width: 20%;
}
#animals .img-box {
  width: 260px;
  height: 185px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#animals .img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
<template>
  <div>
    <h1 class="big-title">Vue Basic</h1>
    <hr />
    <!-- 用來搜尋 -->
    <h2>搜尋區域QQ</h2>
    <div>
      <div>種{{ type }}縣市{{ cities }}關鍵字{{ keywords }}</div>
      <input type="radio" v-model="type" value="狗" id="" />
      <span>狗</span>
      <input type="radio" v-model="type" value="貓" id="" />
      <span>貓</span>
      <input type="checkbox" v-model="cities" value="台中市" id="" />
      <span>台中市</span>
      <input type="checkbox" v-model="cities" value="高雄市" id="" />
      <span>高雄市</span>
      <input type="checkbox" v-model="cities" value="彰化縣" id="" />
      <span>彰化縣</span>
      <input
        type="text"
        v-model="keywords"
        name=""
        placeholder="請輸入關鍵字"
      />
    </div>
    <hr />
    <!-- FOREACH -->
    <h2>阿貓阿狗們</h2>
    <div id="animals">
      <v-card v-for="item in animalDatas" :key="item.aniaml_id" elevation="7">
        <v-row>
          <v-card-title>
            <cat v-if="item.animal_kind === '貓'" />
            <dog v-else />
            <p>{{ item.animal_Variety }}</p>
          </v-card-title>
        </v-row>
        <v-card-subtitle>
          <v-row>
            <p>年齡：{{ item.animal_age }}</p>
            <p>顏色：黃色</p>
          </v-row>
        </v-card-subtitle>
        <div class="img-box">
          <img :src="item.album_file" alt="尚無動物圖片" />
        </div>
        <v-card-text>
          <p>拾獲地點：{{ item.animal_foundplace }}</p>
          <p>動物地點：{{ item.animal_place }}</p>
          <p>領養資訊：{{ item.shelter_name }}</p>
          <p>單位地址：{{ item.shelter_address }}</p>
          <p>單位電話：{{ item.shelter_tel }}</p>
        </v-card-text>
      </v-card>
    </div>
    <button>上一頁</button>
    <button>下一頁</button>
  </div>
</template>
<script>
export default {
  //資料放置區
  data() {
    return {
      animalDatas: [],
      serachAnimals: [],
      type: "", //貓?狗?
      cities: [], //篩選縣市
      keywords: "", //關鍵字搜尋
    };
  },
  //適合計算函式 - 會緩存結果
  computed: {
    filterDatas() {
      return this.animalDatas.filter((item) => {
        // 根據選擇的條件過濾資料
        const typeCondition =
          !this.selectedType || item.animal_kind === this.selectedType;
        const cityCondition =
          this.selectedCities.length === 0 ||
          this.selectedCities.includes(item.animal_place);
        const keywordCondition =
          !this.keyword ||
          (item.animal_kind + item.animal_place).includes(this.keyword);

        // 回傳符合所有條件的資料
        return typeCondition && cityCondition && keywordCondition;
      });
    },
  },
  //適合執行指令的函式 - 不會留存結果 直接執行完
  methods: {},
  //還不知道
  // watch
  // mixin
  created() {
    fetch(
      "https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL"
    )
      .then((res) => res.json())
      .then((data) => {
        this.animalDatas = data;
        console.log(data);
      })
      .catch((error) => {
        console.error("error!", error);
      });
  },
};
</script>
