<template>
    <ul class="nav">
        <li class="nav-item"
            v-for="item in navs"
            :key="item.payh">

            <router-link :class="{active:$route.path===item.path}"
                :to="item.path">{{item.title}}</router-link>
        </li>

    </ul>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        { title: "商品", path: "/goods" },
        { title: "评价", path: "/ratings" },
        { title: "商家", path: "/seller" }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.nav {
  flex: 0 0 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  .nav-item {
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
    a {
      text-decoration: none;
      display: inline-block;
      color: #aaa;
      height: 100%;
      width: 100%;
      &.active {
        color: #ff0000;
      }
    }
  }
}
</style>