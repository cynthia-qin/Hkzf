<template>
  <div>
    <div class="header">
      <van-icon name="arrow-left" />
      <div class="input">
        <span class="city" @click="$router.push({ name: 'area' })">{{
          currentCity.label || "北京"
        }}</span>
        <van-button disabled type="default" icon="search"
          >请输入小区或地址</van-button
        >
      </div>
      <van-icon name="guide-o" @click="$router.push({ name: 'map' })" />
    </div>
    <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item title="区域" ref="area">
          <van-picker
            value-key="label"
            :columns="columns"
            toolbar-position="bottom"
            @cancel="$refs.area.toggle()"
            @confirm="onConfirm"
            show-toolbar
          />
        </van-dropdown-item>
        <van-dropdown-item title="方式" ref="method">
          <van-picker
            show-toolbar
            value-key="label"
            :columns="houseMessage.rentType"
            toolbar-position="bottom"
            @cancel="$refs.method.toggle()"
            @confirm="onConfirmFnA"
          />
        </van-dropdown-item>
        <van-dropdown-item title="租金" ref="renMoney">
          <van-picker
            show-toolbar
            value-key="label"
            :columns="houseMessage.price"
            toolbar-position="bottom"
            @cancel="$refs.renMoney.toggle()"
            @confirm="onConfirmFnB"
          />
        </van-dropdown-item>
        <van-dropdown-item title="筛选" id="filter" ref="filter">
          <!-- <van-popup v-model="showPicker" round> -->
          <van-picker
            show-toolbar
            toolbar-position="bottom"
            @cancel="$refs.filter.toggle()"
            @confirm="clickConfirmc"
          >
            <template #columns-top>
              <div class="choose">
                <dl>
                  <dt class="choose-title">户型</dt>
                  <dd class="choose-key">
                    <span
                      class="key-type"
                      :class="{
                        active: roomSelected.indexOf(item.value) !== -1,
                      }"
                      v-for="(item, index) in houseMessage.roomType"
                      :key="index"
                      @click="clickChoose(roomSelected, item)"
                      >{{ item.label }}</span
                    >
                  </dd>
                  <dt class="choose-title">朝向</dt>
                  <dd class="choose-key">
                    <span
                      class="key-type"
                      :class="{
                        active: orientedSelected.indexOf(item.value) !== -1,
                      }"
                      @click="clickChoose(orientedSelected, item)"
                      v-for="(item, index) in houseMessage.oriented"
                      :key="index"
                      >{{ item.label }}</span
                    >
                  </dd>
                  <dt class="choose-title">楼层</dt>
                  <dd class="choose-key">
                    <span
                      class="key-type"
                      :class="{
                        active: floorSelected.indexOf(item.value) !== -1,
                      }"
                      @click="clickChoose(floorSelected, item)"
                      v-for="(item, index) in houseMessage.floor"
                      :key="index"
                      >{{ item.label }}</span
                    >
                  </dd>
                  <dt class="choose-title">房屋亮点</dt>
                  <dd class="choose-key">
                    <span
                      class="key-type"
                      :class="{
                        active: charSelected.indexOf(item.value) !== -1,
                      }"
                      @click="clickChoose(charSelected, item)"
                      v-for="(item, index) in houseMessage.characteristic"
                      :key="index"
                      >{{ item.label }}</span
                    >
                  </dd>
                </dl>
              </div>
            </template>
          </van-picker>
          <!-- </van-popup> -->
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>
    <!-- 房源列表 -->
    <van-list
      v-if="housesList.length > 0"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <HouseListVue :list="housesList" />
      <!-- <van-cell
        v-for="(item, index) in housesList"
        :key="index"
        :title="item.desc"
      /> -->
    </van-list>
    <Empty v-else>
      <p>暂无房源</p>
    </Empty>
  </div>
</template>

<script>
import Empty from '@/components/Empty.vue'
import HouseListVue from '@/components/HouseList.vue'
import { mapState } from 'vuex'
import { searchHouse, houses } from '@/api/find'
const H_M = 'houseMessage'
let key = null
export default {
  created () {
    this.loadHouseMes()
    this.renderHousesList()
    const area = this.areaFormat(this.houseMessage.area.children)
    const subway = this.areaFormat(this.houseMessage.subway.children)
    // console.log(area)
    // console.log(subway)
    this.columns = [{ label: '区域', children: area }, { label: '地铁', children: subway }]
  },
  data () {
    return {
      columns: [],
      houseMessage: JSON.parse(window.localStorage.getItem(H_M)) || {},
      housesList: [],
      loading: false,
      finished: false,
      state: {
        area: '',
        subway: '',
        rentType: '',
        price: ''
      },
      roomSelected: [],
      orientedSelected: [],
      floorSelected: [],
      charSelected: []
    }
  },
  methods: {
    async loadHouseMes () {
      try {
        const res = await searchHouse(this.currentCity.value)
        // console.log(res)
        this.houseMessage = res.data.body
        window.localStorage.setItem(H_M, JSON.stringify(res.data.body))
      } catch (err) {
        console.log(err)
      }
      // console.log(this.columns[0])
      // console.log(Object.keys(this.houseMessage.area))
    },
    async renderHousesList () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await houses({
          cityId: this.currentCity.value,
          stat: 1,
          end: 20,
          more: this.more,
          ...this.state
        })
        // console.log(res)
        this.housesList.push(...res.data.body.list)
        if (this.housesList.length === res.data.body.count) {
          this.finished = true
        }
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.renderHousesList()
    },
    areaFormat (Arr) {
      return Arr.map(item => {
        return {
          label: item.label,
          value: item.value,
          children: item.children
            ? item.children.map(v => ({
              label: v.label,
              value: v.value
            }))
            : [{ label: '' }]
        }
      })
    },
    onConfirm (value) {
      console.log(value)
      const val = value[2] ? value[2] : value[1]
      const result = this.findValue(this.columns[0].children, val)
      if (value[0] === '区域') {
        this.state.area = result
      } else {
        this.state.subway = result
      }
      this.$refs.area.toggle()
      this.housesList = []
      this.renderHousesList()
    },
    findValue (arr, val) {
      // console.log(arr, val)
      arr.forEach(item => {
        if (item.label === val) {
          key = item.value
        } else if (item.children && item.children.length > 0) {
          this.findValue(item.children, val)
        }
      })
      console.log(key)
      return key
    },
    onConfirmFnA (value) {
      // console.log(value)
      this.state.rentType = value.value
      this.$refs.method.toggle()
      this.housesList = []
      this.renderHousesList()
    },
    onConfirmFnB (value) {
      // console.log(value)
      this.state.price = value.value
      this.$refs.renMoney.toggle()
      this.housesList = []
      this.renderHousesList()
    },
    clickChoose (Array, val) {
      // console.log(Array, val)
      // console.log(this.roomSelected)
      if (Array.length === 0) {
        Array.push(val.value)
      } else if (Array.indexOf(val.value) !== -1) {
        const index = Array.findIndex(item => item === val.value)
        Array.splice(index, 1)
      } else {
        Array.push(val.value)
      }
    },
    clickConfirmc () {
      this.$refs.filter.toggle()
      this.housesList = []
      this.renderHousesList()
    }

  },
  computed: {
    ...mapState(['currentCity']),
    more () {
      const str1 = this.roomSelected.join(',')
      const str2 = this.orientedSelected.join(',')
      const str3 = this.floorSelected.join(',')
      const str4 = this.charSelected.join(',')
      return str1 + ',' + str2 + ',' + str3 + ',' + str4
    }
  },
  watch: {},
  filters: {},
  components: {
    HouseListVue,
    Empty
  }
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  color: #fff;
  background-color: #21b97a;
  .van-icon-arrow-left {
    font-size: 40px;
  }
  .van-icon-location-o {
    font-size: 50px;
  }
  .input {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 10px 10px 16px;
    margin-left: 40px;
    margin-right: 20px;
    height: 68px;
    font-size: 28px;
    background-color: #fff;
    border-radius: 6px;
    box-sizing: border-box;
    .city {
      color: #333;
      &::after {
        position: absolute;
        top: 52px;
        left: 180px;
        margin-top: -0.13333rem;
        border: 0.07rem solid;
        border-color: transparent transparent #333 #333;
        transform: rotate(-45deg);
        opacity: 0.7;
        content: "";
      }
    }
    .van-button {
      height: unset;
      border: none;
      margin-left: 48px;
      color: #999;
      border-left: 1px solid #ccc;
    }
  }
}
/deep/.van-dropdown-menu__bar {
  height: 80px;
  border-bottom: 1px solid #e4e6f0;
  .van-ellipsis {
    font-size: 34px;
  }
}

/deep/.van-picker__columns {
  height: 476px;
}

/deep/.van-picker__toolbar {
  display: flex;
  width: 100%;
  margin-top: 20px;
  border-top: 1px solid #e9e9e9;
}
/deep/.van-picker__cancel {
  flex: 1;
  color: #21b97a;
}
/deep/.van-picker__confirm {
  flex: 2;
  color: #fff;
  background-color: #21b97a;
}

#filter {
  /deep/.van-dropdown-item {
    position: unset;
  }
  /deep/.van-dropdown-item__content {
    position: fixed;
    min-height: 1400px;
  }
  /deep/.van-overlay {
    height: 1334px;
  }
  /deep/.van-popup--top {
    left: unset;
    right: 0;
    width: 75%;
  }
  /deep/.van-picker {
    height: 1334px;
    padding-bottom: 100px;
    .van-picker__mask {
      background: unset;
    }
  }
  /deep/.van-picker__columns {
    position: unset;
    display: none;
  }
  /deep/.van-picker__toolbar {
    position: fixed;
    bottom: 0;
  }
  /deep/.van-picker__cancel {
    background-color: #fff;
  }
  .choose {
    padding-bottom: 100px;
    margin-bottom: -476px;
    .choose-title {
      padding: 0 30px;
      margin: 40px 0;
      font-size: 30px;
      color: #333;
    }
    .choose-key {
      margin-left: 80px;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 14px;
      .key-type {
        display: inline-block;
        height: 64px;
        width: 140px;
        margin: 0 36px 30px 0;
        border: 1px solid #ddd;
        border-radius: 6px;
        line-height: 64px;
        text-align: center;
        font-size: 24px;
        color: #888;
      }
      .active {
        border: 1px solid #21b97a;
        color: #21b97a;
        background-color: #defaef;
      }
    }
  }
}
</style>
