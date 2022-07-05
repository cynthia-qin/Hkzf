<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/home/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/home/list" icon="search">找房</van-tabbar-item>
      <van-tabbar-item to="/home/news" icon="newspaper-o">资讯</van-tabbar-item>
      <van-tabbar-item to="/home/profile" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
.van-tabbar {
  border-top: 1px solid #ddd;
}
</style>
