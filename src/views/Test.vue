<!--
 * @Author: Yutan Wu
 * @Date: 2022-11-23 12:38:25
 * @LastEditTime: 2022-11-23 12:38:25
 * @LastEditors: Yutan Wu
 * @Description: Test the translation page, it is a copy of translation.vue with UI decoration
 * @FilePath: \vue3-element-admin\src\view\Test.vue
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
        <el-main>The Translating Table
          <el-scrollbar height="350px">
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
          <el-input v-model="edit_translation" placeholder="Please input" @change="handleChange" clearable/>
          <hr>

          <div class="item5">
            <el-button type="primary" @click="mySave">SAVE</el-button>
            <el-button type="primary" @click="myDownload">Download</el-button>
            <el-button type="primary" @click="myMark">Mark</el-button>
            <el-button type="primary" @click="myRemove">Remove</el-button>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
  
<script>



export default {
  data() {
    return {
      keyNum:0,
      index:0,
      row: {  origin: '',
              translation: '',
              relation: ''},
      //my data by Yutan Wu, why you do not use list? arr is hard to read.
      edit_translation: 'this is the first translation',
      tableData: [
        {
          origin: 'this is the first original text',
          translation: 'this is the first translation',
          relation: 'this is the first related information',
        },
        {
          origin: 'this is the second original text',
          translation: 'this is the second translation',
          relation: 'this is the second related information',
        },
        {
          origin: 'this is the third original text',
          translation: 'this is the third translation',
          relation: 'this is the third related information',
        },
        {
          origin: 'this is the first original text',
          translation: 'this is the first translation',
          relation: 'this is the first related information',
        },
        {
          origin: 'this is the second original text',
          translation: 'this is the second translation',
          relation: 'this is the second related information',
        },
        {
          origin: 'this is the third original text',
          translation: 'this is the third translation',
          relation: 'this is the third related information',
        },
        {
          origin: 'this is the first original text',
          translation: 'this is the first translation',
          relation: 'this is the first related information',
        },
        {
          origin: 'this is the second original text',
          translation: 'this is the second translation',
          relation: 'this is the second related information',
        },
        {
          origin: 'this is the third original text',
          translation: 'this is the third translation',
          relation: 'this is the third related information',
        },
      ],
      tableAimedData: [
        {
          origin: 'this is the first original text',
          translation: 'this is the first translation',
          relation: 'this is the first related information',
        },
      ]
    }
  },
  methods: {
    myRemove() {
      this.$alert("this function is not completed yet.");
    },
    mySave() {
      this.keyNum++;
      this.tableData[this.tableData.indexOf(this.row)].translation=this.edit_translation;
    },
    myDownload() {
      this.$alert("this function is not completed yet.");
    },
    myMark() {
      this.$alert("this function is not completed yet.");
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
  height: 500px;
  margin: 5px;
  background: rgba(94, 173, 238, 0.3);
}

.el-footer {
  height: 200px;
  margin: 5px;
  background: rgba(94, 173, 238, 0.3);
}
</style>