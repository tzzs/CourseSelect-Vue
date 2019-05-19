import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'id': '@integer(10000,99999)',
    'name': '@title',
    'period': '@integer(10,20)',
    'credit': '@integer(2,8)',
    'semester': '@date(yy-MM)',
    'teacher': '@first',
    'stu_number': '@integer(40,120)',
    'time|1-16': [{
      'date': '@date(yy-MM-dd)'
    }]
  }))
}
export default [{
  url: '/courses/list',
  type: 'get',
  response: config => {
    const { importance, type, title, page = 1, limit = 20, sort } = config.query

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-cnumber') {
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
}]
