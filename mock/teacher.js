import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'id': '@id',
    'teaid': '@id',
    'name': '@first',
    'college': '@title',
    'title': '@first',
    'email': '@email',
    'phone': '@natural',
    'status|1': ['admin', 'tea'],
    'regTime': '@date(yyyy-MM-dd)',
    'lastTime': '@date(yyyy-MM-dd)'
  }))
}

export default [{
  url: '/teacher/list',
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
  url: '/teacher/detail',
  type: 'get',
  response: config => {
    const { id } = config.query
    for (const course of List) {
      if (course.id === +id) {
        return {
          code: 20000,
          data: course
        }
      }
    }
  }
}, {
  url: '/teacher/pv',
  type: 'get',
  response: _ => {
    return {
      code: 20000,
      data: {
        pvData: [
          { key: 'PC', pv: 1024 },
          { key: 'mobile', pv: 1024 },
          { key: 'ios', pv: 1024 },
          { key: 'android', pv: 1024 }
        ]
      }
    }
  }
}, {
  url: '/teacher/create',
  type: 'post',
  response: _ => {
    return {
      code: 20000,
      data: 'success'
    }
  }
}, {
  url: '/teacher/update',
  type: 'post',
  response: _ => {
    return {
      code: 20000,
      data: 'success'
    }
  }
}]
