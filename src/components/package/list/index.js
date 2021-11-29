import CsList from './src/CsList'

/* istanbul ignore next */
CsList.install = function(Vue) {
    Vue.component('CsList', CsList)
}

export default CsList