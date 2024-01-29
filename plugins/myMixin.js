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
    console.log('beforeCreate mixin');
  },
  mounted() {
    console.log('mounted mixin');
  },
  beforeDestroy() {

  },
};
