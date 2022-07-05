<template>
  <div class="main">
    <van-nav-bar
      title="城市列表"
      left-arrow
      @click-left="$router.back()"
      :z-index="3"
    />
    <van-index-bar :index-list="indexList">
      <div
        class="div"
        v-for="(val, index) in indexList"
        :key="index"
        :sticky="false"
      >
        <van-index-anchor :index="val">
          {{
            val === "#" ? "当前城市" : val === "热" ? "热门城市" : val
          }}</van-index-anchor
        >
        <van-cell
          @click="handleCellClick(item)"
          :title="item.label"
          v-for="(item, index) in allCityList[val]"
          :key="index"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { hotCity, allCity } from '@/api/area'
import { mapState } from 'vuex'
export default {
  name: 'areaIndex',
  created () {
    // this.loadHotCity()
    this.loadAllCity()
  },
  data () {
    return {
      indexList: ['#', '热'],
      hotCityList: [],
      allCityList: {}
      // allCityListIndex: []
    }
  },
  methods: {
    async loadAllCity () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await hotCity()
        // console.log(res)
        this.hotCityList = res.data.body
        this.allCityList = { ...this.allCityList, 热: [...this.hotCityList], '#': [{ ...this.currentCity }] }
        this.loadCityList()
        // this.$toast.success('加载成功')
      } catch (err) {
        // console.log(err)
        this.$toast('加载失败')
      }
    },
    async loadCityList () {
      try {
        const { data } = await allCity(1)
        const cityList = {}
        data.body.forEach(item => {
          const first = item.short.substr(0, 1).toUpperCase()
          if (cityList[first]) {
            cityList[first].push(item)
          } else {
            cityList[first] = [item]
          }
        })
        this.allCityList = { ...this.allCityList, ...cityList }
        const allCityListIndex = Object.keys(cityList).sort()
        this.indexList = [...this.indexList, ...allCityListIndex]
      } catch (err) {
        console.log(err)
      }
    },
    handleCellClick (val) {
      const result = this.hotCityList.some(item => item.label === val.label)
      // console.log(result)
      // console.log(this.hotCityList.indexOf(val))
      if (result) {
        this.$store.commit('setCurrentCity', val)
        this.$router.back()
      } else {
        this.$toast('该城市暂无房源')
      }
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

<style scoped lang="less">
// .van-index-bar {
//   padding-top: 184px;
// }
.main {
  padding-top: 92px;
  .van-nav-bar {
    margin-top: -92px;
  }
}
.van-index-bar {
  box-sizing: border-box;
  direction: ltr;
  height: 1244px;
  // position: relative;
  width: 750px;
  // will-change: transform;
  overflow: hidden auto;
}
// /deep/.van-index-anchor--sticky {
//   // position: unset;
// }
/deep/.van-index-bar__sidebar {
  position: fixed;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  top: 53%;
  right: 5px;
  z-index: 3;
  height: 90%;
  box-sizing: border-box;
  padding-top: 20px;
  text-align: center;
  cursor: pointer;
  .van-index-bar__index {
    padding: 0;
    flex: 1;
    font-size: 28px;
    // line-height: 1.5;
    width: 30px;
    /* height: 15px; */
    // background-color: pink;
    border-radius: 50%;
    box-sizing: border-box;
    margin: 14px 0;
    text-align: center;
  }
  /deep/.van-cell {
    padding: 0 30px;
  }
}
/deep/.van-index-bar__index--active {
  background-color: #21b97a !important;
}
</style>
