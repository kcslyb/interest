<template>
  <div class="dialog-container" :style="dialogStyleC" v-if="props.show">
    <div class="dialog-body" :style="bodyStyleC">
      <slot name="body">
        <div class="body">
          <div class="body-title">
            <slot name="body-title">
              <div class="title">
                <span class="title-text">{{props.title}}</span>
                <span class="title-icon" @click.stop="handleClose">X</span>
              </div>
            </slot>
          </div>
          <div class="body-content cs-scrollbar">
            <slot></slot>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import {computed, defineProps} from "vue";
import ZIndexManage from "../../../lib/zIndex";
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 70
  },
  bodyStyle: {
    type: Object,
    default: () => {
    }
  },
  dialogStyle: {
    type: Object,
    default: () => {
    }
  },
  btnList: {
    type: Object,
    default: () => {
      return [
        {
          type: 'primary',
          action: 'confirm',
          label: '确认'
        }, {
          type: 'text',
          action: 'cancel',
          label: '取消'
        }
      ]
    }
  }
})
const bodyStyleC = computed(() => {
  const instance = ZIndexManage.getInstance()
  const temp = {
    width: `${props.width}%`,
    zIndex: instance.index
  }
  return Object.assign(temp, props.bodyStyle)
})
const dialogStyleC = computed(() => {
  const instance = ZIndexManage.getInstance()
  const temp = {
    zIndex: instance.index
  }
  return Object.assign(temp, props.dialogStyle)
})

const emits = defineEmits(['on-click', 'on-close'])
const handleClick = (item) => {
  emits('on-click',item)
}
const handleClose = () => {
  emits('on-close')
}

</script>

<style scoped lang="less">
.dialog-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.3);

  .dialog-body {
    height: auto;
    max-height: 70%;
    text-align: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: white;

    .body {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      color: @default-color;

      .body-title {
        height: 50px;
        border-bottom: 1px solid @border-color;
        .title {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          padding: 0 20px;
          line-height: 50px;
          .title-text {
            font-weight: bold;
          }
          .title-icon {
            cursor: pointer;

            &:hover {
              color: @primary-color;
            }
          }
        }
      }

      .body-content {
        flex: auto;
        width: 100%;
        overflow: auto;
      }

      .body-footer {
        height: 50px;
        line-height: 50px;
        border-top: 1px solid @border-color;
      }
    }
  }
}
</style>