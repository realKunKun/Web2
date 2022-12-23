<!--
 * @Author: Yutan Wu
 * @Date: 2022-11-23 12:38:25
 * @LastEditTime: 2022-11-23 12:38:25
 * @LastEditors: Yutan Wu
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
                    style="width: 70%"
                    @row-click="FileOperation"
                    :row-class-name="tableRowClassName"
                    :data="fileData">
            <el-table-column prop="fileName"
                             label="fileName"
                             width="auto" />
          </el-table>
        </el-scrollbar>
      </el-aside>

      <!-- translation pages  -->
      <el-container>
        <el-main style="height: 20rem;">The Translating Table
          <el-scrollbar height="90%">
            <!-- chooseOperation let you display choosed row info in the footer table -->
            <el-table :key="keyNum"
                      ref="MainTableRef"
                      :data="tableData"
                      style="width: 100%"
                      @selection-change="handleSelectionChange"
                      @row-click="chooseOperation"
                      :row-class-name="tableRowClassName"
                      :row-style="selectedstyle">
              <el-table-column prop="origin"
                               label="origin"
                               width="auto" />
              <el-table-column style="myMark()"
                               prop="translation"
                               label="translation"
                               width="auto" />
              <el-table-column prop="relation"
                               label="relation"
                               width="auto" />
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
            <el-table-column prop="origin"
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
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>


import {
  cleanMark,
  createTextToFile,
  deleteTranlation,
  getFileContent,
  getTranslation,
  mark,
  updateTranslation
} from "@/http/api";

export default {
  data() {
    return {
      activeindex: null,
      stylecolor: false,
      keyNum: 0,
      rowIndex: 0,
      fileNum:0,
      rowindexs: '',
      row: {
        origin: '',
        translation: '',
        relation: '',
        id: 0,
        remark: false
      },
      //update the structure of id(num), and remark(boolean) by Kunlin Yu 2022/12/21
      //my data by Yutan Wu, why you do not use list? arr is hard to read.
      edit_translation: '',
      fileData:[
        {
          id: 1,
          fileName: "File1",
          fileDiscription: "This is a File discription",
          CateId:0
        },
        {
          id: 2,
          fileName: "File2",
          fileDiscription: "This is a File discription",
          CateId:0
        },
        {
          id: 3,
          fileName: "File2",
          fileDiscription: "This is a File discription",
          CateId:0
        }
      ],
      tableData: [
        {
          origin: "I can eat glass, it doesn't hurt me.",
          translation: '我能吃玻璃而不伤身体。',
          relation: '[glass]->[玻璃]; Proofread',
          id: 1,
          file:1,
          remark: false
        },
        {
          origin: 'Computer science is beautiful.',
          translation: '计算机科学十分美妙。',
          relation: '[Computer Science]->[计算机科学]',
          id: 2,
          file:1,
          remark: false
        },
        {
          origin: 'Dummy',
          translation: '占位',
          relation: 'Proofread',
          id: 3,
          file:1,
          remake: false
        },
        {
          origin: 'Dummy',
          translation: '占位',
          relation: 'Proofread',
          id: 4,
          file:1,
          remake: false
        },
        {
          origin: 'Dummy',
          translation: '占位',
          relation: 'Proofread',
          id: 5,
          file:1,
          remake: false
        },
        {
          origin: 'Dummy',
          translation: '占位',
          relation: 'Proofread',
          id: 6,
          file:1,
          remake: false
        },
        {
          origin: 'Dummy',
          translation: '占位',
          relation: 'Proofread',
          id: 7,
          file:1,
          remake: false
        },
        {
          origin: 'Dummy',
          translation: '占位',
          relation: 'Proofread',
          id: 8,
          file:1,
          remake: false
        },
        {
          origin: 'Dummy',
          translation: '占位',
          relation: 'Proofread',
          id: 9,
          file:1,
          remake: false
        },
        {
          origin: 'Dummy',
          translation: '占位',
          relation: 'Proofread',
          id: 10,
          file:1,
          remake: false
        },
      ]
      ,
      tableAimedData: [
        {
        },
      ]
    }
  },
  created: function () {
    this.onload();
  },
  methods: {
    handleCurrentChange() { },
    Refresh() {
      //should use fileId instead of 1 in two parts
        getFileContent(1).then((res)=>{//here
          for (let i = 0; i <= 1; i++) {
                this.tableData[i].id = res.data.data[i].id,
                this.tableData[i].origin = res.data.data[i].oriText,
                this.tableData[i].remark = res.data.data[i].marked,
                this.tableData[i].file = 1//here
          }
        })
    },
    myRemove() {
      this.edit_translation = '';
      deleteTranlation(this.row.translation.id).then((res)=>{

      })
    },
    mySave() {
      this.keyNum++;
      this.tableData[this.tableData.indexOf(this.row)].translation = this.edit_translation;
      updateTranslation(this.row.translation, this.row).then((res) => {
        console.log(res.data.desc)
      })},
    myMark() {
      this.activeindex = this.rowindexs
      this.stylecolor = !this.stylecolor
      if (this.row.remark===false){
        mark(this.row.id).then((res)=>{

        })
      }else{
        cleanMark(this.row.id).then((res)=>{

        })
      }
      if (!this.stylecolor) {
        this.rowindexs = ''
      }
    },
    onload() {
      //this.chooseOperation(this.tableData[0]);
    },
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
      if (this.activeindex === rowIndex) {
        return {
          "background-color": "red",
        };
      }
    },
    fileOperation(row){
      console.log(row.id)
      this.fileNum=row.id
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
}
</style>