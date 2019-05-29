// import Mock from 'mockjs'
const Mock = require('mockjs')

const List = Mock.mock({
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
        profile: List
      }
    }
  }
}, {
  url: '/student/updateInfo',
  type: 'post',
  response: config => {
    return {
      code: 20000,
      data: {
        message: '更新成功'
      }
    }
  }
}, {
  url: '/student/list',
  type: 'get',
  response: config => {
    return {
      code: 20000,
      data: {
        total: List.length,
        items: List
      }
    }
  }
}, {
  url: 'student/detail',
  type: 'get',
  response: config => {
    const { id } = config.query
    for (const stu of List) {
      if (stu.id === +id) {
        return {
          code: 20000,
          data: stu

        }
      }
    }
  }
}, {
  url: 'student/create',
  type: 'post',
  repsonse: _ => {
    const data = _.query
    console.log('student create:' + data)
    return {
      code: 20000,
      data: 'success'
    }
  }
}, {
  url: 'student/update',
  type: 'post',
  response: _ => {
    const data = _.query
    console.log('student update:' + data)
    return {
      code: 20000,
      data: 'success'
    }
  }
}]
