<template>
  <div id="app">
    <InputForm @transfer-results="parseResults" />
  </div>
</template>

<script>
import InputForm from './components/InputForm.vue'

export default {
  name: 'App',
  components: {
    InputForm
  },
  data () {
    return {
        result: null
    }
  },
  methods: {
      parseResults(data) {
          this.result = data
          console.log(this.result)
      },
  }
}
</script>