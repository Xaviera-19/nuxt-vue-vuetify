<!-- components/emit.vue -->
<template>
  <div>
    <v-btn @click="sendMsg">EMIT送給霸霸</v-btn>

  </div>
</template>

<script>
export default{
  data(){
    return{
      data: ['123','456','789'],
    }
  },
  methods: {
    sendMsg(){
      //          '呼喚名稱',實際資料
      this.$emit('emitFun',this.data);
    },
    refMsg(){
      console.log('從子組鍵傳給父祖件');
    },
  }
}
</script>