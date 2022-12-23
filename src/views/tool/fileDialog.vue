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
      <el-form-item label="File Name: " prop="FileName">
        <el-input v-model="formData.fileName"></el-input>
      </el-form-item>
      <el-form-item label="File Tag: " prop="FileTag">
        <el-input v-model="formData.fileTag"></el-input>
      </el-form-item>
      <el-form-item label="File Discription: " prop="FileDiscription">
        <el-input type="textarea" :autosize="{minRows:8}" v-model="formData.fileDiscription"></el-input>
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
  reactive, toRefs, onMounted} from "vue";
import {} from "@/http/api";
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
        fileName : "",
        fileTag : "" ,
        fileDiscription : ""
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
        if (props.rowInfo.id || props.rowInfo.fileName || props.rowInfo.fileDiscription) {

          // modify the dialog
          emit("editRow", data.formData);

        } else {
          // add a new dialog to the data
          // data.formData["id"] = props.arrayNum + 1;
          // emit("addRow", data.formData);
          createFile()
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