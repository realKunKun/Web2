<!--
 * @Author: Yutan Wu
 * @Date: 2022-12-18 14:36
 * @LastEditTime: 2022-12-25 11:29
 * @LastEditors: FanXuYouYang
 * @Description: Group main page
 * @FilePath: \web2\src\view\Group.vue
-->
<template>
  <el-container>
    <el-aside class="group_nav" width="15%" style="height: 40rem;">Aside
      <el-menu  :default-active="activeIndex" class="el-menu-demo" mode="vertical" background-color="#77b5fe"
                text-color="#fff" active-text-color="#203773" @select="handleSelect" router="true">
        <el-menu-item index="/group">Project Management</el-menu-item>
        <!-- todo -->
        <el-menu-item index="/group" @click="Refresh">Refresh</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <div class="box">
          <!-- search text -->
          <el-input v-model="search" style="width: 20%" placeholder="front-end search..." clearable />
          <!-- add button -->
          <el-button class="new_btn" type="primary" @click="handleNew">Add New</el-button>
          <!-- initial data: projectInfo -> seacr filter data: filteredSearch -->
          <el-table :data="filteredSearch" border style="width: 100%">
            <el-table-column prop="name" label="Project Name" />
            <el-table-column prop="tags" label="Project Tag" />
            <el-table-column prop="oriLang" label="Source Language" />
            <el-table-column prop="tarLang" label="Target Language" />
            <el-table-column fixed="right" label="Operations">
              <template #default="{ row }">
                <!-- 'project' is the path to Categories.vue, row is the project row index -->
                <el-button type="text" size="small" @click="handleOpen('/categories', row)">Open</el-button>
                <!-- <el-button type="text" size="small" @click="handleDetail(row)">View</el-button> -->
                <el-button type="text" size="small" @click="handleEdit(row)">Edit</el-button>
                <el-button type="text" size="small" @click="handleDel(row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- add or edit a dialog -->
          <Dialog v-if="dialogShow" v-model:dialogShow="dialogShow" :rowInfo="rowInfo" :title="title"
                  :arrayNum="projectInfo.length" @close="Refresh" />
          <!-- detail of the dialog -->
          <Detail v-if="detailShow" :rowInfo="rowInfo" @closeDetail="closeDetail" />
        </div>
      </el-main>
    </el-container>
  </el-container>


</template>

<script>
import {
  reactive, computed, toRefs, ref
} from "vue";
import {
  ElMessageBox
} from "element-plus";
import Dialog from "./tool/dialog.vue";
import Detail from "./tool/detail.vue";
import { deleteProject, getALlGroups} from "@/http/api";


export default {

  components: {
    Dialog, Detail
  },
  mounted() {
    this.Refresh();
  },
  setup() {
    const search = ref('')//search content
    let data = reactive({
      dialogShow: false, // Add a new/edit it
      detailShow: false, // View dialog
      rowInfo: {

      }, // new or edit
      title: "", // new or modify
      projectInfo: [
      ],
    });

    const filteredSearch = computed(() => {
      return data.projectInfo.filter(row => {
        return Object.values(row).some(val => {
          return String(val).toLowerCase().includes(search.value.toLowerCase())
        })
      })
    });

    const method = reactive({
      //
      Refresh() {
        getALlGroups(1, 10).then((res) => {
          data.projectInfo = res.data.data
        })
      },
      //create a new project
      handleNew() {
        data.title = "New Project";
        data.rowInfo = {
        };
        data.dialogShow = true;
      },
      //open the project
      handleOpen(key,row) {
        //todo
        this.$router.push({
          name: "Categories",
          params: {
            id: row.id
          }
        })
      },
      //show the attributes of the project
      handleDetail(val) {

        data.detailShow = true;
        data.rowInfo = val;
      },
      //edit the attributes of the project
      handleEdit(val) {

        data.title = "Modify";
        data.dialogShow = true;
        data.rowInfo = val;

      },
      //delete the project
      handleDel(val) {

        ElMessageBox.confirm("Are you sure to delete this project?", "Hint", {

          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        })
            .then(() => {

              method.handleSure(val);
            })
            .catch(() => {

              // catch error
            });
      },
      handleSure(val) {
        this.dialogVisible = false;
        const index = data.projectInfo.findIndex((item) => item.id === val.id);
        deleteProject(data.projectInfo[index].id).then((res)=>{

        });
        data.projectInfo.splice(index, 1);

      },
      // add row
      addRow(val) {
        console.log('test');
        data.projectInfo.push(val);
      },
      // edit row
      editRow(val) {

        let index = data.projectInfo.findIndex(
            (item, index) => item.id === val.id
        );
        data.projectInfo.splice(index, 1, val);
      },
      // close the detail
      closeDetail() {

        data.detailShow = false;
      },
    });

    //get first row project name
    const getValue = computed(() => {
      return data.projectInfo[0].ProjectName
    });

    return {
      search,
      ...toRefs(data),
      ...method,
      filteredSearch,
      //get row 0 from first row of project info data
      getValue
    };
  },
};
</script>

<style>
.group_nav {
  overflow: hidden;
  height: 100%;
  background: rgba(94, 173, 238, 0.3);
}
</style>