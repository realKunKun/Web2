<!--
 * @Author: Yutan Wu
 * @Date: 2022-12-27 15:29
 * @LastEditTime: 2022-12-27 15:29
 * @LastEditors: Yutan Wu
 * @Description: This is the register dialog that in the 'Register' button of the LogIn.vue
 * @FilePath: \vue3-element-admin\src\tool\fileDetail.vue
-->
<template>
  <el-dialog :model-value="true" :title="title" @close="handleClose">
    <el-form ref="ruleFormRef" :model="formData" :rules="rules" label-width="25%" class="demo-ruleForm"
      :size="formSize">
      <el-form-item label="User Account: " prop="Account">
        <el-input v-model="formData.Account" placeholder="Please input account" clearable></el-input>
      </el-form-item>
      <el-form-item label="User Password: " prop="Password">
        <el-input v-model="formData.Password" type="password" placeholder="Please input password"
          show-password></el-input>
      </el-form-item>
      <el-form-item label="User Email: " prop="email">
        <el-input v-model="formData.email" placeholder="Please input email" clearable></el-input>
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
  reactive, toRefs, onMounted
} from "vue";
import { } from "@/http/api";
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
        Account: "",
        Password: "",
        email: ""
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


        //bug codes below
        //if not null
        if (props.rowInfo.Account && props.rowInfo.Password && props.rowInfo.email) {

          // modify the dialog
          emit("editRow", data.formData);

        } else {
          // add a new dialog to the data
          // data.formData["id"] = props.arrayNum + 1;
          // emit("addRow", data.formData);
          //createFile()
        }


      },
    });
    onMounted(() => {

      data.formData = Object.assign({}, props.rowInfo);
      data.dialogFlag = props.rowInfo;
    });
    return {
      ...toRefs(data), ...method
    };
  },
};
</script>

<style>

</style>