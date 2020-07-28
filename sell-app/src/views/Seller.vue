<template>
  <div class="seller">
    <div class="box1">
      <div class="seller-top">
        <div class="top">
          <h1>{{seller.name}}</h1>
          <!-- 星星 -->
          <van-rate allow-half
            v-model="value" />
          <span>(661)</span>
          <span>月售{{seller.sellCount}}单</span>
        </div>
        <div class="bottom">
          <span @click="change">❤</span>
          <p>已收藏</p>
        </div>

      </div>

      <div class="seller-top2">
        <div class="minPrice">
          <span>起送价</span>
          <p>{{seller.minPrice}}
            <span>元</span>
          </p>
        </div>
        <div class="minPrice">
          <span>商家配送</span>
          <p>{{seller.deliveryPrice}}
            <span>元</span>
          </p>
        </div>
        <div class="minPrice">
          <span>平均配送时间</span>
          <p>{{seller.deliveryTime}}
            <span>元</span>
          </p>
        </div>
      </div>
    </div>

    <div class="box2">
      <div class="seller-top3">
        <h1>公告与活动</h1>
        <p class="box2-text">{{seller.bulletin}}</p>

      </div>
      <p class="box2-seller"
        v-if="seller.supports">
        <img width="30"
          height="30"
          src="../assets/imgs/special.png"
          alt="">{{ seller.supports[0] }}
      </p>
      <p class="box2-seller"
        v-if="seller.supports">
        <img width="30"
          height="30"
          src="../assets/imgs/discount.png"
          alt="">{{ seller.supports[1] }}
      </p>
      <p class="box2-seller"
        v-if="seller.supports">
        <img width="30"
          height="30"
          src="../assets/imgs/decrease.png"
          alt="">{{ seller.supports[2] }}
      </p>

    </div>

    <div class="box3">
      <div class="seller-top4">
        <h1>商铺实景</h1>
        <div class="pic"
          ref="imgBox">
          <ul class="img-wrap"
            :style="{width: 150 * picsLen + 'px'}">
            <li v-for="imgUrl in seller.pics"
              :key="imgUrl">
              <img width="140"
                height="110"
                :src="imgUrl"
                alt />
            </li>
          </ul>

        </div>

      </div>

    </div>

    <div class="box4">
      <div class="seller-top4">
        <h1>商家信息 </h1>
        <p>该商家支持开发票，请在下单时填写好发票抬头</p>
        <p>品类：川渝火锅、麻辣烫</p>
        <p>地址：成都市金牛区星辰东一街1号10栋1-2楼4号</p>
        <p v-if="seller.date">营业时间：{{seller.date[0]|filterCtime }}&nbsp;-&nbsp;{{seller.date[1]|filterCtime}}</p>
      </div>

    </div>
  </div>
</template>

<script>
import moment from "moment";
import Vue from "vue";
import { Rate } from "vant";
import BScroll from "better-scroll";


Vue.use(Rate);
export default {
  props: ["seller"],

  data() {
    return {
      value: 4
    };
  },
  mounted() {
    // 初始化bs
    new BScroll(this.$refs.imgBox, {
      scrollX: true
    });
  },
  // 计算属性
  computed: {
    // 计算图片个数
    picsLen() {
      return this.seller.pics && this.seller.pics.length;
    }
  },
  filters: {
    filterCtime(time) {
      return moment(time).format("HH:mm:ss");
    }
  },
  methods: {
    change() {}
  }
};
</script>

<style lang="less" scoped>
.seller {
  height: 100%;
  background: #eee;

  box-sizing: border-box;
  /deep/.fenge {
    width: 100%;
    height: 20px;
    background: #ccc;
    padding: 0;
  }
  .box1 {
    padding: 15px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    .seller-top {
      display: flex;
      border-bottom: 1px solid #ccc;
      .top {
        height: 30%;

        h1 {
          font-size: 20px;
          margin-bottom: 20px;
        }
        span {
          margin-left: 10px;
        }
      }
      .bottom {
        text-align: center;
        margin-bottom: 10px;
        margin-left: 20px;
        line-height: 30px;
        span {
          color: red;
          font-size: 27px;
        }
      }
    }
    .seller-top2 {
      padding: 15px;
      background: #fff;
      margin-top: 20px;
      display: flex;
      // padding: 5px;
      justify-content: space-between;
      span {
        font-size: 15px !important;
        color: #ccc;
      }
      p {
        font-size: 28px;
      }
      .minPrice {
        text-align: center;
        border-right: 1px solid #ccc;

        width: 30%;
      }
    }
  }
  .box2 {
    padding: 15px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    margin-top: 20px;

    .seller-top3 {
      border-bottom: 1px solid #ccc;
      h1 {
        font-size: 20px;
      }
      .box2-text {
        margin-top: 10px;
        margin-bottom: 10px;
        color: red;
        line-height: 40px;
      }
    }
    .box2-seller {
      img {
        margin-right: 10px;
      }
      vertical-align: middle;
      line-height: 60px;
      border-bottom: 1px solid #ccc;
    }
  }

  .box3 {
    padding: 15px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    margin-top: 20px;
    .seller-top4 {
      h1 {
        font-size: 20px;
        margin-bottom: 20px;
      }
      .pic {
        width: 100%;
        height: 120px;
        background-color: #ccc;
        margin-top: 20px;

        // 超出滚动
        // overflow: scroll;
        overflow: hidden;
        .img-wrap {
          display: flex;
          li {
            padding: 5px;
            box-sizing: border-box;
            width: 150px;
            height: 120px;
            // background-color: green;
          }
        }
      }
    }
  }

  .box4 {
    padding: 15px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    margin-top: 20px;
    h1 {
      font-size: 20px;
      border-bottom: 1px solid #ccc;
      line-height: 40px;
    }
    p {
      margin-top: 10px;
      margin-bottom: 10px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>