import axios from 'axios'
import { Message, MessageBox } from 'element-ui'


import { getToken } from '@/utils/auth'
import store from '../store'


// 创建axios实例
let service =  axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    if (store.getters.token) {        
        config.headers = {
            'Authorization' : "Token " + getToken('Token'), //携带权限参数
        };
    }
    return config
    }, error => {
    // Do something with request error
    console.log('request拦截器过程出错',error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
    /**
    * 下面的注释为通过response自定义code来标示请求状态，
    * 当code返回如下情况为权限有问题，登出并返回到登录页
    */
        const res = response.data;
        if (res.code !== 200) {
            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            });
           // 根据服务端约定的状态码：5001:非法的token; 5002:其他客户端登录了; 5004:Token 过期了;
            if (res.code === 5001 || res.code === 5002 || res.code === 5004) {

                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('LogOut').then(() => {
                      location.reload()// 为了重新实例化vue-router对象 避免bug
                    })
                }).catch(() => {
                    // on cancel
                    console.log('err' + error)// for debug
                });
            }
            return Promise.reject('error');
        } else {
            return response.data;
        }
    },
    error => {
        console.log('err' + error)// for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
    
export default service