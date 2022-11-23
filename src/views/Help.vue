<!--
 * @Author: Yutan Wu
 * @Date: 2022-11-23 12:38:25
 * @LastEditTime: 2022-11-23 12:38:25
 * @LastEditors: Yutan Wu
 * @Description: Test the help page
 * @FilePath: \vue3-element-admin\src\view\Help.vue
-->
<template>
    <el-steps :active="active" align-center finish-status="success">
    <el-step title="Step 1" description="Some description" />
    <el-step title="Step 2" description="Some description" />
    <el-step title="Step 3" description="Some description" />
    <el-step title="Step 4" description="Some description" />
    </el-steps>
  
    <el-button style="margin-top: 5%" @click="next">Next step</el-button>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const active = ref(0)
  
  const next = () => {
    if (active.value++ > 3) active.value = 0
  }
  </script>