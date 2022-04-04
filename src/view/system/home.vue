<template>
  <div class="cs-container">
    <div class="cs-content-box cs-content-padding-2">
      <cs-label label="访问日志" showUnderLine>
        <template v-slot:right>
          <span>!!只显示最近20条访问日志!!</span>
        </template>
      </cs-label>
    </div>
    <div class="cs-content">
      <cs-table
          :data="accessTop20"
          :columns="accessColumns">
      </cs-table>
    </div>
  </div>
</template>

<script setup>
import CsLabel from '../../components/package/label/src/CsLabel.vue'
import CsButton from '../../components/package/button/src/CsButton.vue'
import {computed} from "vue";
import {mapActions, mapGetters, useStore} from "vuex";
import {QUERY_ACCESS} from "../../store/mutation-types";

const state = useStore()

const accessColumns = [
  {type: 'serial', label: '序号', width: '50'},
  {type: '', label: '访问者', prop: 'accessUserName'},
  {type: '', label: '访问内容', prop: 'accessPathLabel'},
  {type: '', label: '访问时间', prop: 'accessTime'}
]

mapActions([`access/${QUERY_ACCESS}`])[`access/${QUERY_ACCESS}`].call({$store: state})
const access = computed(mapGetters([`access/${QUERY_ACCESS}`])[`access/${QUERY_ACCESS}`].bind({$store: state}))
const accessTop20 = computed(() => {
  return [].concat(access.value).slice(0, 20)
})
</script>

<style scoped lang="less">
.cs-container {

}
</style>