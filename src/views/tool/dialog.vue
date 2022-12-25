<!--
 * @Author: Yutan Wu
 * @Date: 2022-12-18 14:37:25
 * @LastEditTime: 2022-12-18 14:49
 * @LastEditors: Yutan Wu
 * @Description: This is the dialog that in the 'Edit' button of the Group.vue
 * @FilePath: \vue3-element-admin\src\view\dialog.vue
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
        <el-form-item label="Project Name: " prop="ProjectName">
          <el-input v-model="formData.ProjectName"></el-input>
        </el-form-item>
        <el-form-item label="Project Tag: " prop="ProjectTag">
          <el-input v-model="formData.ProjectTag"></el-input>
        </el-form-item>
        <el-form-item label="Original Language: " prop="originalLanguage">
          <el-input v-model="formData.originalLanguage"></el-input>
        </el-form-item>
        <el-form-item label="Target Language: " prop="targetLanguage">
          <el-input v-model="formData.targetLanguage"></el-input>
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
  import {createNewProject, updateProject} from "@/http/api";
  export default {
        
    props: {
        
      title: {
        
        type: String,
        default: "",
      },
      dialogShow: {
        
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
           ProjectName : "",
           ProjectTag : "" ,
           originalLanguage : "en-US",
           targetLanguage : "zh-CN"
        },
      });
      const method = reactive({
        
        // close the dialog
        handleClose() {
        
          emit("update:dialogShow", false);
        },
        // reset the dialog
        resetForm() {
        
          data.formData = Object.assign({
        }, props.rowInfo);
        },
        // submit the dialog
        submitForm() {
        
          method.handleClose();
          if (props.rowInfo.id || props.rowInfo.ProjectName || props.rowInfo.ProjectTag || props.rowInfo.ProjectDiscription) {
        
            // modify the dialog
            // emit("editRow", data.formData);
            updateProject(props.rowInfo.id,{id:props.rowInfo.id,name: data.formData.ProjectName, oriLang:data.formData.originalLanguage,owner:0,tags:data.formData.ProjectTag,tarLang:data.formData.targetLanguage, type:0})
          } else {
            // add a new dialog to the data
           // data.formData["id"] = props.arrayNum + 1;
           // emit("addRow", data.formData);
            createNewProject({id:1,name: data.formData.ProjectName,oriLang:data.formData.originalLanguage,owner:0,tags:data.formData.ProjectTag,tarLang:data.formData.targetLanguage, type:0}).
            then((res) =>{
              console.log(res);
              if (res.data.error===0){
              }})
          }
          emit('close', data.formData);


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