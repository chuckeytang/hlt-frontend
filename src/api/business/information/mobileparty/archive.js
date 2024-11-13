import request from '@/utils/request'

// 查询流动党员信息档案列表
export function listArchive(query) {
  return request({
    url: '/mobileparty/archive/list',
    method: 'get',
    params: query
  })
}

// 查询流动党员信息档案详细
export function getArchive(id) {
  return request({
    url: '/mobileparty/archive/' + id,
    method: 'get'
  })
}

// 新增流动党员信息档案
export function addArchive(data) {
  return request({
    url: '/mobileparty/archive',
    method: 'post',
    data: data
  })
}

// 修改流动党员信息档案
export function updateArchive(data) {
  return request({
    url: '/mobileparty/archive',
    method: 'put',
    data: data
  })
}

// 删除流动党员信息档案
export function delArchive(id) {
  return request({
    url: '/mobileparty/archive/' + id,
    method: 'delete'
  })
}
