<template>
  <div class="drag-box">
    <div
      :class="{ 'drag-item': true, moving: startIndex === index }"
      :draggable="draggable"
      :key="`drag-item-${index}-${item}`"
      v-for="(item, index) in data"
      @dragstart="handleDragStart(index)"
      @dragover="handleDragover(index)"
      @dragend="handleDragend"
    >
      <slot name="content"> {{ item }} - item </slot>
    </div>
    <div class="comment-2">
      <input class="comment-content" v-model="comment" />
      <div class="comment-btn">send</div>
    </div>
    <div class="comment">
      <input class="comment-content" v-model="comment" />
      <div class="comment-btn">send</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

withDefaults(
  defineProps<{
    draggable?: boolean;
  }>(),
  {
    draggable: true,
  }
);

const data = defineModel<string[]>({ default: [1, 2, 3], required: false });

const comment = ref<string>('');

const startIndex = ref<number>(-1);
const endIndex = ref<number>(-1);
const handleDragStart = (index: number) => {
  startIndex.value = index;
};

const handleDragend = () => {
  const dragData = data.value[startIndex.value];
  data.value.splice(startIndex.value, 1);
  data.value.splice(endIndex.value, 0, dragData);
  startIndex.value = -1;
  endIndex.value = -1;
};

const handleDragover = (index: number) => {
  endIndex.value = index;
};
</script>

<style scoped lang="less">
.drag-box {
  .drag-item {
    padding: 2rem;
    border: 0.1rem solid #ccc;
    background-color: #626aef;
    border-radius: 0.4rem;

    & + .drag-item {
      margin-top: 1.2rem;
    }

    &.moving {
      border: 1px dashed #ccc;
      transition: none;
    }
  }
}

.comment,
.comment-2 {
  &:not(.comment-2) {
    position: absolute;
    bottom: 0;
  }

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  box-sizing: border-box;

  .comment-content {
    flex: 1;
    box-sizing: border-box;
    outline: none;
    border-radius: 0.4rem;
    padding: 0 0.8rem;
    line-height: 3.2rem;
    height: 3.2rem;
    --el-input-inner-height: calc(var(--el-input-height, 32px) - 2px);
    -webkit-appearance: none;
    background: none;
    border: 1px solid var(--el-input-border-color, var(--el-border-color));
    color: var(--el-input-text-color, var(--el-text-color-regular));
    width: 100%;
  }

  .comment-btn {
    box-sizing: border-box;
    border-radius: 0.4rem;
    padding: 0.8rem;
    line-height: 1.6rem;
    height: 3.2rem;
    background-color: var(--el-menu-active-color);
    margin-left: 0.8rem;
  }
}
</style>
