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
#v-model input {
  background-color: aliceblue;
  color: black;
  width: 100px;
}
#v-model .result {
  display: inline-block;
  width: 150px;
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
      </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      // model
      modelOne: "",
      modelTwo: "",
      modelThr: "",
      modelFour: "",
      // on
      isDisplay: true,
      content: ["公告1111", "公告2222", "公告3333"],
      clickContent: "",
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
      console.log(event);
      this.clickContent = event.target.innerText;
      this.isDisplay = !this.isDisplay;
    },
    alertOne() {
      console.log("只會觸發一次");
    },
  },
};
</script>
