<template>
  <div>
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      @click="showDetail(item.houseCode)"
    >
      <template #title>
        <div class="img">
          <img :src="'http://liufusong.top:8080' + item.houseImg" alt="" />
        </div>
      </template>
      <template>
        <div class="message">
          <h3 class="van-ellipsis">{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
          <van-tag
            :color="colors[index]"
            :text-color="textColors[index]"
            v-for="(val, index) in item.tags"
            :key="index"
            >{{ val }}</van-tag
          >
          <p class="money">
            <strong>{{ item.price }}</strong> /月
          </p>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  created () { },
  data () {
    return {
      colors: ['#e1f5f8', '#e1f5ed', '#e6f2ff', '#e1f5f8', '#e1f5ed', '#e6f2ff'],
      textColors: ['#39becd', '#3fc28c', '#5aabfd', '#39becd', '#3fc28c', '#5aabfd']
    }
  },
  methods: {
    showDetail (id) {
      this.$router.push({
        name: 'detail',
        params: {
          id
        }
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.van-cell {
  max-width: 690px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  padding-top: 36px;
  margin: 0 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
  .van-cell__title {
    flex: unset;
  }
  .van-cell__value {
    text-align: left;
  }
  .img {
    width: 212px;
    height: 160px;
    img {
      width: 212px;
      height: 160px;
    }
  }
  .message {
    font-size: 24px;
    padding-left: 24px;
    line-height: 1.5;
    h3 {
      margin: 0;
      color: #394043;
      font-size: 30px;
    }
    p {
      margin: 0;
      font-size: 24px;
      line-height: 1.8;
      color: #afb2b3;
    }
    p.money {
      color: #fa5741;
      strong {
        font-size: 36px;
      }
    }
    .van-tag {
      margin-left: 5px;
    }
  }
}
</style>
