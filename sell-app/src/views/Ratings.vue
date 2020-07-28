<template>
  <div class="ratings">
    <div class="comment-title">
      <div class="comment-title-left">
        <span>{{score}}</span>
        <span>综合评分</span>
        <span>高于周边商家69.2%</span>
      </div>
      <div class="comment-title-right">
        <div>
          <span class="text">服务态度</span>
          <van-rate v-model="score"
            allow-half
            void-icon="star"
            void-color="#eee" />
        </div>
        <div>
          <span class="text">服务态度</span>
          <van-rate v-model="score"
            allow-half
            void-icon="star"
            void-color="#eee" />
        </div>
        <div>
          <span class="text">送达时间</span>
          <span style="color: silver">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>

    <div class="pl">
      <div class="nav">
        <span class="sp1"
          @click="type='all'">全部 {{ allLen }}</span>
        <span class="sp1"
          @click="type='ok'">满意 {{ okLen }}</span>
        <span class="sp1"
          @click="type='noOk'">不满意 {{ noOkLen }}</span>
      </div>
      <div class="xuanzhe">
        <i class="el-icon-circle-check"></i>
        <span>只看有内容的评价</span>
      </div>
      <div v-for="(item,i) in ratingsData"
        :key="i"
        class="contion">
        <div class="img-name">
          <span class="img">
            <img :src="item.avatar"
              alt
              class="img" />
          </span>
          <div class="top">
            <span class="sp1">{{item.username}}</span>
            <van-rate size="10"
              v-model="item.score" />
          </div>
        </div>
        <p class="p1">{{item.text}}</p>
        <span v-for="a in item.recommend"
          :key="a"
          class="dianguo">{{a}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getRatings } from "@/api/sell";
export default {
  props: ["seller"],
  data() {
    return {
      score: 5,
      ratings: [], // 评价数据
      type: "all" // 默认是2
    };
  },
  async created() {
    let { data } = await getRatings();
    this.ratings = data;
  },
  computed: {
    // 全部
    allLen() {
      return this.ratings.length;
    },
    // 满意
    okLen() {
      return this.ratings.filter(v => v.rateType === 0).length;
    },
    // 不满意
    noOkLen() {
      return this.ratings.filter(v => v.rateType === 1).length;
    },

    // 要循环的评价数据
    ratingsData() {
      if (this.type === "all") {
        return this.ratings;
      } else if (this.type === "ok") {
        return this.ratings.filter(v => v.rateType === 0);
      } else if (this.type === "noOk") {
        return this.ratings.filter(v => v.rateType === 1);
      }
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.ratings {
  z-index: 1;
  .comment-title {
    border-bottom: 1px silver solid;
    height: 130px;
    background-color: white;
    display: flex;
    padding: 15px;
    justify-content: center;
    align-items: center;
    .comment-title-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-right: 15px;
      border-right: 1px silver dashed;
      span {
        margin-bottom: 18px;
        &:nth-of-type(1) {
          font-size: 20px;
          color: orange;
        }
        &:nth-of-type(2) {
          font-size: 18px;
        }
        &:nth-of-type(3) {
          font-size: 14px;
          color: silver;
        }
      }
    }
    .comment-title-right {
      flex: 1;
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-around;
      div {
        display: flex;
        align-items: center;
        // span {
        //   margin-right: 20px;
        // }
        .text {
          margin-right: 10px;
        }
      }
    }
  }

  .pl {
    .nav {
      height: 50px;
      padding: 10px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;

      .sp1 {
        font-size: 14px;
        display: inline-block;
        width: 80px;
        height: 30px;
        color: #6d7885;
        background-color: #ebf5ff;
        line-height: 30px;
        text-align: center;
        margin-right: 10px;
        &.active {
          background-color: skyblue;
        }
      }
    }
    .xuanzhe {
      padding: 10px 15px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      color: #666;
      i {
        color: #76d572;
      }
    }
    .contion {
      padding: 20px 10px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;

      .img-name {
        display: flex;
        .img {
          display: inline-block;
          width: 30px;
          border-radius: 50%;
        }
        .top {
          display: inline-block;
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          .sp1 {
            margin-bottom: 5px;
          }
        }
      }
      .p1 {
        font-size: 12px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .dianguo {
        margin-right: 10px;
        font-size: 12px;
        border: 1px solid #ccc;
        color: #000;
        padding: 3px;
      }
    }
  }
}
</style>