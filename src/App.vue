<!--
 * @Author: Kunlin Yu
 * @Date: 2022-11-23 12:38:25
 * @LastEditTime: 2022-11-23 12:38:25
 * @LastEditors: Yutan Wu
 * @Description: Test the app main entrance
 * @FilePath: \vue3-element-admin\src\App.vue
-->
<template>
  <div id="nav">
    <!-- use element-plus to decorate top nav bar -->

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#77b5fe"
      text-color="#fff" active-text-color="#203773" @select="handleSelect" router="true">
      <!-- to the right side of flex grow -->
      <div class="flex-grow" />
      <el-menu-item index="/test">Translation</el-menu-item>
      <el-menu-item index="/">Log In/Sign In</el-menu-item>
      <el-menu-item index="/group">Group</el-menu-item>
      <el-menu-item index="/about_us">About Us</el-menu-item>
      <el-menu-item index="/help">Help</el-menu-item>
    </el-menu>
  </div>
  <div id="nav-placeholder"></div>
  <router-view />
</template>

<script setup>//UI decoration setups
import { ref } from 'vue'
const activeIndex = ref('2')//default initial location is sign in/log in
function handleSelect(key) {
  this.$router.push({
    path: key,
    params: { data: 'query' }
  })
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.flex-grow {
  flex-grow: 1;
}

#nav {
  position: fixed;
  width: 100%;
}

#nav-placeholder {
  height: 5em;
}
</style>