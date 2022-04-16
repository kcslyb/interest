import CsTouch from './src/CsTouch.vue'

/* istanbul ignore next */
CsTouch.install = function(Vue) {
    Vue.component('cs-touch', CsTouch)
}

export default CsTouch