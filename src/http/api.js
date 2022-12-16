// src/http/api.js
import Service from './axios.js'
//Authentication
// LogIn
export const login = data => {
    return Service({
        url: '/auth/login',
        method: 'post',
        data
    })
};

//Authentication
// Register
export const register = data => {
    return Service({
        url: '/auth/register',
        method: 'post',
        data
    }).then(function(res) {
        console.log(res);
    })
        .catch(resp => {
            console.log("request fail：" + resp.status + "," + resp.statusText);
        });
};


//Project management
//GetALlGroups
export const getALlGroups = data => {
    return Service({
        url: '/proj' + data,
        method: 'get',
    }).then(function(res) {
        console.log(res);
    })
        .catch(resp => {
            console.log("request fail：" + resp.status + "," + resp.statusText);
        });
}
//Project management
//Create new project
export const createNewProject = data => {
    return Service({
        url: '/proj',
        method: 'post',
        data
    }).then(function(res) {
        console.log(res);
    })
        .catch(resp => {
            console.log("request fail：" + resp.status + "," + resp.statusText);
        });
};
//Project management
//Delete project
export const deleteProject = data => {
    return Service({
        url: '/proj' +data,
        method: 'delete'
    }).then(function(res) {
        console.log(res);
    })
        .catch(resp => {
            console.log("request fail：" + resp.status + "," + resp.statusText);
        });
};

//Project management
//get Categorise
export const getCategorise = data => {
    return Service({
        url: '/proj' + data+ "/category",
        method: 'get',
    }).then(function(res) {
        console.log(res);
    })
        .catch(resp => {
            console.log("request fail：" + resp.status + "," + resp.statusText);
        });
}
//Project management
//create a new categorise {proj_id}/category
export const createNewCategorise = data => {
    return Service({
        url: '/proj/'+data+"/category",
        method: 'post',
        data
    }).then(function(res) {
        console.log(res);
    })
        .catch(resp => {
            console.log("request fail：" + resp.status + "," + resp.statusText);
        });
};


// USER INFO
export const userApi = data => {
    return Service({
        url: '/user/user/{id}' + data,
        method: 'get',
    })
}