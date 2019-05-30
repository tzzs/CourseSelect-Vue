<template>
  <div class="app-container">

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      tooltip-effect="dark"
      @sort-change="sortChange"
    >
      <el-table-column align="center" sortable label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" align="center" label="课程">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="教师">
        <template slot-scope="scope">
          <span>{{ scope.row.teacher }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.semester }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成绩" align="center">
        <template slot-scope="scope">
          <span
            v-if="scope.row.grade>=60"
          >
            <el-tag type="success">{{ scope.row.grade }}</el-tag>
          </span>
          <span
            v-else
          >
            <el-tag type="danger">{{ scope.row.grade }}</el-tag>
          </span>
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

  </div>
</template>

<script>
import { fetchList } from '@/api/elective'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Grade',
  components: { Pagination },
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
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        rate: undefined,
        name: undefined,
        type: undefined,
        sort: '+id',
        remain: undefined
      },
      count: 0,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      multipleSelection: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取课程信息
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        console.log(this.list)
        this.total = response.data.total
        this.listLoading = false
      })
    }, handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }, sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    }, sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    }
  }
}
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
