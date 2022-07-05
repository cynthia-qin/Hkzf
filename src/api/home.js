import request from '@/utils/request'
// 获取顶部轮播图
export const getSwiper = () => {
  return request({
    url: 'home/swiper'
  })
}
// 获取租房小组
export const getHouseGroups = (area) => {
  return request({
    url: `home/groups?area=${area}`
  })
}
