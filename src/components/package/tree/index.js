import CsTree from './src/CsTree.vue'

/* istanbul ignore next */
CsTree.install = function(Vue) {
    Vue.component('cs-tree', CsTree)
}

export default CsTree