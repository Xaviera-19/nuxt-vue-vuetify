<template>
  <div>
    <slotTest>
      <template v-slot:slotOne>
        <v-btn>Custom Button</v-btn>
      </template>
    </slotTest>
    <propsTest :msg="propText"></propsTest>
    <emitTest ref="myRef" @emitFun="handleEmit"></emitTest>
    <propsTest :msg="propText2"></propsTest>
    <v-btn @click="changeNum">touch</v-btn>
    <comA></comA>
    <comB></comB>
    <!-- <p>{{ num }}</p>
    <p>{{add}}</p> -->
  </div>
</template>
<script>
import slotTest from "~/components/slotTest.vue";
import propsTest from "~/components/props.vue";
import emitTest from "~/components/emit.vue";
import comA from "~/components/comA.vue";
import comB from "~/components/comB.vue";
export default {
  components: {
    slotTest,
    propsTest,
    emitTest,
    comA,
    comB,
  },
  data() {
    return {
      // 眉目傳情
      propText: "prop傳傳傳傳",
      propText2: "prop = =",
      num: 1,
    };
  },
  methods: {
    handleEmit(data) {
      console.log("收到emit的資料:", data);
      // 在這裡你可以處理接收到的資料
    },
    changeNum() {
      this.num = 0;
    },
  },
  computed: {
    add() {
      console.log(this.num, "我有被觸發了！");
      return this.num;
    },
  },
  watch: {
    num(newnum, oldnum) {
      console.log(newnum, oldnum);
    },
  },
  mounted() {
    this.$refs.myRef.refMsg();
  },
};
</script>
