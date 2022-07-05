<template>
  <div>
    <van-nav-bar title="房屋管理" left-arrow @click-left="$router.back()" />
    <Empty v-if="list.length === 0">
      <p class="pub">
        您还没有房源，<span @click="$router.push({ name: 'add' })"
          >去发布房源</span
        >吧~
      </p>
    </Empty>
    <HouseList v-else :list="list" />
  </div>
</template>

<script>
import Empty from '@/components/Empty.vue'
import HouseList from '@/components/HouseList.vue'
import { pubHouse } from '@/api/housedetail'
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
        const res = await pubHouse()
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
    Empty,
    HouseList
  }
}
</script>

<style scoped lang="less">
.pub {
  color: #333;
  span {
    color: #21b97a;
  }
}
</style>
