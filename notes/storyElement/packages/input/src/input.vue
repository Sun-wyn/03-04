<template>
  <div>
    <input v-bind="$attrs" :type="type" :value="value" @input="handleInput">
  </div>
</template>

<script>
export default {
  name: 'LgInput',
  inheritAttrs: false,
  props: {
    value: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    handleInput (evt) {
      this.$emit('input', evt.target.value)
      // 循环找父组件
      const findParent = parent => {
        while (parent) {
          if (parent.$options.name === 'LgFormItem') {
            break
          } else {
            parent = parent.$parent
          }
        }
        return parent
      }
      const parent = findParent(this.$parent)
      if (parent) {
        // 通知父组件
        parent.$emit('validate')
      }
    }
  }
}
</script>

<style>

</style>