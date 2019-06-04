import request from '@/utils/request'

export function fetchElectiveList(query) {
  return request({
    url: '/api/elective/list',
    method: 'get',
    params: query
  })
}

export function fetchetList(query) {
  return request({
    url: '/elective/list',
    method: 'get',
    params: query
  })
}

export function fetcheList(query) {
  return request({
    url: '/elective/elist',
    method: 'get',
    params: query
  })
}

export function getElective() {
  return request({
    url: '/api/elective/getElective',
    method: 'get'
  })
}

export function add(params) {
  return request({
    url: '/api/elective/add',
    method: 'post',
    params: params
  })
}

export function get(params) {
  return request({
    url: '/api/elective/get',
    method: 'get',
    params
  })
}
