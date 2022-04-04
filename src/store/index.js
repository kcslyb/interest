import {createStore} from 'vuex'

const modules = {}

const requireContext = import.meta.globEager('./module/*.js')
const requireContextTs = import.meta.globEager('./module/*.ts')
const context = {...requireContext, ...requireContextTs}
Object.keys(context).forEach(path => {
    if ( context[path].default) {
        const key = path.match(/(\w+)\.[js|ts]/)[1]
        modules[key] = context[path].default
    }
})

// 创建一个新的 store 实例
const store = createStore({
    modules
})

export default store