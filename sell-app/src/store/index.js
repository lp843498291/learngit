import Vue from 'vue'
import Vuex from 'vuex'// 引入vuex

Vue.use(Vuex)// 使用vuex

export default new Vuex.Store({
  state: {
    // 商品数据 ( 商品组件 和 购物车列表组件 共享这一份数据 )
    goods: [],
  },
  mutations: {

    // 把商品数据放入仓库的函数
    SET_GOODS(state, data) {
      state.goods = data;
    },

    // 改变商品的数量
    CHANGE_NUM(state, obj) {
      // 两层循环 找到当前商品的名字 count+1 或者 -1
      for (let item of state.goods) {
        for (let food of item.foods) {
          if (food.name === obj.name) {
            food.count += obj.num;
          }
        }
      }
    },

    // 清空仓库数据 (所有数量都变为0)
    EMPTY(state) {
      for (let item of state.goods) {
        for (let food of item.foods) {
          food.count = 0;
        }
      }
    },

  },

  // 核心3: 仓库中的计算属性
  getters: {
    // 找到仓库中count > 0的所有食品数据
    shopListData(state) {
      let arr = []; // 定一个空数组
      for (let item of state.goods) {
        for (let food of item.foods) {
          if (food.count > 0) {
            // 双层循环 找到每一个食品 如果它的count大于0 就加入数组
            arr.push(food);
            // break;
          }
        }
      }

      // 根据名字数组对象去重
      let newArr = [];
      let obj = {};
      for (let item of arr) {
        if (!obj[item.name]) {
          obj[item.name] = "xxx";
          newArr.push(item);
        }
      }
      return newArr; // 返回结果
    },
  },

  actions: {
  },
  modules: {
  }
})
