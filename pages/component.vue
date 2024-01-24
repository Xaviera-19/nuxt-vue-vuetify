<template>
  <div>
    <slotTest>
      <template v-slot:slotOne>
        <v-btn>Custom Button</v-btn>
      </template>
    </slotTest>
    <propsTest :msg="propText"></propsTest>
    <emitTest ref="myRef" @emitFun="handleEmit"></emitTest>
    <v-btn @click="onClick">ref</v-btn>
    <propsTest :msg="propText2"></propsTest>
    <v-btn @click="changeNum">touch</v-btn>
    <comA></comA>
    <comB></comB>
    <p>{{ $store.state.numCount }}</p>
    <v-btn @click="changeNum">這是STORE</v-btn>
    <v-btn @click="goToHome">點擊回WELCOME</v-btn>
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
    onClick() {
      this.$refs.myRef.refMsg();
    },
    //store內的mutation
    changeNum() {
      this.$store.commit("changeNum");
    },
    // 編程式
    goToHome() {
      // this.$router.push("/");
      this.$router.push({ path: '/', query: { plan: 'private' } });
      // this.$router.push({  path: '/practice', hash: '#team'  });
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
