<template>
  <div>
    <div class="my-title">
      <img src="@/assets/bg.png" class="img" />
      <div class="my-profile" v-if="token">
        <div class="my-avatar">
          <img :src="`http://liufusong.top:8080${userInfo.avatar}`" />
        </div>
        <div class="login-btn">
          <p>{{ userInfo.nickname }}</p>
          <van-button type="primary" class="logout" round @click="logoutClick"
            >退出</van-button
          >
          <div class="edit-userInfo">
            <span>编辑个人资料</span>
            <van-icon name="play" />
          </div>
        </div>
      </div>
      <div class="my-profile" v-else>
        <div class="my-avatar">
          <img src="@/assets/avatar.png" />
        </div>
        <div class="login-btn">
          <p>游客</p>
          <van-button
            type="primary"
            class="login"
            @click="$router.push({ name: 'login' })"
            >去登录</van-button
          >
        </div>
      </div>
    </div>
    <van-grid :column-num="3" :border="false" clickable>
      <van-grid-item icon="star-o" text="我的收藏" @click="clickStar" />
      <van-grid-item icon="wap-home-o" text="我的出租" @click="clickRent" />
      <van-grid-item icon="clock-o" text="看房记录" />
      <van-grid-item icon="credit-pay" text="成为房主" />
      <van-grid-item icon="user-circle-o" text="个人资料" />
      <van-grid-item icon="service-o" text="联系我们" />
    </van-grid>
    <div class="join">
      <img src="@/assets/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  created () {
    this.loadUserInfo()
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    logoutClick () {
      this.$dialog.confirm({
        title: '提示',
        message: '是否确定退出？',
        confirmButtonColor: '#108ee9'
      })
        .then(() => {
          this.$store.commit('setUser', '')
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserInfo () {
      try {
        const res = await getUserInfo()
        // console.log(res)
        this.userInfo = res.data.body
      } catch (err) {
        // console.log(err)
        this.$toast.fail('获取用户信息失败，请重试')
      }
    },
    clickStar () {
      const url = this.token ? 'favorate' : 'login'
      this.$router.push({ name: url })
    },
    clickRent () {
      const url = this.token ? 'rent' : 'login'
      this.$router.push({ name: url })
    }
  },
  computed: {
    ...mapState(['token'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.my-title {
  min-height: 650px;
  position: relative;
}
.img {
  width: 100%;
  height: 388px;
}
.my-profile {
  position: absolute;
  top: 272px;
  left: 58px;
  width: 85%;
  height: 360px;
  background-color: #fff;
  box-shadow: 0 0 10px 3px #ddd;
  .my-avatar {
    width: 120px;
    height: 120px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 8px solid #f5f5f5;
    border-radius: 50%;
    box-shadow: 0 2px 2px #bdbdbd;
    img {
      width: 100%;
    }
  }
  .edit-userInfo {
    margin-top: 60px;
    font-size: 24px;
    color: #999;
  }
}
.login-btn {
  text-align: center;
  padding-top: 80px;
  font-size: 26px;
  .login {
    width: 144px;
    height: 64px;
    margin-top: 4px;
    border-radius: 10px;
  }
  .logout {
    width: 108px;
    height: 40px;
    font-size: 24px;
  }
  .van-button--normal {
    padding: 0;
  }
}
/deep/.van-grid-item {
  height: 190px;
  .van-icon {
    font-size: 40px;
  }
  .van-grid-item__text {
    font-size: 26px;
  }
}
.join {
  width: 100%;
  text-align: center;
  img {
    width: 92%;
  }
}
</style>
