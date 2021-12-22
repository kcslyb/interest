import {createStore} from 'vuex'

const modules = {}

const requireContext = import.meta.globEager('./module/*.js')
Object.keys(requireContext).forEach(path => {
    if ( requireContext[path].default) {
        const key = path.match(/(\w+)\.js/)[1]
        modules[key] = requireContext[path].default
    }
})

// 创建一个新的 store 实例
const store = createStore({
    modules
})

export default store