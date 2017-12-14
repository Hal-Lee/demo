//url相关
var BASE_URL = "http://gank.io/api";
var GET_MEIZHI_URL = BASE_URL.concat("/data/%E7%A6%8F%E5%88%A9/10/");
var GET_URL = BASE_URL.concat("/history/content/100/1");

//error相关
var ERROR_DATA_IS_NULL = "获取数据为空，请重试";

//各个page的URL
var PAGE_MAIN = "/pages/main/main";
var PAGE_SPECIFIC = "/pages/specific/specific";

// 将方法、变量暴露出去
module.exports = {
    BASE_URL: BASE_URL,
    GET_MEIZHI_URL: GET_MEIZHI_URL,
    GET_URL: GET_URL,
    ERROR_DATA_IS_NULL: ERROR_DATA_IS_NULL,
    PAGE_MAIN: PAGE_MAIN,
    PAGE_SPECIFIC: PAGE_SPECIFIC
}