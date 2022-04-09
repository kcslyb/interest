import CsBox from './src/CsBox.vue'

/* istanbul ignore next */
CsBox.install = function(Vue) {
    Vue.component('cs-box', CsBox)
}

export default CsBox