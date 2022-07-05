<template>
  <div>
    <van-nav-bar title="地图找房" left-arrow @click-left="$router.back()" />
    <div id="container" style="width: 100vw; height: 100vh"></div>
  </div>
</template>

<script>
import { housesLocal } from '@/api/maps'
import { mapState } from 'vuex'
const { BMapGL } = window
const labelStyle = { // 设置label的样式
  color: '#fff',
  fontSize: '14px',
  // width: '40px',
  // height: '40px',
  borderRadius: '50%',
  // backgroundColor: 'pink',
  textAlign: 'center',
  lineHeight: '40px'
}
const div = `width: 70px;
    height: 70px;
    line-height: 1;
    display: inline-block;
    position: absolute;
    border-radius: 100%;
    background: rgba(12,181,106,.9);
    color: #fff;
    border: 2pxsolidhsla(0,0%,100%,.8);
    text-align: center;
    cursor: pointer;
`
// const myCity = new BMapGL.LocalCity()
// const map = new BMapGL.Map('container')
export default {
  async created () {
    try {
      const res = await housesLocal(this.currentCity.value)
      // console.log(res.data.body)
      this.list = res.data.body
      // this.renderMap(res.data.body)
      res.data.body.forEach(item => {
        this.renderMap(item)
      })
    } catch (err) {
      console.log(err)
    }
  },
  mounted () {
    const label = this.currentCity.label
    this.map = new BMapGL.Map('container')
    const map = this.map
    // 创建地址解析器实例
    const myGeo = new BMapGL.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(label, async point => {
      if (point) {
        map.centerAndZoom(point, 11)
        map.addControl(new BMapGL.ScaleControl())
        map.addControl(new BMapGL.NavigationControl())
      }
    }, label)
    // const point = new BMapGL.Point(116.404, 39.915)
    // 创建点坐标
    // map.centerAndZoom(point, 15)
    // 初始化地图，设置中心点坐标和地图级别

    map.centerAndZoom(new BMapGL.Point(116.404, 39.928), 15)
    map.enableScrollWheelZoom(true)
  },
  data () {
    return {
      map: {}
    }
  },
  methods: {
    renderMap (item) {
      // const map = new BMapGL.Map('container')
      const { latitude, longitude } = item.coord
      // 每个区在区的中心点画一个标记
      const point = new BMapGL.Point(longitude, latitude)// 经纬度在接口中通过城市名字获取
      const label = new BMapGL.Label('', { // 创建文本标注
        position: point,
        offset: new BMapGL.Size(10, 20)
      })
      label.setStyle(labelStyle)
      label.setContent(`
      <div style="${div}">
      <p>${item.label}</p>
      <p>${item.count}套</p>
      </div>`)
      this.map.addOverlay(label) // 将标注添加到地图中
      // label.addEventListener('click', function () {
      //   map.centerAndZoom(point, 8)
      // })
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
  background-color: pink;
}
</style>
