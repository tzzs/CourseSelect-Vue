<template>
  <div class="app-container">
    <el-checkbox-group v-model="checkList">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" label="ID">
          <template slot-scope="scope">
            <el-checkbox :label="scope.row.id"/>
          </template>
        </el-table-column>

        <el-table-column width="180px" align="center" label="课程">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="教师">
          <template slot-scope="scope">
            <span>{{ scope.row.teacher }}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="学时">
          <template slot-scope="scope">
            <span>{{ scope.row.period }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" align="center" label="剩余可选" width="110">
          <template slot-scope="scope">
            <span>{{ scope.row.stu_number }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="300px" align="center" label="上课时间">
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Actions" width="120">
          <template slot-scope="scope">
            <router-link :to="'/example/edit/'+scope.row.id">
              <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
            </router-link>
          </template>
          <!-- <el-checkbox label></el-checkbox> -->
        </el-table-column>
      </el-table>
    </el-checkbox-group>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <div style="border-radius: 4px;width: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12);padding: 0 0 24px 32px;">
      <span>当前选择科目：{{ count }} 总学分：{{ count }}</span>
      <el-button type="primary" style="margin: 0 25px" @click="open()">提交</el-button>
      <span>{{ checkList }}</span>
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/course'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'CourseList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      checkList: [],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      count: 5
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
        this.total = response.data.total
        this.listLoading = false
      })
    },
    open() {
      this.$confirm('当前选择科目：' + this.count + '  总学分：' + this.count, '提交', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'successs',
          message: '提交成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
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
