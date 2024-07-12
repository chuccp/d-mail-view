import request from "@/util/request"
import md5 from 'crypto-js/md5';
import {saveLogin} from "@/util/localStore";


export interface AuthInfo {
    Nonce: string

}

export async function getSignIn() {
    const vv = await request({
        url: "/signIn"
    })
    return vv.data as AuthInfo
}

export async function postSignIn(sign: string, Username: string, Nonce: string) {
    const vv = await request({
        url: "/signIn", method: 'post', data: {Response: sign, Username: Username, Nonce: Nonce}
    })
    return vv.data
}


export async function signIn(username: string, password: string) {
    return getSignIn().then((v) => {
        const sign = md5(md5(md5(password).toString() + username).toString() + v.Nonce).toString()
        return postSignIn(sign, username, v.Nonce).then(v2 => {
            saveLogin(v.Nonce)
            return v2
        });
    })
}