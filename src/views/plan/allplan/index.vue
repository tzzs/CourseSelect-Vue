<template>
  <div style="">
    <div v-show="show">
      <el-select v-model="listQuery.grade" placeholder="年级" clearable class="filter-item">
        <el-option v-for="item in grades" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.college" placeholder="学院" clearable class="filter-item">
        <el-option v-for="item in colleges" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.profession" placeholder="专业" clearable class="filter-item">
        <el-option
          v-for="item in professions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        Add
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        type="index"
        align="center"
        fixed
      />
      <el-table-column label="ID" prop="id" sortable align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.cid }}</span>
        </template>
      </el-table-column>

      <el-table-column label="课程" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教师" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.teacher }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showHidden" label="学期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.semester }}</span>
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
          <div v-if="scope.rate">
            <svg-icon v-for="n in + parseInt(scope.row.rate) " :key="n" icon-class="star" class="meta-item__icon" />
          </div>
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
      <el-table-column label="课程性质" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建议修读学期" class-name="status-col" width="110">
        <template slot-scope="{row}">
          <span>{{ row.semester }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" class-name="small-padding fixed-width" width="240">
        <template slot-scope="{row}">
          <el-button
            v-if="row.status!='Optional'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row,'Optional')"
          >
            可选
          </el-button>
          <el-button v-if="row.status!='NotOptional'" size="mini" @click="handleModifyStatus(row,'NotOptional')">
            不可选
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getPlanList"
    />
  </div>

</template>

<script>
import { fetchList, fetchPv, fetchAllList, createCourse, updateCourse } from '@/api/course'

import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { getPlanList } from '@/api/plan'

export default {
  name: 'Allplan',
  components: {
    Pagination
  },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        Optional: 'success',
        NotOptional: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
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
        college: undefined,
        grade: undefined,
        profession: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3, 4, 5],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['Optional', 'NotOptional'],
      showHidden: false,
      showSemester: false,

      grades: null,
      colleges: null,
      professions: null
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    // this.getList()
    this.getPlanList()
  },
  methods: {
    getPlanList() {
      this.listLoading = true
      getPlanList(this.listQuery).then(response => {
        const data = response.data
        this.list = data.items
        this.total = data.total
        this.grades = data.grades
        this.colleges = data.colleges
        this.professions = data.professions

        console.log(this.list)
        this.listLoading = false
      }).catch(function(err) {
        console.log(err)
      })
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
    filterNode(value, data) {
      if (!value) return true
      return data.label.toString().indexOf(value) !== -1
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
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getPlanList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createCourse(this.temp).then(() => {
            this.list.unshift(this.temp)
            console.log(this.list)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    }
  }

}
</script>

<style scoped>

</style>
