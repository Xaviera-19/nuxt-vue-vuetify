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
  height: 792px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 0;
  overflow-y: scroll;
  overflow-x: hidden;
}
#animals::-webkit-scrollbar {
  display: none;
}
#animals .card {
  max-width: 260px;
  height: 620px;
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
.v-application p {
    margin-bottom: 0px !important;
}
</style>
<template>
  <div>
    <!-- 用來搜尋 -->
    <h2>想要阿貓還是阿狗/公母任選/地區任選</h2>
    <div v-pre>
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
      <span v-text="type + sex + cities"></span>
    </div>
    <hr />

    <h2>等待家的毛孩們</h2>
    <button @click="prevPage">上一頁</button>
    <span>❮{{ currentPage + 1 }} / {{ totalPages }}❯</span>
    <button @click="nextPage">下一頁</button>{{ itemsPerPage }}
    <select v-model.number="itemsPerPage">
      <option value="6">每頁6筆</option>
      <option value="12">每頁12筆</option>
      <option value="18">每頁18筆</option>
      <option value="24">每頁24筆</option>
    </select>
    <div id="animals" @scroll ="handleScroll" ref="showAnimalArea">
      <v-card
        v-for="item in currentPageData"
        :key="item.aniaml_id"
        elevation="8"
        class="card"
      >
        <v-row class="justify-center">
          <v-card-title>
            <cat v-if="item.animal_kind === '貓'" />
            <dog v-else />
            <p class="m-0">
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
          <v-btn @click="showDetail(item, item.animal_id)">詳細資料</v-btn>
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
  watch: {
    itemsPerPage(oldPage, newPage) {
      console.log(oldPage, newPage);
    },
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
      return this.sixDatas.length > 0 ? this.sixDatas : this.filteredData;
    },
  },
  //適合執行指令的函式 - 不會留存結果 直接執行完
  methods: {
    // 切換到下一頁
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        this.scrollToTop();
      }
    },
    scrollToTop() {
      const area = this.$refs.showAnimalArea;
      if (area) {
        area.scrollTop = 0;
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
    },
    handleScroll(event) {
      // 在這裡處理滾動事件
      console.log("滾動事件", event);
    },
    showDetail(item, id) {
      this.$store.commit("setItemDetail", item);
      this.$router.push({ name: "animal-detail", params: { id: id } });
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
