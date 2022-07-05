import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://liufusong.top:8080/',
  timeout: 50000
})
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const { token } = store.state
    if (token) {
      config.headers.Authorization = token
    }
    // console.log(config);
    // 必须要return config 不然程序就出不去了 这一步相当于放行
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
export default request
