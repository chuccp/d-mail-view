import {useLocalStorage} from '@vueuse/core'

export function saveLogin(nonce: string) {
    useLocalStorage("mail-login", "").value = nonce
}

export function getLogin(): string {
    return useLocalStorage("mail-login", "").value
}

export function deleteLogin(): string {
    return useLocalStorage("mail-login", "").value = ""
}