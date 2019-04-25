<template>
  <div class="container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <div class="base_info">
          <!--    行1      -->
          <el-row :gutter="24">
            <el-col :span="2" :offset="5">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  :src="imageUrl"
                  class="avatar"
                  alt="avatar"
                  title="点击头像更新"
                  onmouseover="this.style.opacity=0.5;"
                  onmouseout="this.style.opacity=1;"
                >
              </el-upload>
            </el-col>
            <el-col :span="14" :offset="1">
              <el-row :gutter="24">
                <el-col :span="7">
                  <span class="name" style="margin-top: 1%;display: block">
                    欺负小虫子
                    <svg-icon icon-class="woman"></svg-icon>
                  </span>
                </el-col>
                <el-col :span="7">
                  <el-button type="primary" size="small" icon="el-icon-edit">编辑个人信息</el-button>
                </el-col>
                <el-col :span="7">
                  <router-link class="pan-btn blue-btn" to="/course/index">Course</router-link>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="7">
                  <span class="font-small">账号ID：11503070338</span>
                </el-col>
                <el-col :span="7">
                  <span class="font-small">注册时间：2019/4/24</span>
                </el-col>
                <el-col :span="4">
                  <span class="font-small">身份：学生</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 7%">
            <el-col :span="14" :offset="8">
              <span class="name">学院：计算机科学与工程</span>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 3%">
            <el-col :span="14" :offset="8">
              <span class="name">专业：计算机科学与技术</span>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 3%">
            <el-col :span="14" :offset="8">
              <span class="name">班级：115030703</span>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="安全信息" name="second">
        <div class="base_info">
          <!--    行1      -->
          <el-row :gutter="24">
            <el-col :span="14" :offset="3">
              <el-row :gutter="24">
                <el-col :span="7">
                  <span class="name" style="margin-top: 1%;display: block">欺负小虫子</span>
                </el-col>
                <el-col :span="7">
                  <el-button type="primary" size="small" icon="el-icon-edit">编辑个人信息</el-button>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="7">
                  <span class="font-small">账号ID：11503070338</span>
                </el-col>
                <el-col :span="7">
                  <span class="font-small">上次登录时间：2019.4.24</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 7%">
            <el-col :span="14" :offset="3">
              <span class="page2">验证邮箱：1789803837@qq.com</span>
              <div class="divider-line"></div>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 3%">
            <el-col :span="14" :offset="3">
              <span class="page2">手机绑定：173****4176</span>
              <a href="" style="color: #409EFF;">&nbsp;&nbsp;修改</a>
              <div class="divider-line"></div>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 3%">
            <el-col :span="14" :offset="3">
              <span class="page2">账户密码：</span>
              <a href="" style="color: #409EFF;">修改密码</a>
              <div class="divider-line"></div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="信息修改" name="third">
        <div class="base_info">
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'

export default {
  name: 'Profile',
  data() {
    return {
      activeName: 'first',
      form: {
        id: '',
        name: ''
      },
      imageUrl: this.$store.state.user.avatar
    }
  },
  computed: {
    ...mapGetters(['avatar']),
    PanThumb
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      // console.log(this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }
}
</script>
<style scoped>
  .divider-line {
    height: 1px;
    border-top: 1px solid #d0d0d0;
    text-align: center;
  }

  .container {
    margin: 10px 30px;
  }

  .form {
    width: 60%;
  }

  .base_info {
    height: 100%;
    margin: 1% 2% 2% 1%;
    padding: 2%;
    /*box-shadow: 2px 2px 3px #aaaaaa;*/
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15), 0 0 6px rgba(0, 0, 0, 0.15)
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar {
    width: 80px;
    height: 80px;
    display: block;
    border-radius: 7px;
  }

  .name {
    font-size: 20px;
    font-family: '微软雅黑', serif;
    font-weight: bold;
    align-content: center;
  }

  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .font-small {
    margin-top: 2%;
    display: block;
    font-size: 12px;
  }

  .page2 {
    font-size: 16px;
    font-family: '微软雅黑', serif;
    font-weight: bold;
    align-content: center;
  }
</style>
