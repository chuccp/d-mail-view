import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import AdminView from '../views/AdminView.vue'
import SettingView from '../views/SettingView.vue'
import SignInView from '../views/SignInView.vue'
import {getSet} from "@/api/set";
import {useSystem} from "@/stores/system"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'admin',
            component: AdminView,
            redirect: "",
            children: [
                {
                    path: '',
                    component: () => import('../views/HomeView.vue'),
                },
                {
                    path: 'log',
                    component: () => import('../views/log/IndexView.vue'),
                },
                {
                    path: 'log/:id',
                    component: () => import('../views/log/showView.vue'),
                },
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
        },
        {
            path: '/signIn',
            name: 'signIn',
            component: SignInView
        }

    ]
})


router.beforeEach(async (to, from, next) => {
    const {system} = useSystem();
    if (!system.isInit) {
        const info = await getSet()
        system.isInit = true
        system.hasInit = info.hasInit
        system.hasLogin = info.hasLogin
    }
    if (!system.hasInit) {
        if (to.path != '/setting') {
            next('/setting')
        } else {
            next()
        }
    } else if(!system.hasLogin){
        if (to.path != '/signIn') {
            next('/signIn')
        } else {
            next()
        }
    }else{
        next()
    }

    // if(system.hasInit){
    //     next()
    // }else{
    //     const info = await getSet()
    //     system.hasInit = info.hasInit;
    //     console.log(to.path)
    //     if(!system.hasInit){
    //         next('/setting')
    //     }else{
    //         next()
    //     }
    // }

    // if (!system.hasInit || (!system.hasLogin && to.path!='/signIn' ) ||  to.path=="/") {
    //     const info = await getSet()
    //     if(info.hasInit){
    //         system.hasInit = true;
    //         if(info.hasLogin){
    //             system.hasLogin = true
    //             next()
    //         }else{
    //             next('/signIn')
    //         }
    //     }else{
    //         next('/setting')
    //     }
    // } else {
    //     next()
    // }
})

export default router
