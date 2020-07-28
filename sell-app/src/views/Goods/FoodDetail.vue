<template>
  <div class="food-detail">
    <h1 @click="hideDetail"
      class="close">x</h1>
    <!-- {{ food }} -->
    <img width="100%"
      :src="food.imgUrl"
      alt="">
    <div class="content">
      <p class="name"> {{food.name}}</p>
      <p class="count">月售{{food.sellCount}}份 好评率{{food.rating}}%</p>
      <p class="price">￥${{ food.price }}</p>
      <p class="desc">{{ food.goodsDesc }}</p>
      <p class="desc">价格说明？</p>

      <!-- 控制按钮 -->
      <div class="control-box">
        <!-- + - 组件 -->
        <button v-if="food.count > 0"
          class="btn1"
          @click.stop="food.count--">-</button>
        <span v-if="food.count > 0">{{ food.count }}</span>
        <button @click.stop="food.count++"
          class="btn2">+</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ["food"],
  methods: {
    // 隐藏详情
    hideDetail() {
      this.$emit("close"); // 告诉父亲 关闭详情页面
    }
  }
};
</script>

<style lang="less" scoped>
.food-detail {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  height: 100%;
  width: 100%;

  .close {
    font-size: 30px;
    position: absolute;
    top: 0;
    right: 0;
    height: 5%;
    width: 8%;
    text-align: center;
    line-height: 24px;
    color: #fff;
    background: rgba(10, 0, 0, 0.4);
    border-radius: 50%;
    // border: 1px solid #000;
  }
  .content {
    position: relative;
    width: 100%;
    margin-top: 20px;
    margin-left: 10px;
    line-height: 30px;
    .name {
      font-size: 20px;
      font-weight: bolder;
    }
    .count,
    .desc {
      font-size: 0.293333rem;
      color: #666;
      line-height: 30px;
    }
    .price {
      color: red;
    }
    .control-box {
      position: absolute;
      right: 22px;
      bottom: 60px;
      .btn1 {
        background: #fff;
        margin-right: 8px;
        height: 22px;
        line-height: 17px;
        color: rgb(35, 149, 255);
        border-radius: 50%;
        border: 1px solid rgb(35, 149, 255);
      }
      .btn2 {
        background: rgb(35, 149, 255);
        width: 22px;
        height: 22px;
        line-height: 17px;
        color: #fff;
        margin-left: 8px;
        padding-bottom: 6px;
        padding-right: 18px;
        border-radius: 50%;
        border: none;
      }
    }
  }
}
</style>