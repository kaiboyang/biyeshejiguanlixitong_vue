import request from '@/utils/request'

export function getStudents() {
    return request({
      url: '/system/student/studentList',
      method: 'get'
    })
  }