<!--
 * @Author: Yutan Wu
 * @Date: 2022-12-18 14:37:25
 * @LastEditTime: 2022-12-18 14:37:25
 * @LastEditors: Yutan Wu
 * @Description: This is the detail that in the 'View' button of the Group.vue
 * @FilePath: \vue3-element-admin\src\view\detail.vue
-->
<template>
    <el-dialog :model-value="true" title="View" @close="handleClose">
        <p>
            <label for="ProjectName">Project Name: </label>
            <span id="ProjectName"> {{ projectInfo.ProjectName }} </span>
        </p>
        <p>
            <label for="ProjectTag">Project Tag: </label>
            <span id="ProjectTag"> {{ projectInfo.ProjectTag }} </span>
        </p>
        <p>
            <label for="ProjectDiscription">Project Discription: </label>
            <span id="ProjectDiscription"> {{ projectInfo.ProjectDiscription }} </span>
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

            projectInfo: computed(() => props.rowInfo).value,
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