<template>
  <div class="emty-container">
    <van-empty
      class="custom-image"
      image="http://liufusong.top:8080/img/not-found.png"
    >
    <template #description>
      <slot></slot>
    </template>
    </van-empty>
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

<style scoped lang="less">
.emty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/deep/.van-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: unset;
}
/deep/.van-empty__image {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  img {
    width: 300px !important;
    height: unset;
  }
}
</style>
