import {createRouter, createWebHashHistory} from "vue-router"

const home = () => import("../components/Home.vue")

export const routes = [
    {
        path: "/",
        redirect: "/home"
    }, {
        path: "/home",
        name: "home",
        component: home,
    }, {
        path: "/components",
        name: "ComponentsLabel",
        meta: {label: '组件'},
        component: home,
        children: [
            {
                path: "/components/LabelExample",
                name: "LabelExample",
                meta: {label: '标签示例'},
                component: () => import("../components/view/example/LabelExample.vue")
            }
        ]
    }, {
        path: "/components",
        name: "ComponentsButton",
        meta: {label: '组件'},
        component: home,
        children: [
            {
                path: "/components/ButtonExample",
                name: "ButtonExample",
                meta: {label: '按钮示例'},
                component: () => import("../components/view/example/ButtonExample.vue")
            }
        ]
    }, {
        path: "/components",
        name: "ComponentsTree",
        meta: {label: '组件'},
        component: home,
        children: [
            {
                path: "/components/TreeExample",
                name: "TreeExample",
                meta: {label: '树结构示例'},
                component: () => import("../components/view/example/TreeExample.vue")
            }
        ]
    }, {
        path: "/404",
        name: "notFount",
        component: () => import("../components/view/404.vue")
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})