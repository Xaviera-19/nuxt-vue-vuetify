<template>
  <div>
    <slot name="propsOne">
      <v-btn>{{ msg }}</v-btn>
    </slot>
    <slot name="propsTwo">QQQQ</slot>
  </div>
</template>

<script>
export default {
  props: ['msg'],
}
</script>