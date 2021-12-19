<template>
  <div>
    <div id="editor">
      <p></p>
    </div>
  </div>
</template>

<script setup>
import Quill from 'quill'
import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import "quill/dist/quill.bubble.css"
import {defineProps, nextTick, useAttrs} from "vue"

const props = defineProps({
  showToolbar: {
    type: Boolean,
    default: true
  },
  readOnly: {
    type: Boolean,
    default: true
  },
  theme: {
    type: String,
    default: 'snow'
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  contents: {
    type: String,
    default: '{"ops":[{"insert":"javascript"},{"attributes":{"code-block":true},"insert":"\\n"}]}'
  },
  toolbarOptions: {
    type: Array,
    default: [
      ['bold', 'italic', 'underline', 'strike', {'color': []}, {'background': []}],
      ['blockquote', 'code-block', {'header': 1}, {'header': 2}],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'indent': '-1'}, {'indent': '+1'}, {'direction': 'rtl'}, {'align': []}],
      [{'size': ['small', false, 'large', 'huge']}, {'header': [1, 2, 3, 4, 5, 6, false]}, {'font': []}],
      ['clean']
    ]
  },
})

const attrs = useAttrs()

const initData = () => {
  const editor = new Quill('#editor', {
    modules: {toolbar: props.toolbarOptions},
    placeholder: props.placeholder,
    readOnly: props.readOnly,
    theme: props.theme,
  })
  const content = props.contents ? JSON.parse(props.contents) : {}
  editor.setContents(content)
  editor.on('text-change', () => {
    const temp = editor.getContents()
    handleChange(JSON.stringify(temp))
  })
}

const emits = defineEmits(['update:modelValue'])

const handleChange = (value) => {
  emits('update:modelValue', value)
}

nextTick(() => {
  initData()
})
</script>

<style scoped lang="less">
.ql-toolbar.ql-snow {
  height: 0;
  padding: 0;
  overflow: hidden;
  border: none;
  border-bottom: 1px solid #ccc;
}
</style>