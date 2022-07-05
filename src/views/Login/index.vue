<template>
  <div>
    <van-nav-bar title="账号登录" left-arrow @click-left="$router.back()" />
    <div class="login-form">
      <van-form @submit="onSubmit">
        <van-field
          v-model.trim="username"
          center
          name="username"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model.trim="password"
          center
          type="password"
          name="password"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div>
          <van-button block type="primary" native-type="submit"
            >登 录</van-button
          >
        </div>
      </van-form>
      <div class="reg">
        <a href="#">还没有账号，去注册~</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogin } from '@/api/user'
export default {
  name: 'loginINdex',
  created () { },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      const regUsername = /^[a-zA-Z_\d]{5,8}$/
      const regPwd = /^[a-zA-Z_\d]{5,12}$/
      if (this.username.length === 0 || this.password.length === 0) {
        return this.$toast('用户名和密码不能为空')
      }
      if (!regUsername.test(this.username)) {
        return this.$toast('用户名必须是5~8位的数字或字母')
      }
      if (!regPwd.test(this.password)) {
        return this.$toast('密码必须是5~12位的数字或字母')
      }
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true
      })
      try {
        const res = await getLogin(values)
        this.$store.commit('setUser', res.data.body.token)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        // console.log(err)
        this.$toast.fail('登录失败,请稍后重试')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
/deep/.van-nav-bar__title {
  color: #fff;
  font-size: 36px;
}
.login-form {
  margin: 42px 30px 0;
  /deep/.van-cell__value {
    font-size: 34px;
  }
  .van-cell {
    margin-bottom: 18px;
    width: 100%;
    height: 120px;
    padding: 2px 0;
  }

  /deep/.van-button {
    width: 690px;
    height: 100px;
    margin-top: 54px;
    font-size: 36px;
  }
}
.reg {
  margin: 60px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  a {
    color: #666;
  }
}
</style>
