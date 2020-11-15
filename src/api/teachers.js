import request from '@/utils/request'

export function getXnTeaList() {
    return request({
      url: '/tea/teacher/xnTeaList',
      method: 'get',
    })
  }
  

export function getXwTeaList() {
    return request({
      url: '/tea/teacher/xwTeaList',
      method: 'get',
    })
}