/**
 * 封装请求的ajax函数
 */
// 引入请求的工具函数
import req from "@/utils/request";

// 请求商品数据
export function getGoods() {
    return req.get("/goods/goods_list");
}

// 请求评价数据
export function getRatings() {
    return req.get("/shop/ratings");
}

// 请求商家数据
export function getSeller() {
    return req.get("/shop/seller");
}
