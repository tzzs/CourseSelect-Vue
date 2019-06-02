<template>
  <div class="app-container">
    <div class="filter-container">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><svg-icon icon-class="plan" /> &nbsp; 全部计划</span>
          <allplan />
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><svg-icon icon-class="add" /> &nbsp; 计划管理</span>
          <addplan />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import allplan from './allplan'
import addplan from './addplan'
export default {
  name: 'Plan',
  components: {
    allplan,
    addplan
  }
}
</script>

<style scoped>

</style>
