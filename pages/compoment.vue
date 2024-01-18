<template>
  <div>
    <slotTest></slotTest>
    <propsTest :msg="propText"></propsTest>
    <emitTest ref="myRef" @emitFun="handleEmit"></emitTest>
    <propsTest :msg="propText2"></propsTest>

  </div>
</template>
<script>
import slotTest from "~/components/slotTest.vue";
import propsTest from "~/components/props.vue";
import emitTest from "~/components/emit.vue";
export default {
  components: {
    slotTest,
    propsTest,
    emitTest,
  },
  data() {
    return {
      // 眉目傳情
      propText: "prop傳傳傳傳",
      propText2: "prop = =",
    };
  },
  methods: {
    handleEmit(data) {
      console.log('收到emit的資料:', data);
      // 在這裡你可以處理接收到的資料
    },
  },
  mounted(){
    this.$refs.myRef.refMsg();
  }
};
</script>
