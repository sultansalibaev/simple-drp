<template>
  <div class="flex">
    <div class="w-full">
      <DateRangePicker/>
    </div>
    <div class="w-full h-0 relative">
      <DateRangePicker2/>
    </div>
  </div>
</template>

<script>
import DateRangePicker2 from './components/DateRangePicker.vue'
import { DateRangePicker } from './widgets/DateRangePicker'

export default {
  name: 'App',
  components: {
    DateRangePicker2,
    DateRangePicker,
  }
}
</script>

<style>
#app {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
</style>
