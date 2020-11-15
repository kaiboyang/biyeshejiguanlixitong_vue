import request from '@/utils/request'


// base 基地的增上改查
export function getBase() {
    return request({
      url: '/system/base/list',
      method: 'get'
    })
}
export function updadteBase(data) {
  return request({
    url: '/system/base/update',
    method: 'put',
    data:data
  })
}
export function deleteBase(id) {
  return request({
    url: `/system/base/del/${id}`,
    method: 'delete',
  })
}
export function createBase(data) {
  return request({
    url: '/system/base/add',
    method: 'post',
    data:data
  })
}



// teacher 老师下拉框
export function getTeacher() {
  return request({
    url: '/tea/teacher/baseList',
    method: 'get'
  })
}
// direct 方向下拉框
export function getDirect() {
  return request({
    url: '/system/direct/list',
    method: 'get'
  })
}
// class 班级下拉框
export function getClass() {
  return request({
    url: '/bysj/class/classList',
    method: 'get'
  })
}

// 基地管理员的增删改查
export function getBaseTeaMessage() {
  return request({
    url: '/tea/teacher/baseTeaMessage',
    method: 'get'
  })
}
export function updateTeaMessage(data) {//修改
  return request({
    url: '/tea/teacher/update',
    method: 'put',
    data:data
  })
}
export function addBaseteacher(data) {//增加
  return request({
    url: '/tea/teacher/add',
    method: 'post',
    data:data
  })
}


// 操作 校内/外老师的信息
export function getSchoolTeacher(type) {
  return request({
    url: `/tea/teacher/flList/${type}`,
    method: 'get'
  })
}

// 添加培训方向 
export function addDirect(data) {
  return request({
    url: '/system/direct/add',
    method: 'post',
    data:{"dirName":data}
  })
}

// 初始化密码
export function resetPasswordQq(data) {
  return request({
    url: `/tea/teacher/initPassword/${data}`,
    method: 'post',
  })
}
