<!-- pages/animal/allAnimal.vue -->
<style>
.big-title {
  font-size: 20px;
  font-weight: bolder;
}
select {
  width: 170px;
  color: aliceblue;
  background-color: black;
  text-align: center;
}
#animals {
  width: 100%;
  height: 750px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0;
  overflow-y: scroll;
  overflow-x: hidden;
}
#animals::-webkit-scrollbar {
  display: none;
}
#animals .card {
  max-width: 260px;
  height: 730px;
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
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.isDisplay {
  display: none;
}
.animalPicture {
  display: block;
  height: 100%;
}
</style>
<template>
  <div>
    <hr />
    <!-- 用來搜尋 -->
    <h2>想要阿貓還是阿狗/公母任選/地區任選</h2>
    <p>找{{ type }}，性別{{ sex }}</p>
    <p v-text="'我要找' + type + '性別' + sex"></p>
    <div>
      <!-- <div v-pre> -->
      <select v-model="type">
        <option value="">傻子才選我全都要</option>
        <option value="狗">選阿狗</option>
        <option value="貓">挑阿貓</option>
      </select>
      <input type="radio" v-model="sex" value="M" name="sex" />
      <span>公</span>
      <input type="radio" v-model="sex" value="F" name="sex" />
      <span>母</span>
      <input type="checkbox" v-model="cities" value="新竹" id="" />
      <span>新竹</span>
      <input type="checkbox" v-model="cities" value="高雄" id="" />
      <span>高雄</span>
      <input type="checkbox" v-model="cities" value="彰化" id="" />
      <span>彰化</span>
    </div>
    <hr />
    <!-- FOREACH -->
    <h2>等待家的毛孩們</h2>
    <!-- <v-row> -->
    <button @click="prevPage">上一頁</button>
    <span>❮{{ currentPage + 1 }} / {{ totalPages }}❯</span>
    <button @click="nextPage">下一頁</button>{{ itemsPerPage }}
    <select v-model="itemsPerPage">
      <option value="6">每頁6筆</option>
      <option value="12">每頁12筆</option>
      <option value="18">每頁18筆</option>
    </select>
    <!-- </v-row> animalDatas-->
    <div id="animals" @scroll="handleScroll">
      <!-- 全部 -->
      <!-- <v-card
        v-for="item in animalDatas"
        :key="item.aniaml_id"
        elevation="7"
        class="card"
      > -->
      <!-- 篩選過的 -->
      <v-card
        v-for="item in currentPageData"
        :key="item.aniaml_id"
        elevation="7"
        class="card"
      >
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
          <v-col>
            <p>
              年齡：
              <span v-if="item.animal_age === 'ADULT'">我是大朋友</span>
              <span v-else>我是小屁孩</span>
            </p>
            <p>顏色：{{ item.animal_colour }}</p>
          </v-col>
        </v-card-subtitle>
        <div class="img-box">
          <img
            @click="getSrc(item.album_file)"
            :src="item.album_file"
            alt="尚無動物圖片"
          />
        </div>
        <v-card-text>
          <p>拾獲地點：{{ item.animal_foundplace }}</p>
          <p>動物地點：{{ item.animal_place }}</p>
          <p>領養資訊：{{ item.shelter_name }}</p>
          <p>單位地址：{{ item.shelter_address }}</p>
          <p>單位電話：{{ item.shelter_tel }}</p>
        </v-card-text>
        <v-row class="justify-center">
          <v-btn @click="showDetail(item)">詳細資料</v-btn>
        </v-row>
      </v-card>
    </div>

    <div :class="{ isDisplay }" class="overlay">
      <img
        @click.self="togglePic"
        class="animalPicture"
        :src="animalPic"
        alt="動物全圖"
      />
    </div>
  </div>
</template>
<script>
export default {
  //資料放置區
  data() {
    return {
      footerText: "綜合作業",
      animalDatas: [],

      type: "", //貓?狗?
      sex: "", //公?母?
      cities: [], //篩選縣市

      itemsPerPage: 6, // 每頁顯示6筆
      currentPage: 0, // 當前頁數
      isDisplay: true,
      animalPic: "",
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
      console.log(123);
      return this.sixDatas.length > 0 ? this.sixDatas : this.filteredData;
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
    },
    getSrc(item) {
      this.animalPic = "";
      console.log(item);
      this.animalPic = item;
      this.isDisplay = !this.isDisplay;
    },
    togglePic() {
      this.isDisplay = !this.isDisplay;
      console.log(123);
    },
    handleScroll(event) {
      // 在這裡處理滾動事件
      console.log("滾動事件", event);
      console.log(event.preventDefault());
    },
    showDetail(animal) {
    // 在這裡處理顯示詳細資料的邏輯
    // 例如，導航到別的畫面，並將動物物件作為參數傳遞
    this.$router.push({ name: 'animal-detail', params: { animal } });
  },
  },
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
