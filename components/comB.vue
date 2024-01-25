<!-- components/comB.vue -->
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    };
  },
  mounted() {
    // 訂閱事件
    this.$eventBus.$on('custom-event', this.handleCustomEvent);
  },
  methods: {
    handleCustomEvent(message) {
      this.message = message;
    },
  },
}
</script>
