import request from '@/utils/request'

export function fetchInfo() {
  return request({
    url: '/student/profile',
    method: 'get',
    params: ''
  })
}

export function updateInfo(data) {
  return request({
    url: '/student/updateInfo',
    method: 'post',
    params: data
  })
}
