import request from '@/utils/request'

export function fetchCourseList(query) {
  return request({
    url: '/api/course/list',
    method: 'get',
    params: query
  })
}
