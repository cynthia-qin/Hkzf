import request from '@/utils/request'
export const getCommunity = (name, id) => {
  return request({
    url: `/area/community?name=${name}&id=${id}`
  })
}
