import Mock from 'mockjs'

const List = []
const count = 10

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@id',
    name: '@ctitle',
    teacher: '@cname',
    semester: '@integer(1,10)',
    grade: '@integer(1,100)'
  }))
}

export default [{
  url: '/elective/list',
  type: 'get',
  response: config => {
    return {
      code: 20000,
      data: {
        items: List,
        total: List.length
      }
    }
  }
}]
