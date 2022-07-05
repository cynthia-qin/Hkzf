import { getCurrentCity } from '../api/area'
// import store from '@/store'
// 声明BMap
const BMap = window.BMap
// 获取当前定位城市
export const getCurrentPositionCity = () => {
  return new Promise((resolve) => {
    // 优先获取本地城市
    const localCity = localStorage.getItem('hkzf_city')
    // const localCity = store.state.currentCity
    if (localCity) return resolve(JSON.parse(localCity))
    // 如果本地没有发送请求获取
    const myCity = new BMap.LocalCity()
    // 获取当前城市信息
    myCity.get(async res => {
      // 根据当前城市名字获取城市
      const { data: CityRes } = await getCurrentCity(res.name)
      // 保存到本地
      localStorage.setItem('hkzf_city', JSON.stringify(CityRes.body))
      // 通过resolve向外暴漏数据
      resolve(CityRes.body)
    })
  })
}
