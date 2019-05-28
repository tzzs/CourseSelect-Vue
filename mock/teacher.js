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
    const { page = 1, limit = 10, sort, title, college, name } = config.query

    let mockList = List.filter(item => {
      if (name && item.name.toLowerCase().indexOf(name.toLowerCase()) < 0) return false
      if (title && item.title.toLowerCase().indexOf(title.toLowerCase()) < 0) return false
      if (college && item.college.toLowerCase().indexOf(college.toLowerCase()) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 20000,
      data: {
        total: List.length,
        items: pageList
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
