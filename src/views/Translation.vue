<!--
 * @Author: Yutan Wu
 * @Date: 2022-11-23 12:38:25
 * @LastEditTime: 2022-11-25 12:38:25
 * @LastEditors: Kunlin Yu
 * @Description: Test the translation page, it is a copy of translation.vue with UI decoration
 * @FilePath: \vue3-element-admin\src\view\Translation.vue
-->
<template>
  <div class="common-layout">
    <el-container>
      <el-aside  width="15%">

        <!-- upload files -->
        <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                  :headers="{ 'naive-info': 'hello!' }"
                  :data="{ 'naive-data': 'cool! naive!' }">
          <n-button>Upload File</n-button>
        </n-upload>
        <el-menu :default-active="activeIndex" style="color:dodgerblue;">
        <el-menu-item index=""
                      @click="Refresh"><span style="color:pink">Refresh</span></el-menu-item>
        </el-menu>
        <el-scrollbar height="80%">
          <el-table class="s-fileTable"
                    ref="FileTableRef"
                    style="width: 90%"
                    @row-click="FileOperation(row, column, event)"
                    :row-class-name="tableRowClassName"
                    :data="fileData"
                    :key="itemkey">
            <el-table-column prop="fileName"
                             
                             width="auto" />
            <el-table-column
                width="76">
              <template #default="{ row }">
                <span style="cursor:pointer"><Delete  @click="fileDelete(row)"  style="width: 1em; height: 1em; margin-right: 8px" /></span>

              </template>
            </el-table-column>
          </el-table>
          <el-button @click="leftAddClick" type="primary">+ New File</el-button>
        </el-scrollbar>
      </el-aside>

      <!-- translation pages  -->
      <el-container>
        <el-main style="height: 20rem;">The Translating Table
          <el-scrollbar height="90%">
            <!-- chooseOperation let you display choosed row info in the footer table -->
            <el-table :key="itemkey"
                      ref="MainTableRef"
                      :data="tableData"
                      :row-key="(row) => row.id"
                      style="width: 100%"
                      @selection-change="handleSelectionChange"
                      @row-click="chooseOperation"
                      :row-class-name="tableRowClassName"
                      :row-style="selectedstyle">
              <el-table-column prop="oriText"
                               label="oriText"
                               width="auto" />
              <el-table-column style="myMark()"
                               prop="translation"
                               label="translation"
                               width="auto" />
              <el-table-column prop="relation"
                               label="relation"
                               width="auto" />
              <el-table-column
                  width="76">
                <template #default="{ row }">
                  <span style="cursor:pointer"><Delete  @click="TextDelete(row)"  style="width: 1em; height: 1em; margin-right: 8px" /></span>

                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>

        </el-main>

        <el-footer>
          <hr>
          <!-- the choosed list table-->
          <el-table ref="singleTableRef"
                    :data="tableAimedData"
                    style="width: 100%"
                    @current-change="handleCurrentChange">
            <el-table-column prop="oriText"
                             width="auto" />
            <el-table-column prop="translation"
                             width="auto" />
            <el-table-column prop="relation"
                             width="auto" />
          </el-table>

          <hr>
          <!-- edit the translation -->
          <el-input type="textarea"
                    v-model="edit_translation"
                    :autosize="{minRows:4,maxRows:6}"
                    placeholder="Please input"
                    @change="handleChange"
                    clearable />
          <hr>

          <div class="item5">
            <el-button type="primary"
                       @click="mySave">SAVE</el-button>
            <el-button type="primary"
                       @click="myDownload">Download</el-button>
            <el-button type="primary"
                       @click="myMark">Mark</el-button>
            <el-button type="primary"
                       @click="myRemove">Clear</el-button>
            <el-button type="primary"
                       @click="myAdd">Add</el-button>
          </div>
        </el-footer>
      </el-container>
    </el-container>
    <el-dialog v-model="dialogFileVisible" title="add File">
      <el-form :rules="rules"  ref="ruleFormRef" :model="fileForm"  label-width="120px">
        <el-form-item label="File name" prop="name">
          <el-input v-model="fileForm.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitFile('ruleFormRef')">Submit</el-button>
          <el-button @click="dialogFileVisible=false">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <el-dialog v-model="dialogTextVisible" title="add Text">
      <el-form :rules="Textrules"  ref="ruleFormText" :model="textForm"  label-width="120px">
        <el-form-item label="Text oriText" prop="oriText">
          <el-input v-model="textForm.oriText"/>
        </el-form-item>
        <el-form-item label="Text translation" prop="translation">
          <el-input  v-model="textForm.translation" />
        </el-form-item>
        <el-form-item label="Text relation" prop="relation">
          <el-input v-model="textForm. relation" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitText('ruleFormText')">Submit</el-button>
          <el-button @click="dialogTextVisible=false">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>


</template>

<script>


import {
  cleanMark, createFile,
  createTextToFile,
  deleteTranlation, getAllFile,
  getFileContent,
  getTranslation,
  mark,
  updateTranslation
} from "@/http/api";
import { ElMessage, ElMessageBox } from 'element-plus'
import {useRouter} from "vue-router";
import router from "@/router";

export default {

  data() {
    return {
      textForm:{
        oriText:'',
        translation:'',
        relation:''
      },
      Textrules:{
        oriText: [
          { required: true, message: 'Please input oriText', trigger: 'blur' }
        ],
        translation: [
          { required: true, message: 'Please input file translation', trigger: 'blur' }
        ],
        relation: [
          { required: true, message: 'Please input file relation', trigger: 'blur' }
        ],
      },
      rules:{
        name: [
          { required: true, message: 'Please input file name', trigger: 'blur' }
        ],
      },
      dialogTextVisible:false,

      fileForm:{
        name:''
      },
      dialogFileVisible:false,
      activeindex: null,
      stylecolor: false,
      keyNum: 0,
      itemkey: '',
      rowIndex: 0,
      fileNum:0,
      rowindexs: '',
      row: {
        oriText: '',
        translation: '',
        relation: '',
        id: 0,
        remark: true,
        stage:0,
        commiter:0,
        time:""
      },
      //update the structure of id(num), and remark(boolean) by Kunlin Yu 2022/12/21
      //my data by Yutan Wu, why you do not use list? arr is hard to read.
      edit_translation: '',
      fileData:[
        {
          id: 1,
          fileName: "Dummy",
          fileDiscription: "This is a File discription",
          CateId:0
        },
      ],
      tableData: [
        {
          oriText: "Please select a file from left list.",
          translation: '请从左侧选择文件。',
          relation: '',
          id: 1,
          fileId:1,
          marked: true,
          stage:0,
          commiter:0,
          time:""
        },
      ]
      ,
      tableAimedData: [
        {
        },
      ]
    }
  },
  mounted() {
    this.Refresh();
  },
  created: function () {
    this.onload();
  },
  methods: {
    // 左侧新增file
    leftAddClick(){
      this.dialogFileVisible=true;
      this.fileForm.name=''

    },
    // 确定新增text
    onSubmitText(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //alert('add sucess')
          this.dialogTextVisible=false
          this.tableData.push({
            oriText: this.textForm.oriText,
            translation: this.textForm.translation,
            relation: this.textForm.relation
          })
          createTextToFile(this.fileNum+1,[{comment:this.textForm.relation,marked:false,oriText:this.textForm.oriText}]).then((res)=>{

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
},
    myAdd(){
     this.textForm={
       oriText:'',
       translation:'',
       relation:''
     }
     this.dialogTextVisible=true
    },
    // 确定添加一行file
    onSubmitFile(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //alert('add sucess')
         this.dialogFileVisible=false
          this.fileData.push(
              {
                fileName:this.fileForm.name ,
                fileDiscription: "This is a File discription",
                CateId:0
              }
          )
          createFile(router.currentRoute.value.params.id,{comment:"test",converter:"test",filename:this.fileForm.name}).then((res)=>{

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 删除一行text
    TextDelete(row){
      ElMessageBox.confirm(
          'proxy will permanently delete the file. Continue?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      )
          .then(() => {
            this.tableData.splice(row.index,1)
            ElMessage({
              type: 'success',
              message: 'Delete completed',
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: 'Delete canceled',
            })
          })
    },
    // 删除一行file
    fileDelete(row){
      ElMessageBox.confirm(
          'proxy will permanently delete the file. Continue?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      )
          .then(() => {
            this.fileData.splice(row.index,1)
            ElMessage({
              type: 'success',
              message: 'Delete completed',
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: 'Delete canceled',
            })
          })
    },
    handleCurrentChange() { },
    Refresh() {
      getAllFile(router.currentRoute.value.params.id).then((res)=>{
        for (let x = 0; x < res.data.data.length; x++) {
          if (res.data.data.length > this.fileData.length) {
            this.fileData.push(   {id: 1, fileName: "File1", fileDiscription: "This is a File discription", CateId:0})
          }
          this.fileData[x].fileName=res.data.data[x].name
        }
        this.itemkey = Math.random();
        if (this.fileData.length > res.data.data.length) {this.fileData.splice(res.data.data.length, (this.fileData.length - res.data.data.length))}
      })
    },
    myRemove() {
      this.edit_translation = '';
      deleteTranlation(this.row.translation.id).then((res)=>{

      })
    },
    mySave() {
      this.itemkey = Math.random();
      this.tableData[this.tableData.indexOf(this.row)].translation = this.edit_translation;
      updateTranslation(this.row.translation, this.row.id).then((res) => {

      })},
    myMark() {
      this.activeindex = this.rowindexs
      this.stylecolor = !this.stylecolor
      if (!this.stylecolor) {
        this.rowindexs = ''
      }
    },
    // 右侧text表格点击一行
    chooseOperation(row) {
      // this.activeindex = row.index
      this.rowIndex=row.index
      this.rowindexs = row.index
      this.tableAimedData = []
      this.tableAimedData.push(row)
      this.edit_translation = row.translation
      this.row = row;
    },
    selectedstyle({ row, rowIndex }) {
      console.log(this.stylecolor)
      if (row.remark===true) {
        return {
          "background-color": "red",
        };
      }
    },
    // 点击左侧某一行
    FileOperation(row){
      // alert('点击左侧某一行')
      console.log(row.id)
      this.fileNum=row.id

      this.tableData = [];

      getFileContent(row.id+1).then((res)=>{
        for (let i = 0; i <= res.data.data.length; i++) {
          if (res.data.data.length > this.tableData.length)
          {this.tableData.push({oriText: 'Dummy', translation: '占位', relation: 'Proofread', id: 0, fileId:1, marked: false, stage:0, commiter:0, time:""})}
              this.tableData[i].id = res.data.data[i].id
              this.tableData[i].oriText = res.data.data[i].oriText
              this.tableData[i].marked = res.data.data[i].marked
              this.tableData[i].fileId = res.data.data[i].fileId
              this.tableData[i].translation=res.data.data[i].translation
              this.tableData[i].stage=res.data.data[i].stage
              this.tableData[i].commiter=res.data.data[i].commiter
              this.tableData[i].time=res.data.data[i].time

        }

          if (this.tableData.length > res.data.data.length) {this.tableData.splice(res.data.data.length, (10 - res.data.data.length))}
      })
      this.itemkey = Math.random();
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    handleChange() {

    },
    myDownload() {
      this.$alert("this function is not completed yet.").then(() => {
        //do something...
        this.rowindexs = ''
      })},
  }
}
</script>
<style>
.el-table .addBorder {
  border-right: solid 1px #065b5b !important;
  border-left: solid 1px #065b5b !important;
  background: red;
}
</style>
<style scoped>
.el-aside,
.el-main {
  overflow: hidden;
  margin: 0.5rem;
  background: rgba(94, 173, 238, 0.3);
}

.el-footer {
  height: 20rem;
  margin: 0.5rem;
  background: rgba(94, 173, 238, 0.3);
}
.s-fileTable{
  margin: 20px;    /*调整边距*/
  margin-left:10px;
}
</style>