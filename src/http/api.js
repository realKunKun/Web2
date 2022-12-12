// src/http/api.js
import Service from './axios.js'
//Authentication
// LogIn
export const login = data => {
    return Service({
        url: '/auth/login',
        method: 'post',
        data
    }).then(function(res) {
        console.log(res);
    })
        .catch(resp => {
            console.log("request fail：" + resp.status + "," + resp.statusText);
        });
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
//Project management /proj/{id}
//Delete project
export const deleteProject = data => {
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
//Project management


// USER INFO
export const userApi = data => {
    return Service({
        url: '/user/user/{id}' + data,
        method: 'get',
    })
}