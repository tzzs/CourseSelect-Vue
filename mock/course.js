import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'id': '@integer(10000,99999)',
    'name': '@title',
    'period': '@integer(10,20)',
    'credit': '@integer(2,8)',
    'semester': '@integer(1,10)',
    'teacher': '@first',
    'stu_number': '@integer(40,120)',
    'time|1-16': [{
      'date': '@date(yyyy-MM-dd)',
      'weeks': '@integer(1,20)',
      'week': '@integer(1,7)',
      'lesson': '@integer(1,5)'
    }],
    'college': '@title',
    'rate': '@integer(1,5)',
    'reviewer': '@first',
    'status|1': ['Optional', 'NotOptional']
  }))
}
export default [{
  url: '/course/list',
  type: 'get',
  response: config => {
    const { importance, type, title, page = 1, limit = 20, sort } = config.query

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 20000,
      data: {
        total: mockList.length,
        items: pageList
      }
    }
  }
}, {
  url: '/course/detail',
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
  url: '/article/pv',
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
  url: '/course/create',
  type: 'post',
  response: _ => {
    return {
      code: 20000,
      data: 'success'
    }
  }
}, {
  url: '/course/update',
  type: 'post',
  response: _ => {
    return {
      code: 20000,
      data: 'success'
    }
  }
}]
