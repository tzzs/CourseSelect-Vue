import request from '@/utils/request'

export function fetchPlanList(query) {
  return request({
    url: '/plan/list',
    method: 'get',
    params: query
  })
}
