import steps from './src/steps.vue'

steps.install = Vue => {
  Vue.component(steps.name, steps)
}

export default steps