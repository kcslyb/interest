<template>
  <div>
    <div style="text-align: center">
      <h1> What have you done? </h1>
      <div>
        <a type="text" style="display: inline; cursor: pointer" @click="goBack">
          <h4> Now Go Back Using Below LInk</h4>
        </a>
      </div>
      <span id="error-link">{{ account }}</span>
      <h2>! ERROR DECETED !</h2>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router"
const account = "404"
const router = useRouter()
const goBack = () => {
  router.back()
}
</script>

<style scoped>
#error-link {
  padding: 5px;
  font-size: 10em;
  box-sizing: border-box;
}
</style>
