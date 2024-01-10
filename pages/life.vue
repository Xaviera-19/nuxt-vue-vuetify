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
.user-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.redTest {
  color: red;
  font-weight: bold;
}
</style>
<template>
  <div>
    <p id="title">生命週期</p>
    <p>暱稱：{{ nickName }}</p>
    <input v-model="inputText" type="text" class="" />
    <button @click="updateNick">update</button>
    <hr />
    <p>密碼:{{ password }}</p>
    <input v-model="changePassword" type="text" class="pass" />
    <button @click="changePass">密碼更新</button>
    <hr />
    <div class="user-container">
      <v-card v-for="(item, index) in userList" :key="index">
        <p>{{ item.name.title }}.{{ item.name.first }}.{{ item.name.last }}</p>
        <img :src="item.picture.large" alt="" />
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
    };
  },
  //vue 的元素被建立之前 所以在這邊LOG nickName 會ㄤ低放
  //在這邊被叫出來的檔案不會被VUE監視 無法變成REF資料 更改了因為監視不到 畫面不會更新
  //適合外部 近來的API資料-無法變更
  async beforeCreate() {
    console.log(
      "beforeCreate：vue的元素被建立之前，像是 vue 裡面的 data methods 都會ㄤ低放"
    );
    console.log("beforeCreate：", this.nickName);
    await fetch("https://randomuser.me/api/?results=5")
      .then((response) => response.json())
      .then((data) => {
        this.userList = data.results;
        console.log("B", this.userList);
      })
      .catch((error) => {
        console.error("error!", error);
      });
    console.log(123);
  },
  //vue的實體已經建立 所以DATA內的東西就能LOG出來
  //像是遊戲帳戶是要用因為密碼跟暱稱有可能被使用者更改的就可以在這取資料
  //適合 內部API - 可以變更
  created() {
    console.log("created：", this.nickName);
  },
  //template內的東西已經變成虛擬的DOM 只是還沒被放進網頁中所以還無法雙向溝通
  beforeMount() {
    console.log(this.$el);
    let titleText = this.$el.querySelector("#title");
    titleText.classList.add("redTest");
    console.log("beforeMount：vue的元素已經建立完畢，尚未顯示在網頁上");
  },
  //1. 2. 在裡面呼叫都是進行非同步
  mounted() {
    console.log(
      "mounted：vue的元素已經與網頁的元素形成羈絆，達到資料雙向的效果"
    );
    let titleText = this.$el.querySelector("#title").innerText;
    console.log("mount", titleText);
  },
  //
  beforeUpdate() {
    console.log("beforeUpdate：數據即將更新但尚未到畫面上");
  },
  //
  updated() {
    console.log("updated：數據已經被重新更新到畫面上。");
  },
  // 若有還在執行但尚未完成的 要在這邊下中斷指令 以免出錯
  beforeDestroy() {
    console.log("beforeDestroy：Vue 實例即將被銷毀前被調用。");
  },
  //已經不會有雙向綁定的效果
  destroyed() {
    console.log("destroyed：Vue實體已經被完全銷毀。");
  },
  //可以放置其他函式的地方
  methods: {
    updateNick() {
      this.nickName = this.inputText;
    },
    changePass() {
      this.password = this.changePassword;
    },
  },
};
</script>
