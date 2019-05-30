import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/elective/list',
    method: 'get',
    params: query
  })
}
