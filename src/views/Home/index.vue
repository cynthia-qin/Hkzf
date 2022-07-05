<template>
  <div>
    <!-- <router-view></router-view> -->
    <div class="headers">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <van-search disabled show-action placeholder="请输入小区或地址">
        <template #label>
          <span @click="$router.push({ name: 'area' })">{{
            currentCity.label
          }}</span>
          <i class="border">|</i>
        </template>
        <template #action>
          <van-icon name="guide-o" @click="$router.push({ name: 'map' })" />
        </template>
      </van-search>
    </div>
    <van-grid>
      <van-grid-item text="整租" @click="goList">
        <template #icon>
          <img src="@/assets/all.png" alt="" />
        </template>
      </van-grid-item>
      <van-grid-item text="合租" @click="goList">
        <template #icon>
          <img src="@/assets/each.png" alt="" />
        </template>
      </van-grid-item>
      <van-grid-item text="地图找房" @click="$router.push({ name: 'map' })">
        <template #icon>
          <img src="@/assets/local.png" alt="" />
        </template>
      </van-grid-item>
      <van-grid-item text="去出租" @click="goPub">
        <template #icon>
          <img src="@/assets/rent.png" alt="" />
        </template>
      </van-grid-item>
    </van-grid>
    <div class="rentList">
      <h6 class="title">
        租房小组
        <span>更多</span>
      </h6>
      <van-row>
        <van-col v-for="item in groupsList" :key="item.id">
          <img
            :src="`http://liufusong.top:8080${item.imgSrc}`"
            alt=""
            class="left"
          />
          <div class="right">
            <p>{{ item.title }}</p>
            <p>{{ item.desc }}</p>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getSwiper, getHouseGroups } from '@/api/home'
export default {
  name: 'homeIndex',
  created () {
    this.loadSwiper()
    this.loadGroups()
  },
  data () {
    return {
      images: [],
      groupsList: []
    }
  },
  methods: {
    async loadSwiper () {
      try {
        const res = await getSwiper()
        // console.log(res.data.body)
        res.data.body.forEach(item => {
          this.images.push(`http://liufusong.top:8080${item.imgSrc}`)
        })
      } catch (err) {
        console.log(err)
      }
    },
    async loadGroups () {
      try {
        const res = await getHouseGroups(this.currentCity.value)
        // console.log(res)
        this.groupsList = res.data.body
      } catch (err) {
        this.$toast('获取租房小组数据失败')
      }
    },
    goList () {
      this.$router.push({ name: 'list' })
    },
    goPub () {
      if (this.token) {
        this.$router.push({ name: 'add' })
      } else {
        this.$router.push({ name: 'login' })
      }
    }
  },
  computed: {
    ...mapState(['currentCity', 'token'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less" >
/deep/.headers {
  position: relative;
  width: 100%;
  height: 424px;
  // background-color: pink;
  display: flex;
  align-items: center;
  .van-swipe {
    width: 100%;
    height: 100%;
    img {
      height: 100%;
    }
  }
  .van-search {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    width: 100%;
    padding: 0 20px;
    background-color: rgba(255, 255, 255, 0);
    .van-search__content {
      height: 68px;
      padding: 5px 5px 5px 8px;
      margin: 0 20px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }
    .van-search__action {
      padding: 0;
    }
    .van-icon {
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 50px;
      color: #fff;
    }
    span {
      &::after {
        position: absolute;
        top: 36px;
        left: 122px;
        margin-top: -0.13333rem;
        border: 0.07rem solid;
        border-color: transparent transparent #333 #333;
        transform: rotate(-45deg);
        opacity: 0.7;
        content: "";
      }
    }
    .border {
      position: absolute;
      top: 0;
      left: 160px;
      color: #ccc;
    }
    .van-cell {
      margin-left: 38px;
      padding-left: 24px;
    }
  }
}
/deep/.van-grid-item__content {
  width: 178px;
  height: 224px;
  padding: 20px 0;
  justify-content: space-between;
  box-sizing: border-box;
}

.van-grid-item__icon-wrapper {
  img {
    width: 120px;
    height: 120px;
  }
}
/deep/.van-grid-item__text {
  font-size: 28px;
}
/deep/.rentList {
  padding: 0 20px;
  background-color: #f6f5f6;
  .title {
    margin: 30px 0 30px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    span {
      font-weight: normal;
      color: #787d82;
    }
  }
  .van-row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .van-col {
      width: 345px;
      height: 120px;
      background-color: #fff;
      margin-bottom: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      text-align: left;
      .left {
        width: 100px;
        height: 100px;
        margin: 0 20px;
      }
      .right {
        font-size: 28px;
        line-height: 1.1;
        p {
          margin: 0;
        }
      }
    }
  }
}
</style>
