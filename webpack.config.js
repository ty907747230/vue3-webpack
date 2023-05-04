/*
 * @Author: asherytang asherytang@tencent.com
 * @Date: 2023-04-18 15:32:37
 * @LastEditors: asherytang asherytang@tencent.com
 * @LastEditTime: 2023-04-19 20:02:22
 * @FilePath: /vue3-webpack/webpack.config.js.1
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const {merge} = require("webpack-merge");
const base = require("./webpack.base.config.js");
const dev = require("./webpack.dev.config.js");
const prod = require("./webpack.pro.config.js");
let config = process.NODE_ENV === "production" ? prod:dev
module.exports=merge(config, base)