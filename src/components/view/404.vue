<template>
  <div>
    <div style="text-align: center">
      <span id="error-link">{{ account }}</span>
      <h2>! ERROR !</h2>
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
