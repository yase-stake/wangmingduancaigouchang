import axios from "axios";
import router from '@/router'
// 创建一个axios实例
let $axios = axios.create({
    // baseURL: "http://localhost:3306/api",
    baseURL:"/api",
    timeout: 3000
})

$axios.interceptors.request.use(function (config) {
    if (config.url == "/userlogin") {
        return config
    } else {
        let userinfo = JSON.parse(localStorage.getItem("userinfo"))
        config.headers.authorization = userinfo.token;
        return config;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
$axios.interceptors.response.use(function (response) {
    if (response.data.code == 403) {
        router.push('/login')
        return response.data; 
    } else {
         return response.data; 
    }
  
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});



// 暴露axios实例！
export default $axios;