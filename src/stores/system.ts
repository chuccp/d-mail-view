import {defineStore} from "pinia";
import type {System} from "@/interface/System";
import {ref} from "vue";

export const useSystem = defineStore('useSystem', () => {
    const system = ref<System>({hasInit: false, hasLogin: false})

    function updateHasInit(hasInit: boolean) {
        system.value.hasInit = hasInit
    }

    function updateHasLogin(hasLogin: boolean) {
        system.value.hasLogin = hasLogin
    }

    return {system, updateHasInit, updateHasLogin}

})