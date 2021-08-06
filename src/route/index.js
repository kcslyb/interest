import {createRouter, createWebHashHistory} from "vue-router"

const home = () => import("../components/Home.vue")

export const routes = [
    {
        path: "/",
        redirect: "/components/IndexExample"
    }, {
        path: "/components",
        name: "componentsIndex",
        component: home,
        children: [
            {
                path: "/components/IndexExample",
                name: "IndexExample",
                meta: {label: '树结构示例'},
                component: () => import("../components/view/example/IndexExample.vue")
            }
        ]
    // }, {
    //     path: "/components/music",
    //     name: "music",
    //     meta: {label: 'music'},
    //     component: () => import("../components/view/music/index.vue")
        // component: home,
        // children: [
        //     {
        //         path: "/components/music",
        //         name: "musicIndex",
        //         meta: {label: 'music'},
        //         component: () => import("../components/view/music/index.vue")
        //     }
        // ]
    }, {
        path: "/components/IndexExample",
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
        path: "/components",
        name: "ComponentsTable",
        meta: {label: '组件'},
        component: home,
        children: [
            {
                path: "/components/TableExample",
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

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})