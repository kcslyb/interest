<template>
  <div class="cs-container">
    <div class="cs-content-box cs-content-padding-2">
      <cs-label label="节拍动画" showUnderLine></cs-label>
      <div class="frame5"></div>
<!--      <div class="frame51"></div>-->
<!--      <div class="frame52"></div>-->
    </div>
  </div>
</template>

<script setup>
import CsLabel from '../../components/package/label/src/CsLabel.vue'
import CsButton from '../../components/package/button/src/CsButton.vue'

</script>

<style scoped lang="less">
.cs-container {

  .frame5 {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: red;
    position: relative;
    display: inline-block;
    animation-name: example;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  @keyframes example {
    0% {
      background-color: red;
      left: 0;
      top: 0;
    }
    50% {
      background-color: blue;
      left: 0;
      top: 200px;
    }
    100% {
      background-color: red;
      left: 0;
      top: 0;
    }
  }
  .frame51 {
    width: 50px;
    height: 50px;
    border-radius: 150px;
    background-color: red;
    position: relative;
    display: inline-block;
    left: 100px;
    animation-name: example2;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  .frame52 {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: red;
    position: relative;
    display: inline-block;
    left: 200px;
    animation-name: example3;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  @keyframes example2 {
    0%   {background-color:yellow; top:0;}
    25%  {background-color:blue; top:100px;}
    50%  {background-color:yellow; top:200px;}
    75%  {background-color:blue; top:100px;}
    100% {background-color:yellow; top:0;}
  }

  @keyframes example3 {
    0%   {background-color:red; top:0;}
    25%  {background-color:blue; top:100px;}
    50%  {background-color:blue; top:200px;}
    75%  {background-color:blue; top:100px;}
    100% {background-color:yellow; top:0;}
  }
}
</style>