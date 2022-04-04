import CsList from './src/CsList.vue'

/* istanbul ignore next */
CsList.install = function(Vue) {
    Vue.component('cs-list', CsList)
}

export default CsList