<template>
  <div class="app-container">
    <div class="filter-container">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><svg-icon icon-class="plan" /> &nbsp; 全部计划</span>
          <plan1 />
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><svg-icon icon-class="add" /> &nbsp; 添加计划</span>
          <el-steps :active="active" finish-status="success">
            <el-step title="步骤 1">
              123123123
            </el-step>
            <el-step title="步骤 2" />
            <el-step title="步骤 3" />
            <el-step title="步骤 4" />
            <el-step title="步骤 5" />
            <el-step title="步骤 6" />
            <el-step title="步骤 7" />
            <el-step title="步骤 8" />
          </el-steps>

          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import plan1 from './plan1'
export default {
  name: 'Plan',
  components: {
    plan1
  },
  data() {
    return {
      active: 1
    }
  },
  methods: {
    next() {
      if (this.active++ > 7) this.active = 1
    }
  }
}
</script>

<style scoped>

</style>
