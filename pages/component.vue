<style>
hr {
  margin: 15px 0 5px;
}
</style>
<template>
  <div>
    <slotTest>
      <template v-slot:slotOne>
        <v-btn>這是具名插槽</v-btn>
      </template>
    </slotTest>

    <hr />
    <p>不具名插槽 props傳 父傳子</p>
    <propsTest :msg="propText"></propsTest>
    <propsTest :msg="propText2"></propsTest>

    <hr />
    <p>不具名插槽 emit傳 子傳父</p>
    <emitTest ref="myRef" @emitFun="handleEmit"></emitTest>
    <v-btn @click="refClick">refBtn</v-btn>
    <hr />
    <p>作用域</p>
    <scopedSlot :items="fakeData">
      <template v-slot="{ item }">
        <span>{{ item.name }}</span>
      </template>
    </scopedSlot>

    <hr />
    <comA></comA>
    <comB></comB>

    <hr />
    <p>{{ $store.state.numCount }}</p>
    <v-btn @click="changeNum">這是STORE數字++</v-btn>

    <hr />
    <v-btn @click="goToHome">點擊回WELCOME</v-btn>

    <hr />
    <button @keydown.enter="enterKey">按鍵按下.僅限ENTER</button>
  </div>
</template>
<script>
import slotTest from "~/components/slotTest.vue";
import scopedSlot from "~/components/scopedSlot.vue";
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
    scopedSlot,
  },
  data() {
    return {
      // PROP的眉目傳情
      propText: "第一個PROP傳",
      propText2: "第二個PROP傳",
      num: 1,
      fakeData: [
        { id: 1, name: 'John作用域' },
        { id: 2, name: 'Jane作用域' },
        { id: 3, name: 'Doe作用域' }
      ]
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
    refClick() {
      this.$refs.myRef.refMsg();
    },
    //store內的mutation
    changeNum() {
      this.$store.commit("changeNum");
    },
    // 編程式路由
    goToHome() {
      this.$router.push("/");
      // this.$router.push({ path: "/", query: { plan: "private" } });
      // this.$router.push({  path: '/practice', hash: '#team'  });
    },
    enterKey() {
      console.log("enter按下去了!");
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
    // this.$refs.myRef.refMsg();
  },
};
</script>
