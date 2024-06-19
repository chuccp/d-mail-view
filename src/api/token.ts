import request from "@/util/request"
import type {Page, Token} from "@/interface/System";

export async function fetchList(pageNo: Number, pageSize: Number) {

    const vv = await request({
        url: "/token", params: {
            pageNo: pageNo,
            pageSize: pageSize
        }
    })
    return vv.data as (Page<Token>)
}

export async function getToken(id: number | string | string[]) {
    const vv = await request({
        url: "/token/" + id
    })
    return vv.data as Token
}

export async function deleteToken(id: number | string | string[]) {
    const vv = await request({
        url: "/token/" + id, method: 'delete'
    })
    return vv.data
}

export async function postToken(token: Token) {
    const vv = await request({url: "/token", method: 'post', data: token})
    return vv.data
}

export async function putToken(token: Token) {
    const vv = await request({url: "/token", method: 'put', data: token})
    return vv.data
}