import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/alarm/list',
    method: 'get',
    params: query
  })
}
