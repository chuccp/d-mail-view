import request from "@/util/request";
import type {SetInfo, System} from "@/interface/System";


export async function getSet() {
    const vv = await request({url: "/set"})
    return vv.data as System
}

export async function putSet(setInfo: SetInfo) {
    const vv = await request({url: "/set", method: 'put', data: setInfo})
    return vv.data as System
}

export async function putReSet(setInfo: SetInfo) {
    const vv = await request({url: "/reSet", method: 'put', data: setInfo})
    return vv.data as System
}

export async function getDefaultSet() {
    const vv = await request({url: "/defaultSet"})
    return vv.data as SetInfo
}

export async function readSet() {
    const vv = await request({url: "/readSet"})
    return vv.data as SetInfo
}

export async function testConnection(setInfo: SetInfo) {
    const vv = await request({url: "/testConnection",method: 'post', data: setInfo})
    return vv.data as string
}