<template>
  <div>
    <div>
      <el-input
        v-model="listQuery.name"
        placeholder="Name"
        style="width: 200px;"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.credit"
        placeholder="Credit"
        style="width: 100px;"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
      />
      <el-select v-model="listQuery.rate" placeholder="Rate" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.status" placeholder="Status" clearable class="filter-item" style="width: 130px">
        <el-option
          v-for="item in statusOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <!--      <el-select v-model="listQuery.sort" style="width: 150px" class="filter-item" @change="handleFilter">-->
      <!--        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />-->
      <!--      </el-select>-->
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
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        Export
      </el-button>
      <el-checkbox v-model="showHidden" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        Show Hidden Column
      </el-checkbox>
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
      <el-table-column label="ID" prop="id" sortable align="center" width="80" fixed="">
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
      <el-table-column label="Actions" align="center" class-name="small-padding fixed-width" width="240">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
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
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="ID" prop="id">
          <el-input v-if="dialogStatus!=='create'" v-model="temp.id" :disabled="true" />
          <el-input v-else v-model="temp.id" />
        </el-form-item>
        <el-form-item label="Title" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="Credit" prop="credit">
          <el-input v-model="temp.credit" />
        </el-form-item>
        <el-form-item label="Teacher" prop="teacher">
          <el-input v-model="temp.teacher" />
        </el-form-item>
        <el-form-item label="Number" prop="stu_number">
          <el-input v-model="temp.stu_number" />
        </el-form-item>
        <el-form-item label="Semester" prop="semester">
          <el-input v-model="temp.semester" />
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Rate" prop="rate">
          <el-rate
            v-model="temp.rate"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="5"
            style="margin-top:8px;"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPv, fetchAllList, createCourse, updateCourse } from '@/api/course'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]
// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
export default {
  name: 'Addplan',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        Optional: 'success',
        NotOptional: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
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
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['Optional', 'NotOptional'],
      showHidden: false,
      showSemester: false,
      temp: {
        id: '',
        name: '',
        credit: '',
        teacher: '',
        stu_number: '',
        semester: '',
        status: '',
        rate: 3
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
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
    timeSort(list) {
      // console.log(list)
      return list.slice().sort((a, b) => {
        return Date.parse(a.date) - Date.parse(b.date)
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
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
    resetTemp() {
      this.temp = {
        name: '',
        credit: '',
        teacher: '',
        stu_number: '',
        semester: '',
        status: '',
        rate: 3
      }
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateCourse(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
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
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const header = ['id', 'name', 'teacher', 'reviewer', 'credit', 'rate', 'stu_number']
        const data = this.formatJson(header, this.alllist)
        excel.export_json_to_excel({
          header: header,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
