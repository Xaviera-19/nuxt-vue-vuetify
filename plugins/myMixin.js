// myMixin.js
export const myMixin = {
  data() {
    return {
      mixinMsg: '這是Mixin的msg',
      msg: "這是Mixin的msg",
    };
  },
  computed: {

  },
  methods: {

  },
  beforeCreate() {
    console.log('beforeCreate 生命週期可以共用');
  },
  mounted() {
    console.log('mounted mixin112233');
  },
  beforeDestroy() {

  },
};
