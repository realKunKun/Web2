// src/http/api.js
import Service from './axios.js'
//Authentication
        // LogIn
        export const login = (data) => {
            return Service({
                url: '/auth/login',
                method: 'post',
                data
            })
        };

        //Authentication
        // Register
        export const register = (data) => {
            return Service({
                url: '/auth/register',
                method: 'post',
                data
            })
        };


//Project management
        //GetALlGroups
        export const getALlGroups = data => {
            return Service({
                url: '/proj' + data,
                method: 'get',
            })
        }
        //Create new project
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
                url: '/proj' +num,
                method: 'delete'
            })
        };

        //get Categorise
        export const getCategorise = num => {
            return Service({
                url: '/proj' + num+ "/category",
                method: 'get',
            })
        }
        //create a new categorise {proj_id}/category
        export const createNewCategorise = (data,num) => {
            return Service({
                url: '/proj/'+num+"/category",
                method: 'post',
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
                  disable// boolean
              })
        }
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
                 url:'/trans/trans/similar',
                 method:'get',
                 target,
                 thershold,
                 limit
             })
        }
//Category Operation
        //Update a category
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
        export const getCategory = (num) =>{
            return Service({
                url:'/category/'+num+'/files',
                method:'get'
            })
        }
        //Create a new file in specified category.
        export const createCategory = (num,data) =>{
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
        export const updateFile = (num,data) =>{
               return Service({
                   url:'/proj/file/'+num,
                   method:'put',
                   data
               })
        }
        //Update File Comment
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
        export const importTextToFile = (num,data) =>{
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
        export const renameFile = (num,data) =>{
            return Service({
                url:'/proj/file/'+num+'/name',
                method:'put',
                data
            })
        }
//Project Group Operation
//Project Terminology Management
//Terminology Manipulation