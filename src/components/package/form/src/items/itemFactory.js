import {h} from "vue";
import CsInput from "./CsInput.vue";
import CsRadio from "./CsRadio.vue";
import CsTextarea from "./CsTextarea.vue";
import CsCheckbox from "./CsCheckbox.vue";
import {hasNotProperty, hasProperty} from "../../../../lib/utils";
export default function itemFactory(modelValue, props) {
    const type = props.type || ''
    if (hasNotProperty(process, type)) {
        throw new TypeError(`CsForm: not found property ${type}`)
    }
    return process[type](modelValue, props)
}

const process = {
    input: (modelValue, props) => {
        return h(CsInput, {
            ...props,
            modelValue: modelValue[props.prop],
            'onUpdate:modelValue': (val) => modelValue[props.prop] = val
        })
    },
    textarea: (modelValue, props) => {
        return h(CsTextarea, {
            ...props,
            modelValue: modelValue[props.prop],
            'onUpdate:modelValue': (val) => modelValue[props.prop] = val
        })
    },
    radio: (modelValue, props) => {
        return h(CsRadio, {
            ...props,
            modelValue: modelValue,
            'onUpdate': (val) => Object.assign(modelValue, val)
        })
    },
    checkbox: (modelValue, props) => {
        return h(CsCheckbox, {
            ...props,
            modelValue: modelValue,
            'onUpdate': (val) =>Object.assign(modelValue, val)
        })
    }
}