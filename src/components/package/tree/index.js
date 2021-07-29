import CsTree from './src/CsTree.vue'

/* istanbul ignore next */
CsTree.install = function(Vue) {
    Vue.component(CsTree.name, CsTree)
}

export default CsTree