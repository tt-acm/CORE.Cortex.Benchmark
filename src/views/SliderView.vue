<template>
  <div>
    <div v-for="endpoint in endpoints" :key="endpoint.run_id" class="card m-5">
        <SliderCard :endpoint="endpoint" :sliders="endpoint.sliders"/>
    </div>
  </div>
</template>

<script>
import SliderCard from '@/components/SliderCard.vue'

export default {
  props: ['endpoints'],
  components: { SliderCard },
  name: 'HomeView'
}
</script>

<style scoped>
.text-left {
  text-align: left;
}
</style>
