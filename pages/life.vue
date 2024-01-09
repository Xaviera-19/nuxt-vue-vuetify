<style>
input {
  color: white;
  background-color: blueviolet;
  border-radius: 10px;
  text-align: center;
}
main button {
  color: black;
  background-color: beige;
  border-radius: 10px;
  padding: 5px 8px;
}
hr {
  margin: 15px 0;
}
.user-container{
  width: 100%;
  display: flex;
  justify-content: space-between;
}

</style>
<template>
  <div>
    <p>生命週期</p>
    <p>暱稱：{{ nickName }}</p>
    <input v-model="inputText" type="text" class="" />
    <button @click="updatevue">update</button>
    <hr />
    <p>密碼:{{ password }}</p>
    <input v-model="changePassword" type="text" class="pass" />
    <input type="text" class="checked" />
    <button @click="changePass">密碼更新</button>
    <hr />
    <div class="user-container">
      <v-card v-for="(item, index) in userList" :key="index">
        <p>{{ item.name.title }}.{{ item.name.first }}.{{ item.name.last }}</p>
        <img :src="item.picture.large" alt="">
      </v-card>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickName: "尚未取暱稱",
      password: "0123456",
      inputText: "",
      changePassword: "",
      userList: [],
      listTwo: [],
    };
  },
  //vue 的元素被建立之前 所以在這邊LOG nickName 會ㄤ低放
  //在這邊被叫出來的檔案不會被VUE監視 無法變成REF資料 更改了因為監視不到 畫面不會更新
  //適合外部接近來的API資料-無法變更
  beforeCreate() {
    console.log(
      "beforeCreate：vue的元素被建立之前，像是 vue 裡面的 data methods 都會ㄤ低放"
    );
    console.log("beforeCreate：", this.nickName);
    fetch("https://randomuser.me/api/?results=5")
      .then((response) => response.json())
      .then((data) => {
        // console.log("B", data.results);
        this.userList = data.results;
        console.log("B", this.userList);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  },
  //vue的實體已經建立 所以DATA內的東西就能LOG出來
  //所以像是遊戲帳戶是要用因為密碼跟暱稱有可能被使用者更改的就可以在這取資料
  //適合 內部API - 可以變更
  created() {
    console.log("created：", this.nickName);
  },
  //進行DOM操作無效
  beforeMount() {
    console.log("beforeMount：vue的元素已經建立完畢，還沒跟el進行綁定");
  },
  //
  mounted() {
    console.log(
      "mounted：vue的元素已經與網頁的元素掛載綁定完畢，達到資料雙向的效果"
    );
  },
  //
  beforeUpdate() {
    console.log("beforeUpdate：數據即將更新但尚未重新渲染之前被調用。");
  },
  //
  updated() {
    console.log("updated：數據已經被重新渲染後被調用。");
  },
  //
  beforeDestroy() {
    console.log("beforeDestroy：Vue 實例即將被銷毀前被調用。");
  },
  //
  destroyed() {
    console.log("destroyed：Vue 實例已經被完全銷毀。");
  },
  //
  methods: {
    updatevue() {
      this.nickName = this.inputText;
    },
    changePass() {
      this.password = this.changePassword;
    },
  },
};
</script>
