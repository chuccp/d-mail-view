import request from "@/util/request"
import type {Page, SMTP} from "@/interface/System";

export async function fetchList(pageNo: Number, pageSize: Number) {

    const vv = await request({
        url: "/smtp", params: {
            pageNo: pageNo,
            pageSize: pageSize
        }
    })
    return vv.data as (Page<SMTP>)
}

export async function fetchSMTPList(pageNo: Number, pageSize: Number) {
    return fetchList(pageNo, pageSize)
}

export async function getSMTP(id: number | string | string[]) {
    const vv = await request({
        url: "/smtp/" + id
    })
    return vv.data as SMTP
}

export async function deleteSMTP(id: number | string | string[]) {
    const vv = await request({
        url: "/smtp/" + id, method: 'delete'
    })
    return vv.data
}

export async function postSMTP(SMTP: SMTP) {
    const vv = await request({url: "/smtp", method: 'post', data: SMTP})
    return vv.data
}

export async function putSMTP(SMTP: SMTP) {
    const vv = await request({url: "/smtp", method: 'put', data: SMTP})
    return vv.data
}
export async function testSMTP(SMTP: SMTP) {
    const vv = await request({url: "/test", method: 'post', data: SMTP})
    return vv.data as string
}