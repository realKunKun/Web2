//
// @Author: KunLin Yu
// * @Date: 2022-12-1 14:00
// * @LastEditTime: 2022-12-20 00:01
// * @Description: Application Program Interface File
// * @FilePath: \vue3-element-admin\src\http\api.js
//
import Service from './axios.js'
//Authentication
        // LogIn
        //{
        //   "password": "string",
        //   "username": "string"
        // }
        export const login = (data) => {
            return Service({
                url: '/auth/login',
                method: 'post',
                data
            })
        };

        //Authentication
        // Register
        //{
        //   "email": "string",
        //   "password": "string",
        //   "username": "string"
        // }
        export const register = (data) => {
            return Service({
                url: '/auth/register',
                method: 'post',
                data
            })
        };

//Project management
        //GetALlGroups
        export const getALlGroups = (page,size) => {
            return Service({
                //url: '/proj?page='+page+'&size='+size ,
                url: '/proj',
                method: 'get',
                page:page,
                size:size
            })
        }
        //Create new project
        //{
        //   "id": 0,
        //   "name": "string",
        //   "oriLang": "string",
        //   "owner": 0,
        //   "tags": "string",
        //   "tarLang": "string",
        //   "type": 0
        // }
        export const createNewProject = data => {
            return Service({
                url: '/proj',
                method: 'post',
                data
            })
        };
        //Delete project
        export const deleteProject = num => {
            return Service({
                url: '/proj/'+num,
                method: 'delete'

            })
        };
        //Page and size will jointly determine the returned data.
        // page represents the number of pages, and size represents the amount of data per page.
        // For example, if you enter page=4 size=5, you will get the 16th to 20th data.
        // Enter page=1 size=10,  and you will get the 1st to 10th data.
        // If the page or size exceeds their valid range, the backend may report an error
        //get Categorise
        export const getCategorise = (num,page,size) => {
            return Service({
                url: '/proj/' + num+ "/category",
                method: 'get',
                page:page,
                size:size
            })
        }
        //create a new categorise {proj_id}/category
        //{
        //   "comment": "string",
        //   "id": 0,
        //   "name": "string",
        //   "projId": 0
        // }
        export const createNewCategorise = (data,num) => {
            return Service({
                url: '/proj/'+num+"/category",
                method: 'post',
                data
            })
        };
        //Update Project
        //{
        //   "id": 0,
        //   "name": "string",
        //   "oriLang": "string",
        //   "owner": 0,
        //   "tags": "string",
        //   "tarLang": "string",
        //   "type": 0
        // }
        export const updateProject = (num,data) => {
            return Service({
                url: '/proj/'+num,
                method: 'put',
                data
            })
        };

// User Management
        //Get User Information by User ID
        export const getUser = data => {
            return Service({
                url: '/user/user/' + data,
                method: 'get'
            })
        }
        //{
        //   "disable": true,
        //   "email": "string",
        //   "id": 0,
        //   "password": "string",
        //   "rating": 0,
        //   "role": "string",
        //   "salt": "string",
        //   "username": "string"
        // }
        //Create a New User (Admin)
        export const createUser = data =>{
             return Service({
                 url:'/user/user',
                 method:'post',
                 data
             })
        }
        //Able or disable a user
        export const ableOrDisableUser = (num,disable) =>{
              return Service({
                  url:'/user/user/'+num+'/disable',
                  method:'put',
                  disable:disable// boolean
              })
        }
        // [
        //   "string"
        // ]
        //change role of user
        export const changeUserRole = (num,data) =>{
            return Service({
                url:'/user/user/'+num+'/role',
                method:'put',
                data
            })
        }
//Translating
        //Get a translation general information
        export const getTranslation = num => {
            return Service({
                url: '/trans/trans/' + num,
                method: 'get'
            })
        }
        //Update an exsiting translation by its id.
        //string
        export const updateTranslation = (data,num) =>{
            return Service({
                url:'/trans/trans/'+num,
                method:'post',
                data
            })
        }
        //Clean an exisiting translation by its id.
        export const deleteTranlation = (num) => {
             return Service({
                 url:'/trans/trans/'+num,
                 method:'get'
             })
        }
        //Get translations (translating chronicle information) of given original text id.
        export  const getOriginText = (num) =>{
              return Service({
                  url:'/trans/trans/'+num+'/chronicle',
                  method:'get'
              })
        }
        //Mark an translation is weird.
        export const mark = (num) =>{
              return Service({
                  url:'/trans/trans/'+num+'/mark',
                  method:'put'
              })
        }
        //clean a mark of text
        export const cleanMark = (num) =>{
            return Service({
                url:'/trans/trans/'+num+'/mark',
                method:'delete'
            })
        }
        //Query translations that are similar to the provided one.
        export const getSimilar = (target,thershold,limit) =>{
             return Service({
                 url:'/trans/trans/similar?target='+target+'&thershold='+thershold+'&limit='+limit,
                 method:'get',
             })
        }
//Category Operation
        //Update a category
        //data like this:
        //  "comment": "string",
        //   "id": 0,
        //   "name": "string",
        //   "projId": 0
        export const updateCategory = (num,data) =>{
               return Service({
                   url:'/category/'+num,
                   method:'put',
                   data
               })
        }
        //Delete a category
        export const deleteCategory = (num) =>{
            return Service({
                url:'/category/'+num,
                method:'delete'
            })
        }
        //List all files under the specified category.
        export const getAllFile = (num) =>{
            return Service({
                url:'/category/'+num+'/files',
                method:'get'
            })
        }
        //Create a new file in specified category.
        // {
        //   "comment": "string",
        //   "converter": "string",
        //   "filename": "string"
        // }
        export const createFile = (num,data) =>{
            return Service({
                url:'/category/'+num+'/files',
                method:'post',
                data
            })
        }
//File Operation
        //Get the file.
        export const getFile = (num) =>{
               return Service({
                   url:'/proj/file/'+num,
                   method:'get'
               })
        }
        //Update specified file.
        //data like this
        //  "categoryId": 0,
        //   "comment": "string",
        //   "converter": "string",
        //   "id": 0,
        //   "name": "string"
        export const updateFile = (num,data) =>{
               return Service({
                   url:'/proj/file/'+num,
                   method:'put',
                   data
               })
        }
        export const deleteFile = (num) =>{
            return Service({
                url: '/proj/file/' + num,
                method: 'delete'
            })
        }
        //Update File Comment
        //string
        export const updateFileCommemnt = (num,data) =>{
               return Service({
                   url:'/proj/file/'+num+'/comment',
                   method:'put',
                   data
               })
        }
        //List all the texts linked to this file.
        export const getFileContent = (num) =>{
            return Service({
                url:'/proj/file/'+num+'/contents',
                method:'get'
            })
        }
        //import text value to file
        //[
        //   {
        //     "comment": "string",
        //     "marked": true,
        //     "oriText": "string"
        //   }
        // ]
        export const createTextToFile = (num,data) =>{
             return Service({
                 url:'/proj/file/'+num+'/contents',
                 method:'post',
                 data
             })
        }
        //clear all data in the file
        export const deleteFileContent = (num) =>{
            return Service({
                url:'/proj/file/'+num+'/contents',
                method:'delete'
            })
        }
        //Rename the file.
        //string
        export const renameFile = (num,data) =>{
            return Service({
                url:'/proj/file/'+num+'/name',
                method:'put',
                data
            })
        }
//Project Group Operation
        //List all group member (and their roles) of specified project.
        export const getAllGroupMember = (num) =>{
               return Service({
                   url:'/proj/'+num+'/grp',
                   method:'get'
               })
        }
        //Query a relationship for it's role to specified project abd user
        export const getGroupMember = (pro_id,usr_id) =>{
               return Service({
                   url:'/proj/'+pro_id+'/grp/'+usr_id,
                   method:'get'
               })
        }
        //Modify a user's role in specified group
        export const changeGroupMemberRole = (pro_id,usr_id,data) =>{
            return Service({
                url:'/proj/'+pro_id+'/grp/'+usr_id,
                method:'put',
                data
            })
        }
        //Add a user to group with specified group
        export const createGroupMemberRole = (pro_id,usr_id,data) =>{
            return Service({
                url:'/proj/'+pro_id+'/grp/'+usr_id,
                method:'post',
                data
            })
        }
        //Remove a user from specified group
        export const deleteGroupMemberRole = (pro_id,usr_id) =>{
            return Service({
                url:'/proj/'+pro_id+'/grp/'+usr_id,
                method:'delete'
            })
        }
//Project Terminology Management
        //Query all terminologies blinded to the specified project
        export const getAllTerminologies = (pid)  =>{
               return Service({
                   url:'/proj/'+pid+'/term',
                   method:'get'
               })
        }
        //Update all terminologies data in the specified project
        export const updateTerminologies = (pid,data)  =>{
            return Service({
                url:'/proj/'+pid+'/term',
                method:'post',
                data
            })
        }
        //Query Terminology
        export const queryTerminologies = (projId,oriWord)  =>{
            return Service({
                url:'/proj/{pid}/term/query?projId='+projId+'&oriWord='+oriWord,
                method:'get',
            })
        }
//Terminology Manipulation
        //Select a terminology by ID
        export const getSpecifiedTerminologies = (id) =>{
               return Service({
                   url:'/term/'+id,
                   method:'get'
               })
        }
        //Update a terminology by ID
        export const updataSpecifiedTerminologies = (id,comment,committer,oriWord,projId,tarWord) =>{
            return Service({
                url:'/term/'+id+'?comment='+comment+'&committer='+committer+'&oriWord='+oriWord+'&projId='+projId+'&tarWord='+tarWord,
                method:'put',
            })
        }
        //Delete a terminology by ID
        export const deleteSpecifiedTerminologies = (id) =>{
            return Service({
                url:'/term/'+id,
                method:'delete'
            })
        }