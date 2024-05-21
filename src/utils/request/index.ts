import axios from 'axios';
import { errorCodeType } from './error';
import { getToken } from "./auth";
import { saveAs } from "file-saver";
import JSONBIG from 'json-bigint';
import { tansParams } from './params';
import { message as Msg } from 'antd';
axios.defaults.transformResponse = [
    function (data) {
        if (data instanceof Blob) {
            return data
        } else {
            const json = JSONBIG({
                storeAsString: true
            })
            const res = json.parse(data)
            return res
        }
    }
]

// 创建axios实例
const service = axios.create({
    // 服务接口请求
    baseURL: import.meta.env.VITE_APP_DEV_URL,
    // 超时设置(当timeout为0时，则无限等待)
    timeout: 1000,
    // headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// 请求拦截
service.interceptors.request.use(config => {
    // 是否需要设置 token放在请求头
    const isToken = (config.headers || {}).isToken === false;
    // const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;

    if (getToken() && !isToken) {
        // config.headers["Authorization"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
        config.headers["token"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (config.method === "get" && config.params) {
        let url = config.url + "?" + tansParams(config.params);
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((res) => {
    // hideLoading()
    // 未设置状态码则默认成功状态
    // const code = res.data['code'] || 200;
    const code = res['status'] || 200;
    // 获取错误信息
    const msg = errorCodeType(code) || res.data['msg'] || errorCodeType('default')
    if (
        res.request.responseType === "blob" ||
        res.request.responseType === "arraybuffer"
    ) {
        return res.data;
    }
    if (code === 200) {
        return Promise.resolve(res.data)
    } else {
        Msg.error(msg);
        return Promise.reject(res.data)
    }

},
    error => {
        console.log('err' + error)
        // hideLoading()
        let { message } = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        }
        else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        }
        else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        Msg.error(message);
        return Promise.reject(error)
    }
)
export function download(url: string, params: any) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: "post",
            data: params,
            headers: {
                // 'Content-Type': 'application/octet-stream'
                // 'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: "blob"
        }).then(res => {
            const blob = new Blob([res.data]);
            saveAs(blob, '结果导出.zip');
            resolve(res)
        }).catch(err => {
            console.log(err);
            Msg.error("下载文件出现错误")
            reject(err);
        })
    })
}

export default service;