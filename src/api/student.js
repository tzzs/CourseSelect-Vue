import request from '@/utils/request'

export function fetchInfo(id) {
  return request({
    url: '/student/profile',
    method: 'get',
    params: { id }
  })
}

export function updateInfo(data) {
  return request({
    url: '/student/updateInfo',
    method: 'post',
    params: data
  })
}

export function fetchList(query) {
  return request({
    url: '/student/list',
    method: 'get',
    params: query
  })
}

export function fetchDetail(id) {
  return request({
    url: '/student/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/student/pv',
    method: 'get',
    params: { pv }
  })
}

export function createStudent(data) {
  return request({
    url: '/student/create',
    method: 'post',
    data
  })
}

export function updateStudent(data) {
  return request({
    url: '/student/update',
    method: 'post',
    data
  })
}
