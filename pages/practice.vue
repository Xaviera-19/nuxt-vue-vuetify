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
      
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modelOne: "",
      modelTwo: "",
      modelThr: "",
      modelFour: "",
    };
  },
};
</script>
