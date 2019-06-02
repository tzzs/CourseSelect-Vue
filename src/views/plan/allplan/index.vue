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
      <div style="margin:0 0 2% 4%"><span><el-tag>学期</el-tag></span></div>
      <el-timeline>
        <el-timeline-item timestamp="1" placement="top">
          <el-card>
            <el-collapse v-model="activeNames" accordion>
              <el-collapse-item title="培养计划 Undergraduate program (点击展开)" name="1">
                <router-link to="/manage/course/index"><el-button style="margin-bottom: 1%">管理</el-button></router-link>
                <el-table
                  :key="tableKey"
                  v-loading="listLoading"
                  :data="list"
                  border
                  fit
                  highlight-current-row
                  style="width: 100%;"
                >
                  <el-table-column
                    align="center"
                    type="index"
                    width="50"
                    fixed
                  />
                  <el-table-column label="ID" prop="id" sortable align="center" width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row.id }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="课程" min-width="150px">
                    <template slot-scope="{row}">
                      <span class="link-type" @click="handleUpdate(row)">{{ row.name }}</span>
                      <!--          <el-tag>{{ row.type | typeFilter }}</el-tag>-->
                    </template>
                  </el-table-column>
                  <el-table-column label="教师" width="100" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.teacher }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="showHidden" label="Reviewer" width="100" align="center">
                    <template slot-scope="scope">
                      <span style="color:red;">{{ scope.row.reviewer }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="学分" width="100" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.credit }}</span>
                    </template>
                  </el-table-column>

                  <!-- todo 只读分数展示允许半星-->
                  <el-table-column label="评分" width="100">
                    <template slot-scope="scope">
                      <svg-icon v-for="n in +scope.row.rate" :key="n" icon-class="star" class="meta-item__icon" />
                    </template>
                  </el-table-column>
                  <el-table-column label="人数" align="center" width="100">
                    <template slot-scope="{row}">
                      <span
                        v-if="row.stu_number"
                        class="link-type"
                        @click="handleFetchPv(row.stu_number)"
                      >{{ row.stu_number }}</span>
                      <span v-else>0</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="Date" width="110" align="center">
                    <template slot-scope="scope">
                      <el-dropdown v-if="scope.row.time">
                        <span class="el-dropdown-link">
                          学时：{{ scope.row.time.length }}<i class="el-icon-arrow-down el-icon--right" />
                        </span>
                        <el-dropdown-menu
                          slot="dropdown"
                        >
                          <el-dropdown-item
                            v-for="t of scope.row.time"
                            disabled
                          >{{ t.weeks }}周-星期{{ t.week }}-{{ t.lesson }}</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-timeline-item>

      </el-timeline>
    </div>
  </div>

</template>

<script>
import { fetchList, fetchAllList } from '@/api/course'

export default {
  name: 'Allplan',
  components: {

  },
  data() {
    return {
      activeNames: '',
      filterText: '',
      show: true,
      tableKey: 0,
      list: null,
      alllist: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3, 4, 5],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['Optional', 'NotOptional'],
      showHidden: false,
      showSemester: false,
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
  created() {
    this.getList()
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
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        const items = response.data.items
        for (const i in items) {
          // items[i].time = this.timeSort(items[i].time)
          items[i].time = this.sortByWeeks(items[i].time)
        }
        // console.log(items)
        this.list = items
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
      fetchAllList().then(response => {
        this.alllist = response.items
      })
    },
    sortByWeeks(list) {
      return list.sort((a, b) => {
        if (a.weeks < b.weeks) {
          return -1
        } else if (a.weeks === b.weeks) {
          if (a.week < b.week) {
            return -1
          } else {
            return 1
          }
        } else {
          return 1
        }
      })
    }
  }

}
</script>

<style scoped>

</style>
