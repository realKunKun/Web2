//--
// * @Author: KunLin Yu
// * @Date: 2022-12-1 14:00
// * @LastEditTime: 2022-12-20 00:01
// * @Description: Interceptors File
// * @FilePath: \vue3-element-admin\src\http\axios.js
//
import axios from 'axios'
import { Modal, message } from 'ant-design-vue'


axios.defaults.timeout = 10000 // 请求超时时间

const Service = axios.create({
   // baseURL: '/api'
})

// axios 请求拦截器
Service.interceptors.request.use(
    config=>{
        if(localStorage.getItem("access_token")){
            config.headers.Authorization = localStorage.getItem('access_token');
        }
        return config
    },error=>{
        Modal.confirm({
            title: '提示',
            content: '请求超时!',
        });
        return Promise.reject(error)
    }
)

//有的一个页面请求几个接口，当token过期或者账号被迫下线，避免出现多个弹窗，自定义cont，判断cont==0时候弹窗一次，然后cont++

// axios respone拦截器
Service.interceptors.response.use(
    res=>{
        if(res.status === 200){
            Modal.info({
                title: 'message',
                content: "Successful！",
            })
            return res;
        }
        return res;
    },
    error=>{
        const responseCode = error.response.status;
        switch (responseCode) {
            case 201:
                message.error('Created')
                break
            case 401:
                message.error('Unauthorized')
                break
            case 403:
                message.error('Forbidden')
                break
            case 404:
                message.error('Not Found')
                break
            default:
                Modal.confirm({
                    title: '提示',
                    content: `连接出错(${error.response.status})！`,
                });
        }
        return Promise.reject(error.response.data)
    }
)

export default Service;