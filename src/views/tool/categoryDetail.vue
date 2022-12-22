<!--
 * @Author: Yutan Wu
 * @Date: 2022-12-21 21:44
 * @LastEditTime: 2022-12-21 23:24
 * @LastEditors: Yutan Wu
 * @Description: This is the category detail that in the 'View' button of the Categories.vue
 * @FilePath: \vue3-element-admin\src\view\categoryDetail.vue
-->
<template>
    <el-dialog :model-value="true" title="View" @close="handleClose">
        <p>
            <label for="CategoryName">Category Name: </label>
            <span id="CategoryName"> {{ categoryInfo.CategoryName }} </span>
        </p>

        <p>
            <label for="CategoryDiscription">Category Discription: </label>
            <span id="CategoryDiscription"> {{ categoryInfo.CategoryDiscription }} </span>
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

            categoryInfo: computed(() => props.rowInfo).value,
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