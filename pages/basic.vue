<style>
.big-title {
  font-size: 20px;
  font-weight: bolder;
}
#animals {
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: space-between;
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
      <div>我要找{{ type }}，性別{{ sex }}，在{{ cities }}。</div>
      <input type="radio" v-model="sex" value="M" id="" />
      <span>公</span>
      <input type="radio" v-model="sex" value="F" id="" />
      <span>母</span>
      <select v-model="type">
        <option value="">全部</option>
        <option value="狗">狗</option>
        <option value="貓">貓</option>
      </select>
      <input type="checkbox" v-model="cities" value="新竹" id="" />
      <span>新竹</span>
      <input type="checkbox" v-model="cities" value="高雄" id="" />
      <span>高雄</span>
      <input type="checkbox" v-model="cities" value="彰化" id="" />
      <span>彰化</span>
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
      <v-card v-for="item in currentPageData" :key="item.aniaml_id" elevation="7">
        <v-row>
          <v-card-title>
            <cat v-if="item.animal_kind === '貓'" />
            <dog v-else />
            <p>
              {{ item.animal_Variety }}(
              <span v-if="item.animal_sex === 'F'">母</span>
              <span v-else>公</span>
              )
            </p>
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
    <button @click="prevPage">上一頁</button>
    <span>❮{{ currentPage + 1 }} / {{ totalPages }}❯</span>
    <button @click="nextPage">下一頁</button>
  </div>
</template>
<script>
export default {
  //資料放置區
  data() {
    return {
      animalDatas: [],

      type: "", //貓?狗?
      sex: "", //公?母?
      cities: [], //篩選縣市
      keywords: "", //關鍵字搜尋

      itemsPerPage: 6, // 每頁顯示6筆
      currentPage: 0, // 當前頁數
    };
  },
  //適合計算函式 - 會緩存結果
  computed: {
    filteredData() {
      return this.animalDatas.filter((item) => {
        const typeCondition = !this.type || item.animal_kind === this.type;
        const sexCondition = !this.sex || item.animal_sex === this.sex;
        const cityCondition =
          this.cities.length === 0 ||
          this.cities.some((city) => item.shelter_address.includes(city));

        return typeCondition && cityCondition && sexCondition;
      });
    },
    //一頁顯是六筆
    sixDatas() {
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredData.slice(start, end);
    },
    //總頁數
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
    //當前頁數
    currentPageData() {
      return this.sixDatas.length > 0
        ? this.sixDatas
        : this.filteredData;
    },
  },
  //適合執行指令的函式 - 不會留存結果 直接執行完
  methods: {
    // 切換到下一頁
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
      }
    },
    // 切換到上一頁
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
      // if(this.currentPage === 0) {
      //   this.currentPage = this.totalPages;
      // }
    },
  },
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
