<!--
 * @Author: Yutan Wu
 * @Date: 2022-11-23 12:38:25
 * @LastEditTime: 2022-11-23 12:38:25
 * @LastEditors: Yutan Wu
 * @Description: Test the about us information
 * @FilePath: \vue3-element-admin\src\view\AboutUs.vue
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Welcome to CS353 Hello World project!</h1>
    <el-carousel trigger="click" height="600px" :interval="4000" type="card" arrow="always">
      <el-carousel-item v-for="item in imgList" :key="item.name">
        <img :src="item.src" justify="center" style="height:100%;width:100%;" alt="pic lost" :title="item.title" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      imgList: [
        {
          name: "translation",
          src: require("@/assets/translationpage.jpg"),
          title: "translationpage.jpg"
        },
        {
          name: "messi",
          src: require("@/assets/messi.jpg"),
          title: "messi.jpg"
        },
        {
          name: "fzu",
          src: require("@/assets/fzu.jpg"),
          title: "fzu.jpg"
        },
        {
          name: "miec",
          src: require("@/assets/miec.png"),
          title: "miec.png"
        }
      ]
    };
  },
};
</script>

<style scoped>
.home {
  background-image: url("../assets/login2.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>