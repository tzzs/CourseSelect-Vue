import request from '@/utils/request'

export function getCourseList(query) {
  return request({
    url: '/api/course/list',
    method: 'get',
    params: query
  })
}
