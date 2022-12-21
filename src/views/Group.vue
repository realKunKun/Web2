<!--
 * @Author: Yutan Wu
 * @Date: 2022-12-18 14:36
 * @LastEditTime: 2022-12-18 00:01
 * @LastEditors: Yutan Wu
 * @Description: Group main page
 * @FilePath: \vue3-element-admin\src\view\Group.vue
-->
<template>
  <el-container>
    <el-aside class="group_nav" width="15%" style="height: 40rem;">Aside
      <el-menu default-active="/keng" class="el-menu-demo" mode="vertical" background-color="#77b5fe" text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/dyg1">Project Management</el-menu-item>
        <el-menu-item index="/deg1">Member Management</el-menu-item>
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
            <el-table-column prop="ProjectName" label="Project Name" />
            <el-table-column prop="ProjectTag" label="Project Tag" />
            <el-table-column prop="ProjectDiscription" label="Project Discription" />
            <el-table-column fixed="right" label="Operations">
              <template #default="{ row }">
                <el-button type="text" size="small" @click="handleOpen(row)">Open</el-button>
                <el-button type="text" size="small" @click="handleDetail(row)">View</el-button>
                <el-button type="text" size="small" @click="handleEdit(row)">Edit</el-button>
                <el-button type="text" size="small" @click="handleDel(row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- add or edit a dialog -->
          <Dialog v-if="dialogShow" v-model:dialogShow="dialogShow" :rowInfo="rowInfo" :title="title"
            :arrayNum="projectInfo.length" @addRow="addRow" @editRow="editRow" />
          <!-- detail of the dialog -->
          <Detail v-if="detailShow" :rowInfo="rowInfo" @closeDetail="closeDetail" />
        </div>
      </el-main>
    </el-container>
  </el-container>


</template>

<script>
import {
  reactive, computed, toRefs, ref, toRaw
} from "vue";
import {
  ElMessageBox
} from "element-plus";
import Dialog from "./tool/dialog.vue";
import Detail from "./tool/detail.vue";
import { createNewProject, getALlGroups } from "@/http/api";

export default {

  components: {
    Dialog, Detail
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
        {
          id: 1,
          ProjectName: "Common Project Name",
          ProjectTag: "This is a tag",
          ProjectDiscription: "This is a discription",
        },
        {
          id: 2,
          ProjectName: "Common Project Name",
          ProjectTag: "This is another tag",
          ProjectDiscription: "This is a discription",
        },
        {
          id: 3,
          ProjectName: "Common Project Name",
          ProjectTag: "This is also a tag",
          ProjectDiscription: "This is a discription",
        },

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
      //create a new project
      handleNew() {
        data.title = "New Project";
        data.rowInfo = {
      };
        data.dialogShow = true;
        getALlGroups(1, 1).then((res) => {
          console.log(res.data)
          console.log(res.data.desc)
        })
      },
      //open the project
      handleOpen() {
        //to do
        this.$router.push({
          path: "/about_us",
          params: { data: 'query' }
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

        ElMessageBox.confirm("Are you sure to delete this information?", "Hint", {

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
        data.projectInfo.splice(index, 1);
      },
      // add row
      addRow(val) {

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