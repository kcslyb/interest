<template>
  <div class="play-container">
    <div class="play-header"></div>
    <div class="play-main">
      <div class="play-item" :key="`play_item_${index}`" v-for="(item, index) of data.musicData">
        <span class="play-item-left">
          <img class="play-item-img" alt="" :src="item['image_uri']"/>
          <span class="play-item-name">{{ `[ ${item['file-name']} ] ${item.name['name-CNzh']}` }}</span>
        </span>
        <span class="play-item-opt">
        <!--          <span class="play-item-opt-item">play</span>-->
        <!--          <span class="play-item-opt-item">download</span>-->
        </span>
      </div>
    </div>
    <div class="play-footer"></div>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import PublicApi from "../../../api/typicode";

const data = reactive({
  musicData: []
})

PublicApi.querySongs().then(res => {
  data.musicData = Object.values(res).slice(0, 10)
})
</script>

<style scoped lang="less">
.play-container {
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  .play-header {
    height: 50px;
    display: inline-block;
    box-sizing: border-box;
    border-bottom: 1px solid @border-color;
  }

  .play-main {
    flex: 1;
    width: 50%;
    display: inline-block;
    box-sizing: border-box;
    text-align: center;

    .play-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      border-bottom: 1px solid @text-color;

      .play-item-left {
        display: flex;
        align-items: center;

        .play-item-img {
          width: 50px;
          height: 50px;
        }

        .play-item-name {
          color: @text-color;
          font-size: 14px;
          font-weight: bold;
          padding-left: 20px;
        }
      }

      .play-item-opt {
        display: flex;
        justify-content: space-around;
        align-items: center;

        .play-item-opt-item {
          color: @text-color;
          font-size: 12px;
          font-weight: bold;
          padding: 0 20px;
          cursor: pointer;
        }
      }
    }
  }

  .play-footer {
    height: 50px;
    display: inline-block;
    box-sizing: border-box;
    border-top: 1px solid @border-color;
  }
}
</style>