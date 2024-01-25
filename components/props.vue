<!-- components/props.vue -->
<template>
  <div>
    <slot>
      <v-btn>{{ msg }}</v-btn>
    </slot>
  </div>
</template>

<script>
export default {
  props: ['msg'],
}
</script>