import request from '@/utils/request'
export const housesLocal = (id) => {
  return request({
    url: 'area/map',
    params: {
      id
    }
  })
}
