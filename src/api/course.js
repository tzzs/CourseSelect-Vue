import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/course/list',
    method: 'get',
    params: query
  })
}

export function fetchCourse(id) {
  return request({
    url: '/course/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/course/pv',
    method: 'get',
    params: { pv }
  })
}

export function createCourse(data) {
  return request({
    url: '/course/create',
    method: 'post',
    data
  })
}

export function updateCourse(data) {
  return request({
    url: '/course/update',
    method: 'post',
    data
  })
}
