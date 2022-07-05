import request from '@/utils/request'
// 获取房屋信息
export const housesDetails = (id) => {
  return request({
    url: `houses/${id}`
  })
}
// 获取当前房屋是否收藏
export const housesCollectedState = (id) => {
  return request({
    url: `user/favorites/${id}`
  })
}

// 收藏当前房屋
export const Collectedhouses = (id) => {
  return request({
    url: `user/favorites/${id}`,
    method: 'POST'
  })
}
// 取消收藏当前房屋
export const delCollectedHouses = (id) => {
  return request({
    url: `user/favorites/${id}`,
    method: 'DELETE'
  })
}

// 获取已发布的房源信息
export const pubHouse = () => {
  return request({
    url: 'user/houses'
  })
}

// 获取已收藏的房源信息
export const collectedHouse = () => {
  return request({
    url: 'user/favorites'
  })
}
