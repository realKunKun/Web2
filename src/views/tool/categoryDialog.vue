<!--
 * @Author: Yutan Wu
 * @Date: 2022-12-21 21:44
 * @LastEditTime: 2022-12-21 23:24
 * @LastEditors: Yutan Wu
 * @Description: This is the catagoryDialog that in the 'Edit' button of the Categories.vue
 * @FilePath: \vue3-element-admin\src\view\catagoryDialog.vue
-->
<template>
    <el-dialog :model-value="true" :title="title" @close="handleClose">
      <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="rules"
        label-width="25%"
        class="demo-ruleForm"
        :size="formSize"
      >
        <el-form-item label="Category Name: " prop="CategoryName">
          <el-input v-model="formData.CategoryName"></el-input>
        </el-form-item>
        <el-form-item label="Category Discription: " prop="CategoryDiscription">
          <el-input type="textarea" :autosize="{minRows:8}" v-model="formData.CategoryDiscription"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">Confirm</el-button>
          <el-button @click="resetForm()">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </template>
  
  <script>
  import {
         reactive, toRefs, watch, ref, h, onMounted, computed } from "vue";
  import {createFile, createNewCategorise, createTextToFile, updateCategory} from "@/http/api";
  export default {
        
    props: {
        
      title: {
        
        type: String,
        default: "",
      },
      categoryDialogShow: {
        
        type: Boolean,
        default: false,
      },
      rowInfo: {
        
        type: Object,
        default() {
        
            return {

          };
        },
      },
      arrayNum: {
        
        type: Number,
        default: 0,
      },
    },
    setup(props, {
          emit }) {
        
      const data = reactive({
        
        dialogFlag: false,
        formData: {
          CategoryName : "",
          CategoryDiscription : ""
        },
      });
      const method = reactive({
        
        // close the dialog
        handleClose() {
        
          emit("update:categoryDialogShow", false);
        },
        // reset the dialog
        resetForm() {
        
          data.formData = Object.assign({
        }, props.rowInfo);
        },
        // submit the dialog
        submitForm() {
        
          method.handleClose();
          if (props.rowInfo.id || props.rowInfo.CategoryName || props.rowInfo.CategoryDiscription) {
        
            // modify the dialog
            emit("editRow", data.formData);
            updateCategory(props.rowInfo.projId,{comment:data.formData.CategoryDiscription,id:props.rowInfo.id,name:data.formData.CategoryName,projId:props.rowInfo.projId})
          } else {
            // add a new dialog to the data
            createNewCategorise({comment:data.formData.CategoryDiscription,id:1,name:data.formData.CategoryName,projId:props.rowInfo.projId},props.rowInfo.projId)

          }
        },
      });
      onMounted(() => {
        
        data.formData = Object.assign({}, props.rowInfo);
        data.dialogFlag = props.rowInfo;
      });
      return {
         ...toRefs(data), ...method };
    },
  };
  </script>
  
  <style>
  </style>