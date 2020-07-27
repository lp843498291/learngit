<template>
  <div class="header">
    <!-- 上 -->
    <div class="top">
      <!-- 图片 -->
      <img class="avatar"
        width="60"
        height="60"
        :src="seller.avatar">

      <!-- 右边文字 -->
      <div class="top-right">
        <h1 class="selle-.name"><img width="30"
            height="20"
            src="../../../assets/imgs/brand.png"
            alt="">{{ seller.name }}</h1>
        <p class="seller-description ">{{ seller.description }} / {{ seller.deliveryTime }}分钟送达</p>
        <p class="seller-supports"
          v-if="seller.supports">
          <img width="15"
            height="15"
            src="../../../assets/imgs/decrease.png"
            alt=""> {{ seller.supports[2] }}</p>
      </div>
      <span @click="showModal"
        v-if="seller.supports"
        class="count">{{ seller.supports.length }}个 ></span>
    </div>

    <!-- 下 -->
    <div @click="showModal"
      class="bottom">
      <div class="text"><img width="15"
          height="10"
          src="../../../assets/imgs/bulletin.png"
          alt=""> {{ seller.bulletin }}</div>
      <div>></div>
    </div>

    <!-- 弹出蒙层组件 -->
    <transition name="detail">
      <DetaiModal @close="closeModal"
        :seller="seller"
        v-show="visible" />
    </transition>
  </div>
</template>

<script>
import DetaiModal from "./DetaiModal.vue";
export default {
  // 子组件接收到的数据 是父组件发送ajax得到的 不能直接打印 但是可以渲染
  props: ["seller"],

  components: {
    DetaiModal
  },
  data() {
    return {
      visible: false // 蒙层显示或者隐藏
    };
  },
  methods: {
    // 显示模态框
    showModal() {
      this.visible = true;
    },

    // 关闭模态框
    closeModal() {
      this.visible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  background: url("https://cube.elemecdn.com/7/72/3ffef9e786bda2569a197876cb4a0png.png?x-oss-process=image/format,webp/resize,w_750");
  flex: 0 0 120px;
  //   background: blue;
  .top {
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    line-height: 20px;
    background: rgba(0, 0, 0, 0.5);
    position: relative;

    .top-right {
      h1 {
        color: #fff;
      }
      p {
        margin-top: 5px;
        font-size: 12px;
        color: #ddd;
      }
    }
    .avatar {
      border-radius: 4px;
      margin-right: 10px;
    }
    .count {
      position: absolute;
      right: 10px;
      bottom: 5px;
      font-size: 10px;
      background: rgba(0, 0, 0, 0.5);
      padding: 2px 4px;
      border-radius: 27%;
      color: #ccc;
    }
  }
  .bottom {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.7);
    color: #eee;

    display: flex;
    .text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 10px;
      box-sizing: border-box;
    }
  }

  .detail-enter-active,
  .detail-leave-active {
    transition: opacity 0.6s;
  }
  .detail-enter,
  .detail-leave-to {
    opacity: 0;
  }
}
</style>