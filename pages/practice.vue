<style>
section {
  margin-bottom: 25px;
}
hr {
  margin-bottom: 8px;
}
.v-model {
  margin-bottom: 10px;
}
#v-model input,
.watchDeep input {
  background-color: aliceblue;
  color: black;
  width: 180px;
}
#v-model .result {
  display: inline-block;
  width: 260px;
  background-color: bisque;
  color: black;
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
.popup {
  background: white;
  color: black;
  border: 1px solid darkkhaki;
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.isDisplay {
  display: none;
}
</style>
<template>
  <div>
    <!-- v-model -->
    <section id="v-model">
      <h2>v-model與他的修飾子</h2>
      <hr />
      <!-- 正常綁定 -->
      <div class="v-model">
        <input v-model="modelOne" type="text" />
        <span class="result">結果■{{ modelOne }}</span>
      </div>
      <!-- trim -->
      <div class="v-model">
        <input v-model.trim="modelTwo" type="text" />
        <span class="result">trim■{{ modelTwo }}</span>
      </div>
      <!-- number -->
      <div class="v-model">
        <input v-model.number="modelThr" type="number" />
        <span class="result">number■{{ modelThr }}</span>
      </div>
      <!-- lazy -->
      <div class="v-model">
        <input v-model.lazy="modelFour" type="text" />
        <span class="result">lazy■{{ modelFour }}</span>
        <span v-once class="result">v-once■{{ modelFour }}</span>
      </div>
      <input v-model="theSame" type="text" />

      <span v-text="theSame" class="result"></span>
      <span v-html="theSame" class="result"></span>
    </section>
    <!-- v-on -->
    <section id="v-on">
      <h2>v-on與他的修飾子</h2>
      <hr />
      <v-btn @click="togglePopup">公告 .stop</v-btn>
      <div @click="togglePopup" :class="{ isDisplay }" class="overlay">
        <div class="popup">
          這是按了也會關閉的公告
          <p>{{ clickContent }}</p>
        </div>
        <div @click.stop class="popup">
          <v-icon @click="togglePopup" color="black">mdi-toggle</v-icon>
          這是按了不會關閉的公告
          <p>{{ clickContent }}</p>
        </div>
      </div>
      <form @submit="submitForm">
        <v-btn type="submit">表單沒阻止的送出</v-btn>
      </form>
      <form @submit.prevent="submitForm">
        <v-btn type="submit">表單有阻止的送出</v-btn>
      </form>
      <hr />
      <p>.stop+.capture 就可以用在打開郵件/公告</p>
      <ul @click.capture="handleItemClick" v-for="item in content">
        <li>{{ item }}</li>
      </ul>
      <v-btn @click.once="alertOne">只能按一次 嗚嗚</v-btn>
    </section>
    <h2>{{ msg }}</h2>
    <div class="watchDeep">
      <p>動物名-watch deep</p>
      <input v-model="animalData.animalName" type="text" />
      <v-btn @click="changeAnimalName">改名用</v-btn>
      <p>居住地 / 晶片</p>
      <input v-model="animalData.address.city" type="text" />
      <input v-model="animalData.address.id" type="text" />
    </div>
  </div>
</template>

<script>
import { myMixin } from "~/plugins/myMixin";

export default {
  mixins: [myMixin],
  data() {
    return {
      // model
      modelOne: "差在哪",
      modelTwo: "",
      modelThr: "",
      modelFour: "可撥的我被綁架在畫面上",
      theSame: "<h2>一樣的內容容</h2>",
      // on
      isDisplay: true,
      content: ["公告1111", "公告2222", "公告3333"],
      clickContent: "",
      // 若跟MIXIN撞名會吃到誰的效果呢qq
      msg: "這是/practice的msg",
      // 玩deep
      animalData: {
        animalName: "賴阿跳",
        address: {
          city: "台中",
          id: "73001-00000-00000",
        },
      },
    };
  },
  methods: {
    togglePopup() {
      this.isDisplay = !this.isDisplay;
      console.log("關公告");
    },
    submitForm() {
      // 在這裡處理表單提交的咚咚
      console.log("送表單");
    },
    handleItemClick(event) {
      this.clickContent = "";
      // 在捕獲階段處理事件
      console.log(event.target.innerText);
      this.clickContent = event.target.innerText;
      this.isDisplay = !this.isDisplay;
    },
    alertOne() {
      console.log("只會觸發一次 @click.once");
    },
    changeAnimalName(){
      this.animalData.animalName = '小屁貓'
    },
  },
  watch: {
    modelFour(newWord, oldWord) {
      console.log(`modelFour 變化，新值：${newWord}，舊值：${oldWord}`);
      // 可以寫變更密碼/MAIL的地方 寫判斷是否更新成功然後給使用者回饋
      window.alert(`${oldWord}將更新為${newWord}`);
    },
    // watch deep
    animalData: {
      handler(newValue, oldValue) {
        console.log("深層watch 舊", oldValue);
        console.log("深層watch 新", newValue);
      },
      deep: true, // 看陣列或物件 有變化會整個陣列或物件傳出來
      immediate: true,  //原本要值變了才會執行 下這個會變成初始化完先執行一次
    },
    'animalData.animalName': function(newValue, oldValue) {
      this.msg = newValue;
      console.log("普通watch 舊", oldValue);
      console.log("普通watch 新", newValue);
    },
  },
};
</script>
