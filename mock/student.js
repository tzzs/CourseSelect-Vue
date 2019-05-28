// import Mock from 'mockjs'
const Mock = require('mockjs')

const student = Mock.mock({
  'id': '@id',
  'stuid': '@id',
  'name': '@first',
  'password': '@integer(10,20)',
  'email': '@email',
  'sex|1': ['男', '女'],
  'college': '@ctitle',
  'profession': '@ctitle',
  'class': '@natural',
  'phone': '@natural',
  'regTime': '@date(yyyy-MM-dd)',
  'lastTime': '@date(yyyy-MM-dd)'
})

export default [{
  url: '/student/profile',
  type: 'get',
  response: config => {
    return {
      code: 20000,
      data: {
        profile: student
      }
    }
  }
}, {
  url: '/student/updateInfo',
  type: 'post',
  respose: config => {
    return {
      code: 20000,
      data: {
        message: '更新成功'
      }
    }
  }
}]
