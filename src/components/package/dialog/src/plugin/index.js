// src/components/package/dialog/src/index.js

import {reactive, render, h} from 'vue'
import CsDialog from '../CsDialog.vue'
import {animationOpacityClose, animationOpacityShow} from "../../../../lib/opacity-utils";
import {typeJudge} from "../../../../lib/utils";

export default {
    install: (app) => {
        app.config.globalProperties.$csDialog = (params, slots = {}) => {
            return createDialog(params, slots)
        }
        const defaultData = {
            width: 50,
            timeout: 50,
            bodyStyle: {
                height: 'auto',
                maxHeight: '50%'
            }
        }

        function createDialog(params, slots) {
            return new Promise(
                (resolve, reject) => {
                    try {
                        const temp = Object.assign(defaultData, params)
                        const data = reactive({
                            ...temp,
                            show: true
                        })

                        function close(callback) {
                            const { timeout } = temp
                            const parentNode = vm.el.parentNode
                            animationOpacityClose(parentNode, parentNode.parentNode, timeout, () => {
                                data.show = false
                                console.info('start run callback')
                                callback && typeJudge(callback) ==='Function' && callback()
                            })
                        }

                        const vm = h(CsDialog, {
                            ...data,
                            onOnClose: (callback) => {
                                console.info('CsDialog will close')
                                close(callback)
                            }
                        }, {...slots})
                        const div = document.createElement('div')
                        const body = document.body
                        body.appendChild(div)
                        render(vm, div)
                        setTimeout(() => {
                            vm.el.style.opacity = 0
                            const { timeout } = temp
                            animationOpacityShow(div, timeout)
                            const proxy = vm.component.proxy
                            resolve(proxy)
                        }, 0)
                    } catch (e) {
                        reject(e)
                    }
                }
            )
        }
    }
}