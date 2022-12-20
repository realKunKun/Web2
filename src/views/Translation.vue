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
      <el-aside width="15%">Uploaded files

        <!-- upload files -->
        <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :headers="{ 'naive-info': 'hello!' }"
          :data="{ 'naive-data': 'cool! naive!' }">
          <n-button>Upload File</n-button>
        </n-upload>
      </el-aside>

      <!-- translation pages  -->
      <el-container>
        <el-main style="height: 20rem;">The Translating Table
          <el-scrollbar height="90%">
            <!-- chooseOperation let you display choosed row info in the footer table -->
            <el-table :key="keyNum" ref="MainTableRef" :data="tableData" highlight-current-row style="width: 100%"
              @selection-change="handleSelectionChange" @row-click="chooseOperation" >
              <el-table-column prop="origin" label="origin" width="auto" />
              <el-table-column style="myMark()" prop="translation" label="translation" width="auto" />
              <el-table-column prop="relation" label="relation" width="auto" />
            </el-table>
          </el-scrollbar>

        </el-main>

        <el-footer>
          <hr>
          <!-- the choosed list table-->
          <el-table ref="singleTableRef" :data="tableAimedData" style="width: 100%"
            @current-change="handleCurrentChange">
            <el-table-column prop="origin" width="auto" />
            <el-table-column prop="translation" width="auto" />
            <el-table-column prop="relation" width="auto" />
          </el-table>

          <hr>
          <!-- edit the translation -->
          <el-input type="textarea" v-model="edit_translation" :autosize="{minRows:4,maxRows:6}" placeholder="Please input" @change="handleChange" clearable/>
          <hr>

          <div class="item5">
            <el-button type="primary" @click="mySave">SAVE</el-button>
            <el-button type="primary" @click="myDownload">Download</el-button>
            <el-button type="primary" @click="myMark">Mark</el-button>
            <el-button type="primary" @click="myRemove">Clear</el-button>
            <el-button type="primary" @click="fresh">Fresh</el-button>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
  
<script>


import {deleteTranlation, getTranslation, updateTranslation} from "@/http/api";

export default {
  data() {
    return {
      keyNum:0,
      index:0,
      row: {  origin: {content:'', Id:0, remark:false},
              translation: {content:'', Id:0, remark:false},
              relation: {content:'', Id:0, remark:false}},
      //update the structure of id(num), and remark(boolean) by Kunlin Yu 2022/12/21
      //my data by Yutan Wu, why you do not use list? arr is hard to read.
      edit_translation: '',

      tableData: [
        {
          origin: {content:'I can eat glass, it doesn\'t hurt me.',id:1, remark:false},
          translation: {content: '我能吃玻璃而不伤身体。',id:1, remark:false},
          relation: {content:'[glass]->[玻璃]; Proofread',id:1, remark:false},
        },
        {
          origin: {content: 'Computer science is beautiful.',id:2, remark:false},
          translation: {content: '计算机科学十分美妙。',id:2, remark:false},
          relation: {content: '[Computer Science]->[计算机科学]', id:2, remark:false},
        },
        {
          origin: {content:'Dummy',id:0, remark:false},
          translation: {content: '占位',id:0, remark:false},
          relation: {content:'Proofread',id:0, remark:false},
        },
        {
          origin: {content:'Dummy',id:0, remark:false},
          translation: {content: '占位',id:0, remark:false},
          relation: {content:'Proofread',id:0, remark:false},
        },
        {
          origin: {content:'Dummy',id:0, remark:false},
          translation: {content: '占位',id:0, remark:false},
          relation: {content:'Proofread',id:0, remark:false},
        },
        {
          origin: {content:'Dummy',id:0, remark:false},
          translation: {content: '占位',id:0, remark:false},
          relation: {content:'Proofread',id:0, remark:false},
        },
        {
          origin: {content:'Dummy',id:0, remark:false},
          translation: {content: '占位',id:0, remark:false},
          relation: {content:'Proofread',id:0, remark:false},
        },
        {
          origin: {content:'Dummy',id:0, remark:false},
          translation: {content: '占位',id:0, remark:false},
          relation: {content:'Proofread',id:0, remark:false},
        },
        {
          origin: {content:'Dummy',id:0, remark:false},
          translation: {content: '占位',id:0, remark:false},
          relation: {content:'Proofread',id:0, remark:false},
        },
        {
          origin: {content:'Dummy',id:0, remark:false},
          translation: {content: '占位',id:0, remark:false},
          relation: {content:'Proofread',id:0, remark:false},
        },
        {
          origin: {content:'Dummy',id:0, remark:false},
          translation: {content: '占位',id:0, remark:false},
          relation: {content:'Proofread',id:0, remark:false},
        },
        {
          origin: {content:'Dummy',id:0, remark:false},
          translation: {content: '占位',id:0, remark:false},
          relation: {content:'Proofread',id:0, remark:false},
        },
      ],
      tableAimedData: [
        {
        },
      ]
    }
  },
  created: function() {
    this.onload();
  },
  methods: {
    fresh(){
      for(let i=0;i<=10;i++){
        getTranslation(i).then((res)=>{
          this.tableData[i]=res.data
        })
      }
    },
    myRemove() {
      this.edit_translation = '';
      deleteTranlation(this.row.translation.id)
    },
    mySave() {
      this.keyNum++;
      this.tableData[this.tableData.indexOf(this.row)].translation=this.edit_translation;
      updateTranslation("nothing",1).then((res)=>{
        console.log(res.data.desc)
      })
    },
    myDownload() {
      this.$alert("this function is not completed yet.");
    },
    myMark() {
      this.$alert("this function is not completed yet.");

    },
    onload() {
      this.chooseOperation(this.tableData[0]);
    },
    chooseOperation(row) {
      this.tableAimedData = []
      this.tableAimedData.push(row)
      this.edit_translation=row.translation
      this.row=row;
    },
    handleChange(){

    }
  }
}
</script>
<style scoped>
.el-aside,
.el-main {
  overflow: hidden;
  margin: .5rem;
  background: rgba(94, 173, 238, 0.3);
}

.el-footer {
  height: 20rem;
  margin: .5rem;
  background: rgba(94, 173, 238, 0.3);
}
</style>