<!-- components/comA.vue -->
<template>
  <div>
    <v-btn @click="publishEvent">eventBus</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    publishEvent() {
      this.$eventBus.$emit('custom-event', '這是comA的東西 但在comB顯示!');
    }
  },
}
</script>