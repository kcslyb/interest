import CsLoading from './src/plugin/createLoading'

/* istanbul ignore next */
CsLoading.install = function(Vue) {
    Vue.component(CsLoading.name, CsLoading)
}

export default CsLoading