import request from "@/util/request"
import type {Page, Mail} from "@/interface/System";

export async function fetchList(pageNo: Number, pageSize: Number) {

    const vv = await request({
        url: "/mail", params: {
            pageNo: pageNo,
            pageSize: pageSize
        }
    })
    return vv.data as (Page<Mail>)
}
export async function fetchMailList(pageNo: Number, pageSize: Number){
    return fetchList(pageNo,pageSize)
}
export async function getMail(id: number | string | string[]) {
    const vv = await request({
        url: "/mail/" + id
    })
    return vv.data as Mail
}

export async function deleteMail(id: number | string | string[]) {
    const vv = await request({
        url: "/mail/" + id, method: 'delete'
    })
    return vv.data
}

export async function postMail(mail: Mail) {
    const vv = await request({url: "/mail", method: 'post', data: mail})
    return vv.data
}

export async function putMail(mail: Mail) {
    const vv = await request({url: "/mail", method: 'put', data: mail})
    return vv.data
}