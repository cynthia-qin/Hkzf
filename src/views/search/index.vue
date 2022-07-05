<template>
  <div>
    <div class="search">
      <div class="input" :style="{ paddingLeft: isFocus ? '' : '80px' }">
        <van-icon name="search" />
        <input
          type="search"
          v-model.trim="searchText"
          placeholder="请输入小区或地址"
          @blur="Fn"
          @focus="isFocus = true"
        />
      </div>
      <div class="cancel" @click="$router.back()">取消</div>
    </div>
    <van-cell-group v-if="sugList.length > 0">
      <van-cell
        :title="item.communityName"
        v-for="(item, index) in sugList"
        :key="index"
        @click="$router.push({ name: 'add', params: { housing: item } })"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getCommunity } from '@/api/search'
import { mapState } from 'vuex'
let timer = null
export default {
  created () {

  },
  data () {
    return {
      isFocus: false,
      searchText: '',
      sugList: []
    }
  },
  methods: {
    Fn () {
      if (this.searchText === '') {
        this.isFocus = false
      }
    }
  },
  computed: {
    ...mapState(['currentCity'])
  },
  watch: {
    searchText: {
      immediate: true,
      handler (val) {
        // this.sugList = []
        console.log(val)
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            if (val !== '') {
              const res = await getCommunity(this.currentCity.label, this.currentCity.value)
              this.sugList = res.data.body.filter(item => item.communityName.includes(val))
            }
          } catch (err) {
            console.log(err)
          }
        }, 900)
      }
    }
  },
  beforeDestroy () {
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.search {
  width: 100%;
  height: 88px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background-color: #f6f5f6;
  font-size: 30px;
  .input {
    width: 642px;
    height: 56px;
    background-color: #fff;
    line-height: 56px;
    color: #999;
    box-sizing: border-box;
    transition: all 0.3s;
    input {
      color: #000;
      border: 0;
      &::placeholder {
        color: #999;
      }
    }
  }
}
.van-cell__title {
  span {
    font-size: 28px;
  }
}
</style>
