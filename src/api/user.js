import request from '@/utils/request'

// 用户登录
export const getLogin = (data) => {
  return request({
    url: 'user/login',
    method: 'POST',
    data
  })
}

// 获取获取用户的信息资料
export const getUserInfo = () => {
  return request({
    url: 'user'

  })
}
