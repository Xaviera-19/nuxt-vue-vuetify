<!-- components/scopedSlot.vue -->
<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">
        <slot :item="item"></slot> <!-- 作用域插槽 -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  //設定item是陣列
  props: {
    items: {
      type: Array,
      required: true //父祖件在使用這個的時候必須給item值
    }
  }
};
</script>

