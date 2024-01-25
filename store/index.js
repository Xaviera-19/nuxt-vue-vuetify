// store/index.js
export const state = () => ({
  numCount: 0,
  data: null, // 新增 data 狀態
  animalDetail: null,// 要塞單筆的動物資料
});

export const mutations = { //必须是同步函数
  // 定義修改狀態的方法
  changeNum(state) {
    state.numCount++;
  },
  setData(state, data) {
    state.data = data;
  },
  setItemDetail(state, item) {
    state.animalDetail = item;
  },
};

export const actions = {
  //Action 提交的是 mutation，而不是直接变更状态。
  //Action 可以包含任意异步操作。
  async userData({commit}){
    try{
      const response = await fetch('https://randomuser.me/api/?results=1');
      const data = await response.json();
      // ('m的方炫',要丟給他處理的東西)
      commit('setData', data);//commit ->用來觸發mutations來修改state
    }catch(error){
      console.error('Error fetching data:', error);
    }
  }
}
