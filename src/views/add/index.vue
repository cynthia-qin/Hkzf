<template>
  <div class="main">
    <van-nav-bar
      title="发布房源"
      left-arrow
      @click-left="$router.push({ name: 'home' })"
    />
    <van-form @submit="onSubmit" class="form">
      <div class="title">房源信息</div>
      <div class="mesg">
        <van-field
          label="小区名称"
          readonly
          is-link
          @click="$router.push({ name: 'search' })"
        >
          <template #button>
            <van-button type="default" disabled>{{
              housing ? housing.communityName : "请输入小区名称"
            }}</van-button>
          </template>
        </van-field>
        <van-field
          v-model.number="price"
          label="租金"
          placeholder="请输入租金/月"
        >
          <template #button>
            <van-button type="default" disabled>￥/月</van-button>
          </template>
        </van-field>
        <van-field
          v-model.number="size"
          label="建筑面积"
          placeholder="请输入建筑面积"
        >
          <template #button>
            <van-button type="default" disabled>㎡</van-button>
          </template>
        </van-field>
        <Pickers
          label="户型"
          :columns="requireList.roomType"
          @editType="roomType = $event"
        />
        <Pickers
          label="所在楼层"
          :columns="requireList.floor"
          @editType="floor = $event"
        />
        <Pickers
          label="朝向"
          :columns="requireList.oriented"
          @editType="oriented = $event"
        />
      </div>
      <h6>房屋标题</h6>
      <van-field
        v-model.trim="title"
        rows="1"
        type="textarea"
        placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
        class="textArea"
        show-word-limit
      />
      <h6>房屋图像</h6>
      <van-uploader :after-read="afterRead" v-model="fileList" multiple />
      <h6>房屋配置</h6>
      <ul class="config">
        <li
          v-for="(item, index) in house_config"
          :key="item.id"
          :class="{ selected: item.select }"
          @click="chooseConfig(item, index)"
        >
          <i class="iconfont" :class="item.icon"></i>
          <p>{{ item.name }}</p>
        </li>
      </ul>
      <div class="desc">
        <h6>房屋描述</h6>
        <van-field
          v-model="description"
          autosize
          type="textarea"
          placeholder="请输入留言"
          show-word-limit
        />
      </div>
      <div class="footBar">
        <div class="cancel">取消</div>
        <van-button class="confirm">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Pickers from '@/components/Pickers.vue'
import { HouseRequired } from '@/api/find'
import { pubhouse, houseImage } from '@/api/pubhouse'
export default {
  created () {
    this.loadPubRequire()
  },
  data () {
    return {
      housing: this.$route.params.housing,
      price: '',
      size: '',
      roomType: '',
      floor: '',
      oriented: '',
      description: '',
      title: '',
      house_config: [
        {
          id: 1,
          name: '衣柜',
          icon: 'icon-yigui',
          select: false
        },
        {
          id: 2,
          name: '洗衣机',
          icon: 'icon-xiyiji',
          select: false
        },
        {
          id: 3,
          name: '空调',
          icon: 'icon-kongtiao',
          select: false
        },
        {
          id: 4,
          name: '天然气',
          icon: 'icon-meiqitianranqi',
          select: false
        },
        {
          id: 5,
          name: '冰箱',
          icon: 'icon-bingxiang',
          select: false
        },
        {
          id: 6,
          name: '暖气',
          icon: 'icon-nuanqi-',
          select: false
        },
        {
          id: 7,
          name: '电视',
          icon: 'icon-dianshi',
          select: false
        },
        {
          id: 8,
          name: '热水器',
          icon: 'icon-haofangtuo400iconfont2reshuiqi',
          select: false
        },
        {
          id: 9,
          name: '宽带',
          icon: 'icon-wifi',
          select: false
        },
        {
          id: 10,
          name: '沙发',
          icon: 'icon-shafa',
          select: false
        }
      ],
      requireList: {},
      supporting: '',
      fileList: [],
      houseImage: []
    }
  },
  methods: {
    async onSubmit () {
      // console.log('submit', values)
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        const houseImageStr = this.houseImage.join('|')
        // console.log(houseImageStr)
        const res = await pubhouse({
          title: this.title,
          description: this.description,
          houseImg: houseImageStr,
          oriented: this.oriented,
          supporting: this.supporting,
          price: this.price,
          roomType: this.roomType,
          size: this.size,
          floor: this.floor,
          community: this.housing.community
        })
        // console.log(res)
        if (res.status === 200) {
          this.$dialog.confirm({
            title: '提示',
            message: '房源发布成功！',
            confirmButtonText: '继续发布',
            cancelButtonText: '去查看',
            confirmButtonColor: '#108EE9'

          })
            .then(() => {
              // on confirm
            })
            .catch(() => {
              // on cancel
              this.$router.push({ name: 'rent' })
            })
        }
      } catch (err) {
        // console.log(err)
        this.$toast.fail('发布失败，请重试')
      }
    },
    async loadPubRequire () {
      try {
        const res = await HouseRequired()
        // console.log(res)
        this.requireList = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    afterRead (detail) {
      // 此时可以自行将文件上传至服务器
      console.log(detail)
      // if (this.fileList.indexOf(file) === -1) {
      //   // this.fileList.unshift(file)
      this.loadImage(detail.file)
      // }
    },
    chooseConfig (item, index) {
      // console.log(item)
      this.house_config[index].select = !this.house_config[index].select
      this.supporting = this.supporting + item.name + '|'
    },
    async loadImage (file) {
      // console.log(file)
      try {
        const formData = new FormData()
        formData.append('file', file)
        // console.log(formData.get('file'))
        const res = await houseImage(formData)
        this.houseImage.push(res.data.body[0])
        // console.log(this.houseImage)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    Pickers
  }
}
</script>

<style scoped lang="less">
.main {
  background-color: #f5f5f9;
}
/deep/.van-button--default {
  border: none;
}
/deep/.van-field__button {
  display: flex;
  align-items: center;
}
.mesg {
  /deep/.van-field {
    height: 88px;
    padding: 0 30px;
    span {
      font-size: 28px;
    }
  }
}

.form {
  padding-bottom: 140px;
  h6 {
    margin: 0;
    padding: 30px 30px 18px;
    font-size: 28px;
    font-weight: normal;
    background-color: #fff;
  }
  .van-uploader {
    width: 100%;
    height: 208px;
    background-color: #fff;
  }
  .config {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    li {
      width: 150px;
      height: 102px;
      margin: 20px 0;
      text-align: center;
      i.iconfont {
        font-size: 46px;
      }
      p {
        font-size: 28px;
        margin: 0;
      }
    }
  }
}
.title {
  height: 83px;
  padding: 30px 30px 18px;
  box-sizing: border-box;
  color: #21b97a;
  font-size: 30px;
  background-color: #fff;
}
.selected {
  color: #21b97a;
}
.footBar {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  font-size: 30px;
  color: #21b97a;
  .cancel,
  .confirm {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .confirm {
    background-color: #21b97a;
    color: #fff;
  }
}
.desc {
  margin: 40px 0;
}
</style>
