import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import AdminView from '../views/AdminView.vue'
import SettingView from '../views/SettingView.vue'
import {getSet} from "@/api/set";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'admin',
            component: AdminView,
            children: [
                {
                    path: '/smtp',
                    redirect: "",
                    children: [{
                        path: '',
                        name: 'smtp',
                        component: () => import('../views/smtp/IndexView.vue')
                    }, {
                        path: 'add',
                        name: 'smtp-add',
                        component: () => import('../views/smtp/AddView.vue')
                    }, {
                        path: 'edit/:id',
                        name: 'smtp-edit',
                        component: () => import('../views/smtp/AddView.vue')
                    }]
                },
                {
                    path: '/mail',
                    redirect: "",
                    children: [{
                        path: '',
                        name: 'mail',
                        component: () => import('../views/mail/IndexView.vue')
                    }, {
                        path: 'add',
                        name: 'mail-add',
                        component: () => import('../views/mail/AddView.vue')
                    }, {
                        path: 'edit/:id',
                        name: 'mail-edit',
                        component: () => import('../views/mail/AddView.vue')
                    }]
                },
                {
                    path: '/token',
                    redirect: "",
                    children: [{
                        path: '',
                        name: 'token',
                        component: () => import('../views/token/IndexView.vue')
                    }, {
                        path: 'add',
                        name: 'token-add',
                        component: () => import('../views/token/AddView.vue')
                    }, {
                        path: 'edit/:id',
                        name: 'token-edit',
                        component: () => import('../views/token/AddView.vue')
                    }]
                }
            ],
        },
        {
            path: '/setting',
            name: 'setting',
            component: SettingView
        }

    ]
})

let hasInit = false;

router.beforeEach(async (to, from, next) => {
    if (!hasInit || to.path=="/") {
        hasInit = true;
        const info = await getSet()
        if(info.hasInit){
            next()
        }else{
            next('/setting')
        }
    } else {
        next()
    }
})

export default router
