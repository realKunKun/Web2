<!--
 * @Author: Yutan Wu
 * @Date: 2022-12-21 21:27
 * @LastEditTime: 2022-12-22 11:29
 * @LastEditors: Yutan Wu
 * @Description: Project main page, the file in this vue is named 'category' but not 'project'
 * @FilePath: \web2\src\view\Categories.vue
-->
<template>
    <el-container>
        <el-aside class="group_nav" width="15%" style="height: 40rem;">Aside
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="vertical" background-color="#77b5fe"
                text-color="#fff" active-text-color="#203773" @select="handleSelect" router="true">
              <el-menu-item index="/categories"  >Categories Management</el-menu-item>
                <el-menu-item index="/categories" @click="backToProject">Back to GroupPage</el-menu-item>
                <!-- todo -->
                <el-menu-item index="/categories" @click="Refresh">Refresh</el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-main>
                <div class="box">
                    <!-- search text -->
                    <el-input v-model="search" style="width: 20%" placeholder="front-end search..." clearable />
                    <!-- add button -->
                    <el-button class="new_btn" type="primary" @click="handleNew">Add New Category</el-button>
                    <!-- initial data: categoryInfo -> seacr filter data: filteredSearch -->
                    <el-table :data="filteredSearch" border style="width: 100%">
                        <el-table-column prop="CategoryName" label="Category Name" />
                        <el-table-column prop="CategoryDiscription" label="Category Discription" />
                        <el-table-column fixed="right" label="Operations">
                            <template #default="{ row }">
                              <el-button type="text" size="small" @click="handleOpen('Translation', row)">Open</el-button>
                                <el-button type="text" size="small" @click="handleDetail(row)">View</el-button>
                                <el-button type="text" size="small" @click="handleEdit(row)">Edit</el-button>
                                <el-button type="text" size="small" @click="handleDel(row)">Delete</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- add or edit a dialog -->
                    <categoryDialog v-if="categoryDialogShow" v-model:categoryDialogShow="categoryDialogShow" :rowInfo="rowInfo" :title="title"
                        :arrayNum="categoryInfo.length" @addRow="addRow" @editRow="editRow" />
                    <!-- detail of the dialog -->
                    <categoryDetail v-if="categoryDetailShow" :rowInfo="rowInfo" @closeDetail="closeDetail" />
                </div>
            </el-main>
        </el-container>
    </el-container>


</template>
  
<script>
import {
  reactive, computed, toRefs, ref, toRaw, getCurrentInstance
} from "vue";
import {
    ElMessageBox
} from "element-plus";
import categoryDialog from "./tool/categoryDialog.vue";
import categoryDetail from "./tool/categoryDetail.vue";

//todo
import {updateCategory, deleteCategory, getCategorise} from "@/http/api";
import router from "@/router";
import {useRoute} from "vue-router";

export default {

    components: {
        categoryDialog, categoryDetail
    },
    setup() {
        const search = ref('')//search content
        let data = reactive({
            categoryDialogShow: false, // Add a new/edit it
            categoryDetailShow: false, // View dialog
            rowInfo: {

            }, // new or edit
            title: "", // new or modify
            projectInfo: [],//push group row info to this list
            categoryInfo: [
                {
                    id: 1,
                    CategoryName: "Category1",
                    CategoryDiscription: "This is a category discription",
                },

                {
                    id: 2,
                    CategoryName: "Category2",
                    CategoryDiscription: "This is another category discription",
                },
                {
                    id: 3,
                    CategoryName: "Category3",
                    CategoryDiscription: "This is also a category discription",
                },

            ],
        });

        const filteredSearch = computed(() => {
            return data.categoryInfo.filter(row => {
                return Object.values(row).some(val => {
                    return String(val).toLowerCase().includes(search.value.toLowerCase())
                })
            })
        });

        const method = reactive({
          backToProject(){

            router.push("/Group")
          },
            //create a new category
            handleNew() {
                data.title = "New Category";
                data.rowInfo = {
                };
                data.categoryDialogShow = true;
                //   getALlGroups(1, 1).then((res) => {
                //     console.log(res.data)
                //     console.log(res.data.desc)
                //   })
            },
            //open the category
            handleOpen(key) {
                //to do
                //push to the key page
                this.$router.push({
                    path: key,
                    params: { data: 'query' }
                })
            },
            //show the attributes of the category
            handleDetail(val) {
                data.categoryDetailShow = true;
                data.rowInfo = val;
            },
            //edit the attributes of the category
            handleEdit(val) {

                data.title = "Modify";
                data.categoryDialogShow = true;
                data.rowInfo = val;
            },
            //delete the category
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
                const index = data.categoryInfo.findIndex((item) => item.id === val.id);
                data.categoryInfo.splice(index, 1);
                deleteCategory(data.projectInfo[index].id).then((res)=>{

                })
            },
            // add row
            addRow(val) {

                data.categoryInfo.push(val);
            },
            // edit row
            editRow(val) {

                let index = data.categoryInfo.findIndex(
                    (item, index) => item.id === val.id
                );
                data.categoryInfo.splice(index, 1, val);
            },
            // close the detail
            closeDetail() {

                data.categoryDetailShow = false;
            },
        });

        //get first row category name
        const getValue = computed(() => {
            return data.categoryInfo[0].CategoryName
        });

        return {
            search,
            ...toRefs(data),
            ...method,
            filteredSearch,
            //get row 0 from first row of category info data
            getValue
        };
    },
  methods:{
    Refresh() {
      const route = useRoute();
      console.log(route.params.id)
      getCategorise(route.params.id, 1,10).then((res) => {
        for (let x=0;x<res.data.data.length;x++){
          if (res.data.data.length>data.categoryInfo.length){
            data.categoryInfo.push( {id: 0, CategoryName: "", CategoryDiscription: "",})
          }
          data.categoryInfo[x].CategoryName=res.data.data[x].name
          data.categoryInfo[x].CategoryDiscription="the original language is"+res.data.data[x].oriLang
          data.categoryInfo[x].id=res.data.data[x].id
        }
        if (data.categoryInfo.length>res.data.data.length){
          data.categoryInfo.splice(res.data.data.length,(data.categoryInfo.length-res.data.data.length))
        }
      })}
  }
};
</script>
  
<style>

</style>