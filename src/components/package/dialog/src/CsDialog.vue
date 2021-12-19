<template>
  <div class="dialog-container" :style="dialogStyleC" v-if="props.show">
    <div class="dialog-body animate__animated animate__backInDown" :style="bodyStyleC">
      <slot name="body">
        <div class="body">
          <div class="body-title">
            <slot name="body-title">
              <div class="title cs-deep-background-color">
                <span class="title-text">{{ props.title }}</span>
                <span v-if="props.showClose" class="title-icon" @click.stop="handleClose">×</span>
              </div>
            </slot>
          </div>
          <div class="body-content cs-scrollbar">
            <slot name="default"></slot>
          </div>
          <div class="body-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import {computed, defineProps, getCurrentInstance, reactive, ref} from "vue";
import ZIndexManage from "../../../lib/zIndex";

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  showClose: {
    type: Boolean,
    default: true
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
  emits('on-click', item)
}
const handleClose = (callback) => {
  emits('on-close', callback)
}

</script>

<style scoped lang="less">
.dialog-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);

  .dialog-body {
    height: auto;
    max-height: 70%;
    text-align: center;
    position: absolute;
    top:40%;
    left:50%;
    transform:translate(-50%,-40%);
    margin: 0 auto;
    background-color: @background-color;
    border-radius: 5px;

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
          align-items: center;
          font-size: 16px;
          padding: 10px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          height: 50px;
          box-sizing: border-box;

          .title-text {
            font-weight: bold;
          }

          .title-icon {
            cursor: pointer;
            font-size: 24px;
            line-height: 20px;
            padding: 0 5px;
            display: block;

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
      }
    }
  }
}
</style>