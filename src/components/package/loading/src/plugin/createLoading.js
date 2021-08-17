import {reactive, toRefs, createVNode, render} from "vue";
import CsLoading from '../CsLoading.vue'
import {animationOpacityClose, animationOpacityShow} from "../../../../lib/opacity-utils";

export default function createLoading(params) {
    let vm = null

    const temp = Object.assign({timeout: 50, show: true}, params)

    const data = reactive({
        ...temp,
    })

    function destroyDom() {
        const { timeout } = temp
        const parentNode = vm.el.parentNode
        animationOpacityClose(parentNode, parentNode.parentNode, timeout)
    }

    function close() {
        data.show = false
        destroyDom()
    }

    const componentSetupConfig = {
        ...toRefs(data),close,
    }

    vm = createVNode(CsLoading, {...data})
    const div = document.createElement('div')
    const body = document.body
    body.appendChild(div)
    render(vm, div)
    vm.el.style.opacity = 0
    const { timeout } = temp
    animationOpacityShow(div, timeout)

    return {
        ...componentSetupConfig,
        vm,
        get $el() {
            return vm.el
        },
    }
}