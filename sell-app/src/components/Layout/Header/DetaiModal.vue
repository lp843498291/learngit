<template>
  <div class="detail-modal">
    <div class="detail-container">
      <!-- 店铺名 -->
      <h1 class="seller-name">{{seller.name}}</h1>
      <!-- 星星 -->
      <van-rate allow-half
        v-model="value" />

      <!-- 优惠信息 -->
      <div class="youhui">
        <p class="youhui-top">
          <span class="line"></span>
          <span class="text">优惠信息</span>
          <span class="line"></span>
        </p>
        <p v-if="seller.supports"><img width="20"
            height="20"
            src="../../../assets/imgs/special.png"
            alt="">{{ seller.supports[0] }}
          <br>
          <img width="20"
            height="20"
            src="../../../assets/imgs/discount.png"
            alt=""> {{ seller.supports[1] }}
          <br>
          <img width="20"
            height="20"
            src="../../../assets/imgs/decrease.png"
            alt=""> {{ seller.supports[2] }}
        </p>
      </div>

      <!-- 店家公告 -->
      <div class="youhui">
        <p class="youhui-top">
          <span class="line"></span>
          <span class="text">店家公告</span>
          <span class="line"></span>
        </p>
        <p>{{seller.bulletin}}</p>

      </div>

    </div>
    <div class="close">
      <span @click="hideModal">x</span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Rate } from "vant";

Vue.use(Rate);

export default {
  props: ["seller"],

  data() {
    return {
      value: 4
    };
  },

  methods: {
    // 隐藏模态框
    hideModal() {
      // 告诉父亲 关闭模态框 子=>父
      this.$emit("close");
    }
  }
};
</script>

<style lang="less" scoped>
.detail-modal {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);

  box-sizing: border-box;
  .detail-container {
    z-index: 999;
    text-align: center;
    padding: 20px 38px;
    color: #fff;
    .seller-name {
      font-size: 22px;
      margin-top: 30px;
      margin-bottom: 20px;
    }
    .youhui {
      text-align: left;

      .youhui-top {
        text-align: center;
        .line {
          display: inline-block;
          width: 107px;
          border-top: 1px solid #ccc;
        }
        .text {
          vertical-align: -4px;
          margin: 0px 10px;
        }
      }
      p {
        margin-top: 20px;
        line-height: 42px;
      }
    }
  }
  .close {
    position: absolute;
    bottom: 10px;
    color: #fff;
    font-size: 30px;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    margin-left: 0px;
  }
}
</style>