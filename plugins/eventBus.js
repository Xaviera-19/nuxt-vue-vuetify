import Vue from 'vue';
// 創建一個新的 Vue 實例作為事件匯總
const EventBus = new Vue();

// 將事件匯總作為插件添加到 Vue 實例
Vue.prototype.$eventBus = EventBus;