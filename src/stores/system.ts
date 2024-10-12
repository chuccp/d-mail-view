import {defineStore} from "pinia";
import type {System} from "@/interface/System";
import {ref} from "vue";

export const useSystem = defineStore('useSystem', () => {
    const system = ref<System>({hasInit: false, hasLogin: false,isInit:false,port:12566})
    return {system}
})