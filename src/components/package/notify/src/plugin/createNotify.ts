import {reactive, render, h} from 'vue'
import CsNotify from '../CsNotify.vue'
import {animationOpacityClose, animationOpacityShow} from '../../../../lib/opacity-utils'
import ZIndexManage from '../../../../lib/zIndex'

type notifyOptions = {
    msg: string,
    title?: string,
    timeout?: number,
    type?: 'default' | 'error' | 'warning'
}

export function createNotify(params: notifyOptions) {
    const defaultData = {
        show: false,
        title: '提示！',
        timeout: 50,
    }

    let timer = null
    const zIndex = ZIndexManage.getInstance().index
    try {
        console.info(zIndex)
        const temp = {...defaultData, ...params}
        const data = reactive({
            ...temp,
            zIndex: zIndex
        })

        // @ts-ignore
        function close() {
            data.show = false
            const {timeout} = temp
            const parentNode = vm.el.parentNode
            animationOpacityClose(parentNode, parentNode.parentNode, timeout)
        }

        // @ts-ignore
        function mouseOver() {
            clearTimeout(timer)
        }

        // @ts-ignore
        function mouseLeave() {
            timer = setTimeout(() => {
                close()
            }, 2000)
        }

        const vm = h(CsNotify, {
            ...data,
            onClose: () => {
                close()
            },
            onMouseOver: () => {
                mouseOver()
            },
            onMouseLeave: () => {
                mouseLeave()
            }
        })
        const div = document.createElement('div')
        const body = document.body
        body.appendChild(div)
        render(vm, div)
        vm.el.style.opacity = 0
        const {timeout} = temp
        animationOpacityShow(div, timeout)
        mouseLeave()
    } catch (e) {
        console.error(e)
    }
}