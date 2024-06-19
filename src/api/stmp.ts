import request from "@/util/request"
import type {Page, STMP} from "@/interface/System";

export async function fetchList(pageNo: Number, pageSize: Number) {

    const vv = await request({
        url: "/stmp", params: {
            pageNo: pageNo,
            pageSize: pageSize
        }
    })
    return vv.data as (Page<STMP>)
}

export async function fetchSTMPList(pageNo: Number, pageSize: Number) {
    return fetchList(pageNo, pageSize)
}

export async function getSTMP(id: number | string | string[]) {
    const vv = await request({
        url: "/stmp/" + id
    })
    return vv.data as STMP
}

export async function deleteSTMP(id: number | string | string[]) {
    const vv = await request({
        url: "/stmp/" + id, method: 'delete'
    })
    return vv.data
}

export async function postSTMP(STMP: STMP) {
    const vv = await request({url: "/stmp", method: 'post', data: STMP})
    return vv.data
}

export async function putSTMP(STMP: STMP) {
    const vv = await request({url: "/stmp", method: 'put', data: STMP})
    return vv.data
}
export async function testSTMP(STMP: STMP) {
    const vv = await request({url: "/test", method: 'post', data: STMP})
    return vv.data as string
}