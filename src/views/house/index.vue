<template>
  <div class="main">
    <van-nav-bar
      :title="houseData.community"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="H_img">
      <van-swipe :autoplay="3000" class="headerImages">
        <van-swipe-item
          v-for="(image, index) in houseData.houseImg"
          :key="index"
        >
          <img v-lazy="`http://liufusong.top:8080${image}`" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="houseInfo">
      <h3>{{ houseData.title }}</h3>
      <van-tag
        :color="colors[index]"
        :text-color="textColors[index]"
        v-for="(val, index) in houseData.tags"
        :key="index"
        >{{ val }}</van-tag
      >
      <div class="desc">
        <div class="item">
          <p>
            <b>{{ houseData.price }}</b
            >/月
          </p>
          <span>租金</span>
        </div>
        <div class="item">
          <p>
            <b>{{ houseData.roomType }}</b>
          </p>
          <span>房型</span>
        </div>
        <div class="item">
          <p>
            <b>{{ houseData.size }}</b
            >平米
          </p>
          <span>面积</span>
        </div>
      </div>
      <div class="acount">
        <span> 装修：<span>精装</span></span>
        <span
          >朝向：
          <span v-for="(val, index) in houseData.oriented" :key="index">{{
            val
          }}</span></span
        >
      </div>
      <div class="acount">
        <span>
          楼层：<span>{{ houseData.floor }}</span></span
        >
        <span>类型： <span>普通住宅</span></span>
      </div>
    </div>
    <div class="local">
      <p>小区：<span>天山星城</span></p>
      <div class="img" id="map"></div>
      <div class="box">
        <h5>房屋配套</h5>
        <span
          v-show="houseData.supporting.length !== 0"
          v-for="(val, index) in houseData.supporting"
          :key="index"
          >{{ val }}</span
        >
        <span v-show="houseData.supporting === 'undefined'">暂无数据</span>
      </div>
    </div>
    <div class="houseMessage">
      <h3>房源概况</h3>
      <div class="ms">
        <div class="owner">
          <img src="http://liufusong.top:8080/img/avatar.png" alt="" />
          <div class="owner_info">
            <p>王女士</p>
            <van-icon name="certificate" />
            <span>已认证房主</span>
          </div>
        </div>
        <van-button plain type="primary" class="send_sms">发消息</van-button>
      </div>
      <div class="content">{{ houseData.description }}</div>
    </div>
    <div class="guess">
      <h3>猜你喜欢</h3>
      <HouseListVue :list="recommendHouses" />
    </div>
    <div class="footBar">
      <div class="collected" @click="isCollected()">
        <van-icon :name="isFavorite ? 'star' : 'star-o'" />
        <span>收藏</span>
      </div>
      <div class="question">在线咨询</div>
      <div class="booking">电话预约</div>
    </div>
  </div>
</template>

<script>
import { housesDetails, housesCollectedState, Collectedhouses, delCollectedHouses } from '@/api/housedetail'
import HouseListVue from '@/components/HouseList.vue'
import { mapState } from 'vuex'
const { BMapGL } = window
const labelStyle = {
  position: 'absolute',
  zIndex: -7982820,
  backgroundColor: 'rgb(238, 93, 91)',
  color: 'rgb(255, 255, 255)',
  height: 25,
  padding: '5px 10px',
  lineHeight: '14px',
  borderRadius: 3,
  boxShadow: 'rgb(204, 204, 204) 2px 2px 2px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  userSelect: 'none'
}
const mapArrow = `
  background: url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat;
  position: absolute;
  width: 11px;
  height: 10px;
  top: 23px;
  left: 10px;
  overflow: hidden
`
export default {
  created () {
    this.loadDetails()
  },
  data () {
    return {
      id: this.$route.params.id,
      colors: ['#e1f5f8', '#e1f5ed', '#e6f2ff', '#e1f5f8', '#e1f5ed', '#e6f2ff'],
      textColors: ['#39becd', '#3fc28c', '#5aabfd', '#39becd', '#3fc28c', '#5aabfd'],
      houseData: {},
      recommendHouses: [
        {
          id: 1,
          houseImg: '/img/message/1.png',
          desc: '72.32㎡/南 北/低楼层',
          title: '安贞西里 3室1厅',
          price: 4500,
          tags: ['随时看房']
        },
        {
          id: 2,
          houseImg: '/img/message/2.png',
          desc: '83㎡/南/高楼层',
          title: '天居园 2室1厅',
          price: 7200,
          tags: ['近地铁']
        },
        {
          id: 3,
          houseImg: '/img/message/3.png',
          desc: '52㎡/西南/低楼层',
          title: '角门甲4号院 1室1厅',
          price: 4300,
          tags: ['集中供暖']
        }
      ],
      isFavorite: null
    }
  },
  methods: {
    async loadDetails () {
      try {
        const res = await housesDetails(this.id)
        console.log(res)
        const { data: { body } } = await housesCollectedState(this.id)
        console.log(body)
        this.renderMap(res.data.body.community, res.data.body.coord)
        this.isFavorite = body?.isFavorite
        this.houseData = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    async isCollected () {
      if (this.token) {
        // 收藏
        try {
          if (this.isFavorite) {
            await delCollectedHouses(this.id)
            this.$toast.success('取消收藏房屋成功')
          } else {
            await Collectedhouses(this.id)
            this.$toast.success('收藏房屋成功')
          }
          this.isFavorite = !this.isFavorite
        } catch (err) {
          console.log(err)
          this.$toast.fail('操作失败请重试')
        }
      } else {
        // 操作是否跳转登录
        this.$dialog.confirm({
          title: '好客租房',
          message: '您还未登录，是否跳转登录页面？',
          confirmButtonColor: '#108ee9'
        })
          .then(() => {
            this.$router.push({ name: 'login' })
          })
          .catch(() => {
            // on cancel
          })
      }
    },
    renderMap (community, coord) {
      console.log(community)
      const { latitude, longitude } = coord

      const map = new BMapGL.Map('map')
      const point = new BMapGL.Point(longitude, latitude)
      map.centerAndZoom(point, 17)

      const label = new BMapGL.Label('', {
        position: point,
        offset: new BMapGL.Size(0, -36)
      })

      label.setStyle(labelStyle)
      label.setContent(`
        <span>${community}</span>
        <div style="${mapArrow}"></div>
      `)
      map.addOverlay(label)
    }
  },
  computed: {
    ...mapState(['token'])
  },
  watch: {},
  filters: {},
  components: {
    HouseListVue
  }
}
</script>

<style scoped lang="less">
.main {
  background-color: #f5f5f9;
}
.H_img {
  width: 100%;
  height: 544px;
}
.headerImages {
  width: 100%;
  height: 490px;
  // background-color: pink;
  img {
    width: 100%;
    height: 100%;
    // vertical-align: middle;
  }
}
.houseInfo {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  h3 {
    margin: 32px 0;
    font-size: 32px;
    font-weight: normal;
    color: #333;
  }
  .desc {
    width: 100%;
    display: flex;
    // align-items: center;
    .item {
      flex: 1;
      padding: 30px 0;
      margin: 30px 0;
      text-align: center;
      border-top: 1px solid #cecece;
      border-bottom: 1px solid #cecece;
      p {
        margin: 0;
        color: #fa5741;
        font-size: 36px;
      }
      span {
        color: #999;
        font-size: 28px;
      }
    }
  }
  .acount {
    height: 52px;
    font-size: 26px;
    color: #999;
    span {
      display: inline-block;
      width: 50%;
      color: #333;
      // &:first-child {
      //   margin-right: 200px;
      // }
    }
  }
}
.local {
  margin-top: 20px;
  background-color: #fff;
  p {
    margin: 0 23px;
    font-size: 28px;
    height: 88px;
    line-height: 88px;
  }
  .img {
    width: 100%;
    height: 350px;
    background-color: pink;
  }
  .box {
    margin: 0 20px 20px;
    h5 {
      margin: 0;
      font-size: 30px;
      padding: 30px 0;
      border-bottom: 1px solid #cecece;
    }
    span {
      margin-right: 10px;
      font-size: 28px;
      color: #333;
    }
  }
}
.houseMessage {
  padding: 0 20px;
  margin-bottom: 20px;
  background-color: #fff;
  h3 {
    margin: 0;
    margin-bottom: 20px;
    height: 104px;
    padding: 30px 0;
    font-size: 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #cecece;
  }
  .ms {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    .owner {
      display: flex;
      align-items: center;
      img {
        width: 104px;
        height: 104px;
        margin: 20px 20px 0 0;
        border-radius: 50%;
      }
      .owner_info {
        padding: 30px 0 0 10px;
        font-size: 28px;
        color: #fa5741;
        p {
          margin: 0;
          color: #333;
        }
      }
    }
    .send_sms {
      width: 150px;
      height: 60px;
    }
  }
  .content {
    padding: 20px 0;
    font-size: 14px;
    color: #333;
  }
}
.guess {
  padding: 0 20px 100px;
  background-color: #fff;
  h3 {
    padding: 30px 0;
    margin: 0;
    margin-bottom: 20px;
    font-size: 30px;
    color: #333;
    border-bottom: 1px solid #cecece;
  }
}
.footBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 100px;
  font-size: 34px;
  color: #999;
  background-color: #fff;
  text-align: center;
  border-top: 1px solid #cecece;
  .collected,
  .question,
  .booking {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .question {
    border-left: 1px solid #cecece;
    border-right: 1px solid #cecece;
  }
  .booking {
    flex: 1.2;
    color: #fff;
    background-color: #21b97a;
  }
}
/deep/.van-icon-star {
  color: #fa5741;
}
</style>
