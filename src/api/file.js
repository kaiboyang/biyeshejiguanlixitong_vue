import request from '@/utils/request'

export function uploadTopic(data) {
    return request({
      url: '/system/topic/uploadTopic',
      method: 'post',
      data:data
    })
}