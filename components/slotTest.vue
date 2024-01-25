<!-- components/slotTest.vue -->
<template>
  <div>
    <slot name="slotOne"></slot>
    <slot name="qwerty">
      會默認顯示出來
    </slot>
  </div>
</template>
<script>
export default {
  name: 'slotTest',
};
</script>