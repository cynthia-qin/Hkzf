<template>
  <div>
    <van-nav-bar title="地图找房" left-arrow @click-left="$router.back()" />
    <!-- <div id="container"></div> -->
    <div id="container"></div>
  </div>
</template>

<script>
import { housesLocal } from '@/api/maps'
import { mapState } from 'vuex'
const { BMapGL } = window
const myCity = new BMapGL.LocalCity()
const labelStyle = { // 设置label的样式
  color: '#fff',
  fontSize: '14px',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: 'pink',
  textAlign: 'center',
  lineHeight: '40px'
}
export default {
  async created () {
    try {
      const res = await housesLocal(this.currentCity.value)
      // console.log(res.data.body)
      this.list = res.data.body
      this.renderMap(res.data.body)
    } catch (err) {
      console.log(err)
    }
  },
  mounted () {
    // const { BMapGL } = window
    // const myCity = new BMapGL.LocalCity()// 获取当前电脑所在的城市
    // myCity.get((result) => {
    //   console.log(this.list)
    //   console.log(result)// 杭州
    //   const map = new BMapGL.Map('container')
    //   const point = new BMapGL.Point(result.center.lng, result.center.lat)// 绘制地图
    //   map.centerAndZoom(point, 15)// 根据某城市的中心点绘制图 15是缩放级别

    //   // 每个区在区的中心点画一个标记
    //   const point1 = new BMapGL.Point(116.449979, 39.912338)// 经纬度在接口中通过城市名字获取
    //   const content = '朝阳'
    //   const label = new BMapGL.Label(content, { // 创建文本标注
    //     position: point1,
    //     offset: new BMapGL.Size(10, 20)
    //   })
    //   map.addOverlay(label) // 将标注添加到地图中
    //   label.setStyle({ // 设置label的样式
    //     color: '#fff',
    //     fontSize: '14px',
    //     width: '40px',
    //     height: '40px',
    //     borderRadius: '50%',
    //     backgroundColor: 'pink',
    //     textAlign: 'center',
    //     lineHeight: '40px'
    //   })

    //   label.addEventListener('click', function () {
    //     map.centerAndZoom(point1, 18)
    //   })
    // })
  },
  data () {
    return {
      a: 1,
      list: []
    }
  },
  methods: {
    renderMap (Array) {
      myCity.get((result) => {
        console.log(result)
        const map = new BMapGL.Map('container')
        const point = new BMapGL.Point(result.center.lng, result.center.lat)// 绘制地图
        map.centerAndZoom(point, 15)// 根据某城市的中心点绘制图 15是缩放级别
        Array.forEach(item => {
          const { latitude, longitude } = item.coord
          // 每个区在区的中心点画一个标记
          const point = new BMapGL.Point(longitude, latitude)// 经纬度在接口中通过城市名字获取
          const content = item.label
          const label = new BMapGL.Label(content, { // 创建文本标注
            position: point,
            offset: new BMapGL.Size(10, 20)
          })
          console.log(label)
          map.addOverlay(label) // 将标注添加到地图中
          label.setStyle(labelStyle)
          label.addEventListener('click', function () {
            map.centerAndZoom(point, 18)
          })
        })
      })
    }
  },
  computed: {
    ...mapState(['currentCity'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
#container {
  width: 100vw;
  height: 100vh;
}
</style>
