<!--
 * @Author: Kunlin Yu
 * @Date: 2022-12-23 21:44
 * @LastEditTime: 2022-12-23 23:24
 * @LastEditors: Kunlin Yu
 * @Description: This is the category detail that in the 'View' button of the Translation.vue
 * @FilePath: \vue3-element-admin\src\view\fileDetail.vue
-->
<template>
  <el-dialog :model-value="true" title="View" @close="handleClose">
    <p>
      <label for="FileName">Category Name: </label>
      <span id="FileName"> {{ fileInfo.fileName }} </span>
    </p>

    <p>
      <label for="fileDiscription">Category Discription: </label>
      <span id="fileDiscription"> {{ fileInfo.fileDiscription }} </span>
    </p>
  </el-dialog>
</template>

<script>
import {
  computed, toRefs
} from "vue";
export default {

  props: {

    rowInfo: {

      type: Object,
      default() {

        return {
        };
      },
    },
  },
  emit: ["closeDetail"],
  setup(props, {
    emit }) {

    const data = {

      fileInfo: computed(() => props.rowInfo).value,
    };
    const method = {

      handleClose() {

        emit("closeDetail");
      },
    };
    return {
      ...toRefs(data), ...method
    };
  },
};
</script>

<style>

</style>