<template>
  <div style="margin: 1%;">
    <div v-show="show">
      <el-input
        v-model="filterText"
        placeholder="输入关键字进行过滤"
        style="margin-bottom: 1%"
      />
      <el-tree
        ref="tree"
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      />
    </div>
    <div v-show="!show">
      <el-button icon="el-icon-arrow-left" style="margin:0 0 2% 4%" @click="goBack()">返回</el-button>
      <el-timeline>
        <el-timeline-item timestamp="大一上" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>

          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="大一下" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="大二上" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>

</template>

<script>

export default {
  name: 'Allplan',
  components: {

  },
  data() {
    return {
      filterText: '',
      show: true,
      data: [{
        id: 1,
        label: '计算机科学与工程学院',
        children: [{
          id: 4,
          label: '计算机科学与技术专业',
          children: [{
            id: 1000,
            label: 2015
          }, {
            id: 1000,
            label: 2016
          }, {
            id: 1000,
            label: 2017
          }, {
            id: 1000,
            label: 2018
          }]
        }, {
          id: 5,
          label: '软件工程',
          children: [{
            id: 1000,
            label: 2015
          }, {
            id: 1000,
            label: 2016
          }, {
            id: 1000,
            label: 2017
          }, {
            id: 1000,
            label: 2018
          }]
        }, {
          id: 6,
          label: '物联网工程',
          children: [{
            id: 1000,
            label: 2015
          }, {
            id: 1000,
            label: 2016
          }, {
            id: 1000,
            label: 2017
          }, {
            id: 1000,
            label: 2018
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.toString().indexOf(value) !== -1
    },
    handleNodeClick(data) {
      if (data.id >= 1000) {
        console.log(data)
        //  todo 获取对应培养计划
        this.show = false
      }
    },
    goBack() {
      this.show = true
      console.log(this.show)
    }
  }

}
</script>

<style scoped>

</style>
