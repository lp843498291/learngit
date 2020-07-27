<template>
  <div class="app">
    <!-- 头部 -->
    <Header :seller="seller" />
    <!-- 导航 -->
    <Nav />

    <!-- 内容 -->
    <div class="content">
      <router-view 
        :seller="seller" />
    </div>

    <!-- 购物车 -->
    <ShopCart :seller="seller" />
  </div>
</template>

<script>
// 引入组件
import Header from "./components/Layout/Header/Header.vue";
import Nav from "./components/Layout/Nav.vue";
import ShopCart from "./components/Layout/ShopCart";

// // 引入ajax函数
import { getGoods, getSeller } from "@/api/sell";

export default {
  data() {
    return {
      goods: {}, // 商品数据
      seller: {} // 商家数据
    };
  },

  // 注册组件
  components: {
    Header,
    Nav,
    ShopCart
  },
  async created() {
    let { goodsList } = await getGoods(); // 获取商品数据
    // 循环 给每个食品都添加一个字段 count 数量
    for (let item of goodsList) {
      for (let food of item.foods) {
        food.count = 0;
      }
    }

    // this.goods = goodsList; // 赋值
    // console.log(goodsList);

     // 直接把商品数据放入仓库中
    this.$store.commit("SET_GOODS", goodsList);

    let { data } = await getSeller(); // 获取商家数据
    this.seller = data;
    // console.log(data);
  }
};
</script>

<style lang="less" scoped>
.app {
  height: 100%;
  // background: red;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;

    overflow-y: scroll;
  }
}
</style>