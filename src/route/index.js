import {createRouter, createWebHistory} from "vue-router"
import createLoading from "../components/package/loading/src/plugin/createLoading";
import {QUERY_ACCOUNT} from "../store/mutation-types";
import store from "../store";

const home = () => import("../components/Home.vue")

export const routes = [
    {
        path: "/",
        name: "index",
        meta: {label: '学习日志'},
        component: () => import("../view/index.vue")
    }, {
        path: "/login",
        name: "login",
        component: () => import("../view/system/account/login.vue")
    }, {
        path: "/interest/",
        name: "storage",
        meta: {label: '本地存储', next: true},
        component: () => import("../view/head.vue"),
        children: [
            {
                path: "home",
                name: "home",
                meta: {label: '首页', index: true},
                component: () => import("../view/system/home.vue")
            }, {
                path: "account",
                name: "account",
                meta: {label: '账号管理'},
                component: () => import("../view/system/account/account.vue")
            }
        ]
    }, {
        path: "/components/",
        name: "components",
        meta: {label: '组件', next: true},
        component: home,
        children: [
            {
                path: "IndexExample",
                name: "IndexExample",
                meta: {label: '示例首页'},
                component: () => import("../components/view/example/IndexExample.vue")
            },
            {
                path: "LabelExample",
                name: "LabelExample",
                meta: {label: '标签示例'},
                component: () => import("../components/view/example/LabelExample.vue")
            },
            {
                path: "ButtonExample",
                name: "ButtonExample",
                meta: {label: '按钮示例'},
                component: () => import("../components/view/example/ButtonExample.vue")
            },
            {
                path: "TreeExample",
                name: "TreeExample",
                meta: {label: '树结构示例'},
                component: () => import("../components/view/example/TreeExample.vue")
            },
            {
                path: "TableExample",
                name: "TableExample",
                meta: {label: '表格示例'},
                component: () => import("../components/view/example/TableExample.vue")
            }
        ]
    }, {
        path: "/404",
        name: "notFount",
        component: () => import("../components/view/404.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

let loading = null
const whiteList = ['/login', '/test', '/']
router.beforeEach((to, from, next) => {
    loading = createLoading({})
    if (to.matched.length !== 0) {
        const accountInfo = store.getters[`account/${QUERY_ACCOUNT}`]
        if (Object.keys(accountInfo).length || whiteList.includes(to.path)) {
            closeLoading(loading)
            next()
        } else {
            store.dispatch(`account/${QUERY_ACCOUNT}`).then(() => {
                next()
            }).catch(() => {
                next({path: '/login'})
            }).finally(() => {
                closeLoading(loading)
            })
        }

    } else {
        next({path: '/404'})
        closeLoading(loading)
    }
})

function closeLoading(loading) {
    setTimeout(() => {
        loading.close()
    }, 500)
}

export default router
