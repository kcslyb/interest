import {QUERY_ROUTER, SET_ROUTER, SET_CURRENT_ROUTER, QUERY_CURRENT_ROUTER} from "../mutation-types";
import {routes} from "../../route";
import {useRoute} from "vue-router";

function initRouters(routers, commit) {
    const result = []
    routers.forEach(value => {
        if (value.meta) {
            value.meta.tags = value.meta.label
            initCurrentRoute(value, commit)
            let children = initRouters(value.children || [], commit)
            children = setChildren(children, value, commit)
            let firstChildrenName = ''
            if (children.length) {
                const [first] = children
                firstChildrenName = first.name
            }
            const {path, name, meta} = value
            result.push({path: `${path}${firstChildrenName}`, name, meta, children})
        }
    })
    return result
}

function setChildren(children, parent, commit) {
    const temps = []
    children.forEach(val => {
        if (parent.meta && parent.meta.next) {
            const path = `${parent.path}${val.path}`.replace('//', '/')
            const tags = [parent.meta.label, val.meta.label]
            temps.push({...val, meta: {...val.meta, path, tags}})
            initCurrentRoute(temps[temps.length - 1], commit)
        }
    })
    return temps
}

function initCurrentRoute(value, commit) {
    const route = useRoute()
    if (route && (route.path === value.meta.path || route.path === value.path)) {
        commit(`${SET_CURRENT_ROUTER}`, value)
    }
}

const router = {
    namespaced: true,
    state: () => ({
        current: {},
        routers: []
    }),
    mutations: {
        [SET_ROUTER](state, routers) {
            state.routers = routers
        },
        [SET_CURRENT_ROUTER](state, current) {
            state.current = current
        }
    },
    actions: {
        [QUERY_ROUTER]({commit, state}) {
            if (state.routers.length === 0) {
                const routers = initRouters(routes, commit)
                commit(`${SET_ROUTER}`, routers)
            }
        }
    },
    getters: {
        [QUERY_ROUTER]: (state) => {
            return state.routers
        },
        [QUERY_CURRENT_ROUTER]: (state) => {
            return state.current
        }
    }
}

export default router