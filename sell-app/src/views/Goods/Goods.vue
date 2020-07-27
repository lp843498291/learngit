<template>
  <div class="goods">
    <!-- 左侧导航 -->
    <div class="left-nav"
      ref="leftNav">
      <ul class="content">
        <li @click="changeNav(item.name)"
          :class="{active: curActive === item.name}"
          class="nav-item"
          v-for="item in goods"
          :key="item.name">{{ item.name }}</li>
      </ul>
    </div>

    <!-- 右侧食品列表 -->
    <div class="right-box"
      ref="rightBox">
      <div class="content">
        <!-- 循环出分类 -->
        <div :id="item.name"
          class="cate-item"
          v-for="item in goods"
          :key="item.name">
          <!-- 分类名称 -->
          <h1 class="title">{{ item.name }}</h1>
          <ul class="food-list">
            <!-- 循环出每个分类下面的食品列表 -->
            <li @click="showDetail(food)"
              class="food"
              v-for="food in item.foods"
              :key="food.name">
              <img :src="food.imgUrl"
                class="img"
                width="80"
                height="80"
                alt="">
              <div class="info">
                <p class="name">{{food.name}}</p>
                <p class="desc">{{ food.goodsDesc }}</p>
                <p class="count">月售{{food.sellCount}}份 好评率{{food.rating}}%</p>
                <p class="price">￥${{ food.price }}</p>
              </div>

              <!-- 控制按钮 -->
              <div class="control-box">
                <!-- + - 组件 -->
                <button v-if="food.count > 0"
                  class="btn1"
                  @click.stop="changeCount(food.name, -1)">-</button>
                <span v-if="food.count > 0">{{ food.count }}</span>
                <button @click.stop="changeCount(food.name, 1)"
                  class="btn2">+</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 食品详情组件 -->
    <transition name="detail">
      <FoodDetail :food="food"
        @close="hideDetail"
        v-show="
      detailVisible
      " />
    </transition>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import FoodDetail from "./FoodDetail.vue";

import Vue from "vue";
import { Stepper } from "vant";
Vue.use(Stepper);

export default {
  // props: ["goods"],
  components: {
    FoodDetail
  },
  data() {
    return {
      curActive: "❤️龙胖娃有话说",
      hArr: [], // 存放高度的数组
      detailVisible: false, // 详情是否显示
      food: {} // 当前食品数据
    };
  },
  mounted() {
    // 初始化BScroll  (左侧导航)
    this.leftNavScroll = new BScroll(this.$refs.leftNav, {
      click: true // 允许点击
    });

    // 右侧滑动
    this.rightFoodScroll = new BScroll(this.$refs.rightBox, {
      probeType: 3, // 派发滚动事件
      click: true
    });

    // 监听滚动事件
    this.rightFoodScroll.on("scroll", pos => {
      let y = Math.abs(pos.y); // 获取垂直方向的y的值

      // 判断y落在哪个区间
      for (let i = 0; i < this.hArr.length; i++) {
        if (y >= this.hArr[i].min && y < this.hArr[i].max) {
          this.curActive = this.hArr[i].name; // 这个区间的分类名赋值给当前激活类
        }
      }
    });
  },
  updated() {
    // 循环数组
    let total = 0; // 初始值是0

    for (let item of this.goods) {
      let cateHeight = document.getElementById(item.name).offsetHeight; // 获取每个分类的高度

      // 计算每个区间
      this.hArr.push({
        min: total,
        max: total + cateHeight,
        name: item.name
      });

      total = total + cateHeight; // 把上一次的结束 当成下一次的开始
    }
  },
  methods: {
    // 切换导航
    changeNav(name) {
      this.curActive = name; // 切换激活

      // 右侧 滚动到对应的位置
      this.rightFoodScroll.scrollToElement(document.getElementById(name), 300);
    },

    showDetail(food) {
      // console.log(food);
      this.detailVisible = true; // 显示详情
      this.food = food; // 赋值
    },
    // 隐藏详情
    hideDetail() {
      this.detailVisible = false;
    },

    // 改变商品的数据量
    changeCount(name, num) {
      // 调用仓库中的函数 改变商品的数量( 让仓库中的数据改变 )
      this.$store.commit("CHANGE_NUM", { name, num });
    }
  },
  computed: {
    // 直接从仓库中获取商品的数据
    goods() {
      return this.$store.state.goods;
    }
  }
};
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  height: 100%;
  .left-nav {
    flex: 0 0 80px;
    background: #f8f8f8;
    // 超出滚动
    // overflow: scroll;
    overflow: hidden;

    .nav-item {
      height: 50px;
      line-height: 1.2;

      font-size: 13px;
      padding: 10px 5px 5px 10px;
      border-bottom: 1px solid #fff;

      &.active {
        background-color: skyblue;
        // color: #fff;
      }
    }
  }

  .right-box {
    flex: 1;
    padding-left: 10px;
    box-sizing: border-box;

    // 超出滚动
    // overflow: scroll;
    overflow: hidden;

    .title {
      font-size: 16px;
      font-weight: 700;
      height: 30px;
      line-height: 30px;
      background-color: tomato;
    }

    .food-list {
      .food {
        display: flex;
        margin-top: 20px;
        position: relative;
        .img {
          border-radius: 4px;
          margin-right: 10px;
        }
        .info {
          width: 160px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .name {
            width: 150px;
            font-size: 14px;
            font-weight: 700;
            margin-bottom: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .desc {
            font-size: 12px;
            color: #999;
            margin: 5px 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .count {
            font-size: 12px;
            color: #999;
            margin: 5px 0;
          }
          .price {
            color: red;
          }
        }
      }
      .control-box {
        position: absolute;
        right: 5px;
        bottom: 5px;
        .btn1 {
          background: #fff;
          margin-right: 8px;
          height: 22px;
          color: rgb(35, 149, 255);
          border-radius: 50%;
          border: 1px solid rgb(35, 149, 255);
        }
        .btn2 {
          background: rgb(35, 149, 255);
          width: 22px;
          height: 22px;
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

  // 进入动画 和 离开动画的过程中 有什么效果
  .detail-enter-active,
  .detail-leave-active {
    transition: all 0.3s; // 有过渡效果 过度的是透明度
  }

  // 动态的开始状态{瞬间} 和 结束状态{瞬间}
  .detail-enter,
  .detail-leave-to {
    transform: translateY(100%);
  }
}
</style>