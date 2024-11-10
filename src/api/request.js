import axios from 'axios'
import { ElMessage } from 'element-plus'
import config from '@/config';
import { mock } from 'mockjs';

const service = axios.create( {
    baseURL: config.baseApi
} );
const NETWORK_ERROR = '网络错误...'
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(
    (res) => {
        const { data, code, msg } = res.data
        if ( code === 200 ) {
            return data
        } else {
            const NETWORK_ERROR = '网络错误...'
            ElMessage.error( msg || NETWORK_ERROR )//ElMessage.error() 是 Element UI 库中的一个方法，用于显示一个错误消息提示。
            return Promise.reject( msg || NETWORK_ERROR )//Promise.reject() 方法用于返回一个以拒绝（rejected）状态结束的 Promise 对象。
            //return：将这个拒绝的 Promise 返回给调用者。
        }
    }
);

function request( options ) {
    options.method = options.method || 'get'
    //关于get请求参数的调整
    if ( options.method.toLowerCase() === 'get' ) {
        options.params = options.data
    }
    //对mock的开关做一个处理
    let isMock = config.mock
    if ( typeof options.mock !== 'undefined' ) {
        isMock = options.mock
    }
    //针对环境做一个处理
    if ( config.env === 'prod' ){
        //不能用mock
        service.defaults.baseURL = config.baseApi
    }else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }

    return service( options )
}

export default request