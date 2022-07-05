import request from '@/utils/request'
// 发布房源所需信息
export const pubhouse = (data) => {
  return request({
    url: 'user/houses',
    method: 'post',
    data
  })
}
// 上传房源照片
export const houseImage = (data) => {
  return request({
    url: '/houses/image',
    method: 'POST',
    headers: {
      ContentType: 'multipart/form-data'
    },
    data

  })
}
