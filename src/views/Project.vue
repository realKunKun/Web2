<!--
 * @Author: Yutan Wu
 * @Date: 2022-12-21 21:27
 * @LastEditTime: 2022-12-21 23:24
 * @LastEditors: Yutan Wu
 * @Description: Project main page, the file in this vue is named 'category' but not 'project'
 * @FilePath: \web2\src\view\Project.vue
-->
<template>
    <el-container>
        <el-aside class="group_nav" width="15%" style="height: 40rem;">Aside
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="vertical" background-color="#77b5fe"
                text-color="#fff" active-text-color="#203773" @select="handleSelect" router="true">
                <el-menu-item index="/group" @click="handleOpen">Project Management</el-menu-item>
                <el-menu-item index="/deg1">Member Management</el-menu-item>
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
                                <el-button type="text" size="small" @click="handleDetail(row)">View</el-button>
                                <el-button type="text" size="small" @click="handleEdit(row)">Edit</el-button>
                                <el-button type="text" size="small" @click="handleDel(row)">Delete</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- add or edit a dialog -->
                    <Dialog v-if="dialogShow" v-model:dialogShow="dialogShow" :rowInfo="rowInfo" :title="title"
                        :arrayNum="categoryInfo.length" @addRow="addRow" @editRow="editRow" />
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
import categoryDialog from "./tool/categoryDialog.vue";
import categoryDetail from "./tool/categoryDetail.vue";

//todo
import { updateCategory, deleteCategory } from "@/http/api";

export default {

    components: {
        categoryDialog, categoryDetail
    },
    setup() {
        const search = ref('')//search content
        let data = reactive({
            dialogShow: false, // Add a new/edit it
            detailShow: false, // View dialog
            rowInfo: {

            }, // new or edit
            title: "", // new or modify
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
            //create a new category
            handleNew() {
                data.title = "New Category";
                data.rowInfo = {
                };
                data.dialogShow = true;
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

                data.detailShow = true;
                data.rowInfo = val;
            },
            //edit the attributes of the category
            handleEdit(val) {

                data.title = "Modify";
                data.dialogShow = true;
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

                data.detailShow = false;
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
};
</script>
  
<style>

</style>