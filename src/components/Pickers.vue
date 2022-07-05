<template>
  <div>
    <van-field
      readonly
      clickable
      name="picker"
      :value="value"
      :label="label"
      input-align="right"
      placeholder="请选择"
      @click="showPicker = true"
      is-link
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        value-key="label"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    columns: {
      required: true
    }
  },
  created () { },
  data () {
    return {
      value: '',
      showPicker: false
    }
  },
  methods: {
    onConfirm (value) {
      console.log(value)
      this.value = value.label
      this.showPicker = false
      this.$emit('editType', value.value)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
