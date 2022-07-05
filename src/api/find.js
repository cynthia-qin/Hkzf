import request from '@/utils/request'

// 获取房屋查询的条件
export const searchHouse = (id) => {
  return request({
    url: `/houses/condition?id=${id}`
  })
}
// 获取默认房源信息
export const houses = (params) => {
  return request({
    url: '/houses',
    params
  })
}
// 获取房屋发布需要的条件
export const HouseRequired = () => {
  return request({
    url: '/houses/params'
  })
}
