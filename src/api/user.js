import request from '@/utils/request'

export function login(data) {
  data.rememberMe = true
  return request({
    //  /api/auth/login
    //  /vue-admin-template/user/login
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    //  /api/tea/teacher/info
    //  /vue-admin-template/user/info
    url: '/tea/teacher/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/au/logout',
    method: 'post'
  })
}
