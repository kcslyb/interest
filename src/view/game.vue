<template>
  <div class="game-container">
    <cs-touch @touch="handleTouch">
      <div class="game-2048">
        <div class="game-2048-item" :key="index" v-for="(item, index) of data.array">
          <span :class="['item-num', `bcg${item}`]">{{ item }}</span>
        </div>
      </div>
    </cs-touch>
    <div class="clear">
      <cs-button type="primary" @on-click="handleClear">重置</cs-button>
    </div>
  </div>
</template>

<script setup>

import {getCurrentInstance, reactive} from "vue"
import {isEmpty, isNotEmpty, randomNum} from "../components/lib/utils"
import LocalStorage from "../components/lib/localStorage"

const {proxy} = getCurrentInstance()

const data = reactive({
  array: [],
  statusObj: {},
  key: '2048'
})
const initArray = () => {
  debugger
  const storage = LocalStorage.getInstance().getItem(data.key) || []
  if (storage && storage.length) {
    data.array = storage
    return
  }
  data.array = []
  for (let i = 0; i < 16; i++) {
    data.array.push('')
  }
  data.array[Math.floor(randomNum(data.array.filter(val => isEmpty(val)).length - 1, 0))] = 2
  data.array[Math.floor(randomNum(data.array.filter(val => isEmpty(val)).length - 1, 0))] = 2
}

const translation = (indexArr, dataArr) => {
  const tempValue = []
  for (let j = 0; j < indexArr.length; j++) {
    const curValue = dataArr[indexArr[j]]
    const lastValue = tempValue.length ? tempValue[tempValue.length - 1] : ''
    const curValueNotEmpty = isNotEmpty(dataArr[indexArr[j]])
    if (curValueNotEmpty && isNotEmpty(lastValue) && lastValue === curValue) {
      tempValue[tempValue.length - 1] = curValue * 2
    }
    curValueNotEmpty && tempValue.push(curValue)
  }
  for (let i = 0; i < indexArr.length; i++) {
    dataArr[indexArr[i]] = i < tempValue.length ? tempValue[i] : ''
  }
}

const handleTouch = ({event}) => {
  // 位置映射处理器
  const processor = {
    'touch-left': () => {
      return {
        randomIndexArr: [3, 7, 11, 15],
        indexArr: [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]
      }
    },
    'touch-right': () => {
      return {
        randomIndexArr: [0, 4, 8, 12],
        indexArr: [[3, 2, 1, 0], [7, 6, 5, 4], [11, 10, 9, 8], [15, 14, 13, 12]]
      }
    },
    'touch-top': () => {
      return {
        randomIndexArr: [12, 13, 13, 15],
        indexArr: [[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15]]
      }
    },
    'touch-bottom': () => {
      return {
        randomIndexArr: [0, 1, 2, 3],
        indexArr: [[12, 8, 4, 0], [13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3]]
      }
    }
  }
  data.statusObj[event] = true
  const {indexArr, randomIndexArr} = processor[event]()
  const dataArr = data.array
  const tempStr = dataArr.join()
  for (let i = 0; i < indexArr.length; i++) {
    translation(indexArr[i], data.array)
  }
  // 有平移操作才添加基础数字
  if (tempStr !== dataArr.join()) {
    const emptyIndex = randomIndexArr.filter(index => isEmpty(dataArr[index]))
    const emptyRandomIndex = emptyIndex[Math.floor(randomNum(emptyIndex.length - 1, 0))]
    dataArr[emptyRandomIndex] = 2
    data.statusObj[event] = true
  } else {
    data.statusObj[event] = false
  }
  // 游戏失败
  const values = Object.values(data.statusObj).filter(val => val)
  if (values.length === 0) {
    proxy.$csNotify({msg: '游戏失败！', type: 'error'})
  }
  // 每次操作完保存结果
  LocalStorage.getInstance().setItem(data.key, dataArr)
}

const handleClear = () => {
  LocalStorage.getInstance().removeItem(data.key)
  initArray()
}

initArray()

</script>

<style scoped lang="less">

@c2: rgba(120, 190, 255);
@c4: rgb(110, 180, 255);
@c8: rgb(100, 170, 255);
@c16: rgb(95, 165, 255);
@c32: rgb(90, 160, 255);
@c64: rgb(85, 155, 255);
@c128: rgb(80, 150, 255);
@c256: rgb(75, 145, 255);
@c512: rgb(70, 140, 255);
@c1024: rgb(65, 135, 255);
@c2048: rgb(60, 130, 255);
@c4096: rgb(55, 125, 255);
@c8192: rgb(50, 120, 255);
@c16384: rgb(45, 115, 255);
@c32768: rgb(40, 110, 255);
@c65536: rgb(35, 105, 255);
@c131072: rgb(30, 100, 255);
@c262144: rgb(25, 95, 255);
@c524288: rgb(20, 90, 255);
@c1048576: rgb(15, 85, 255);
@c2097152: rgb(10, 80, 255);
@c4194304: rgb(5, 75, 255);
@c8388608: rgb(0, 70, 255);

.game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  // 大型设备（大台式电脑，1200px 起）
  @media screen and (min-width: 1200px) {
    .game-2048 {
      grid-template-columns: 200px 200px 200px 200px;
      grid-template-rows: 200px 200px 200px 200px;
    }
  }

  // 中型设备（台式电脑，992px 起）
  @media screen and (min-width: 992px) and (max-width: 1200px) {
    .game-2048 {
      grid-template-columns: 120px 120px 120px 120px;
      grid-template-rows: 120px 120px 120px 120px;
    }
  }

  // 小型设备（平板电脑，768px 起）
  @media screen and (min-width: 768px) and (max-width: 992px) {
    .game-2048 {
      grid-template-columns: 100px 100px 100px 100px;
      grid-template-rows: 100px 100px 100px 100px;
    }
  }

  // 超小设备（手机，小于 768px）
  @media screen and (max-width: 768px) {
    .game-2048 {
      grid-template-columns: 85px 85px 85px 85px;
      grid-template-rows: 85px 85px 85px 85px;
    }
  }

  .game-2048 {
    display: grid;
    justify-content: center;
    color: @white-color;

    .game-2048-item {
      user-select: none;
      border-radius: 4px;
      border: 1px solid @border-color;
      box-shadow: 0 2px 4px 0 @background-color;

      .item-num {
        font-weight: bold;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 100%;
        width: 100%;
      }

      .bcg2 {
        font-size: 24px;
        background-color: @c2;
      }

      .bcg4 {
        font-size: 25px;
        background-color: @c4;
      }

      .bcg8 {
        font-size: 26px;
        background-color: @c8;
      }

      .bcg16 {
        font-size: 27px;
        background-color: @c16;
      }

      .bcg32 {
        font-size: 28px;
        background-color: @c32;
      }

      .bcg64 {
        font-size: 29px;
        background-color: @c64;
      }

      .bcg128 {
        font-size: 30px;
        background-color: @c128;
      }

      .bcg256 {
        font-size: 31px;
        background-color: @c256;
      }

      .bcg512 {
        font-size: 32px;
        background-color: @c512;
      }

      .bcg1024 {
        font-size: 33px;
        background-color: @c1024;
      }

      .bcg2048 {
        font-size: 34px;
        background-color: @c2048;
      }

      .bcg4096 {
        font-size: 35px;
        background-color: @c4096;
      }

      .bcg8192 {
        font-size: 36px;
        background-color: @c8192;
      }

      .bcg16384 {
        font-size: 37px;
        background-color: @c16384;
      }

      .bcg32768 {
        font-size: 38px;
        background-color: @c32768;
      }

      .bcg65536 {
        font-size: 38px;
        background-color: @c65536;
      }

      .bcg131072 {
        font-size: 38px;
        background-color: @c131072;
      }

      .bcg262144 {
        font-size: 38px;
        background-color: @c262144;
      }

      .bcg524288 {
        font-size: 38px;
        background-color: @c524288;
      }

      .bcg1048576 {
        font-size: 38px;
        background-color: @c1048576;
      }

      .bcg2097152 {
        font-size: 38px;
        background-color: @c2097152;
      }

      .bcg4194304 {
        font-size: 38px;
        background-color: @c4194304;
      }

      .bcg8388608 {
        font-size: 38px;
        background-color: @c8388608;
      }
    }
  }
  .clear {
    top: 10px;
    right: 10px;
    position: absolute;
    display: inline-block;
  }
}
</style>