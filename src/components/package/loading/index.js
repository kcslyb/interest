import CsLoading from './src/CsLoading.vue'

/* istanbul ignore next */
CsLoading.install = function(Vue) {
    Vue.component('cs-loading', CsLoading)
}

export default CsLoading