<template>
  <div>
    <van-nav-bar title="收藏列表" left-arrow @click-left="$router.back()" />
    <HouseList :list="list" />
  </div>
</template>

<script>
import { collectedHouse } from '@/api/housedetail'
import HouseList from '@/components/HouseList.vue'
export default {
  created () {
    this.loadHouses()
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    async loadHouses () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await collectedHouse()
        // console.log(res)
        this.list = res.data.body
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取房源失败，请重试')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    HouseList
  }
}
</script>

<style scoped>
</style>
