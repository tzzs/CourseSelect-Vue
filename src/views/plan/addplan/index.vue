<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'Addplan',
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
