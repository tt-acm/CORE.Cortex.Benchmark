<template>
  <div>
    <GreetingComponent @getStarted='reBroadcast'/>
  </div>
</template>

<script>
import GreetingComponent from '@/components/GreetingComponent.vue'
export default {
  components: { GreetingComponent },
  methods: {
    reBroadcast () {
      console.log('re-emitting')
      this.$emit('getStarted')
    }
  }
}
</script>
