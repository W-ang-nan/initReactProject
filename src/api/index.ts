import request from "../utils/request";

export function userLogin(data: any) {
    return request({
        url: "/cevas/auth/login",
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}

export function userRegister(data: any) {
    return request({
        url: "/cevas/auth/register",
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}

export function getMinMaxData(data: any) {
    return request({
        url: "cevas/result/getMaxMinValue",
        method: "get",
        params: data
    })
}