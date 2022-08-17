<template>
  <div>
    <ul class='nav nav-pills nav-fill m-3'>
      <li class='nav-item'>
        <router-link :class='homeLinkClass' @click="activateHome" to="/">Home</router-link>
      </li>
      <li class='nav-item'>
        <router-link :class='sliderLinkClass' @click="activateSlider" to="/slider">Slider View</router-link>
      </li>
      <li class='nav-item'>
        <router-link :class='sketchLinkClass' @click="activateSketch" to="/sketch">Sketch View</router-link>
      </li>
    </ul>
    <router-view :endpoints="endpoints" :colors="colorGradient" :columnSections="columnSections" :cbfSections="cbfSections" @getStarted="activateSlider"/>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import endpoints from '@/endpoints.json'
import columnSections from '@/columnSections.json'
import cbfSections from '@/cbfSections.json'
import colorGradient from '@/colorGradient.json'

export default defineComponent({
  data () {
    return {
      homeLinkClass: 'nav-link active',
      sliderLinkClass: 'nav-link',
      sketchLinkClass: 'nav-link',
      endpoints: endpoints,
      columnSections: columnSections,
      cbfSections: cbfSections,
      colorGradient: colorGradient
    }
  },
  methods: {
    activateHome () {
      this.homeLinkClass = 'nav-link active'
      this.sliderLinkClass = 'nav-link'
      this.sketchLinkClass = 'nav-link'
    },
    activateSlider () {
      this.homeLinkClass = 'nav-link'
      this.sliderLinkClass = 'nav-link active'
      this.sketchLinkClass = 'nav-link'
    },
    activateSketch () {
      this.homeLinkClass = 'nav-link'
      this.sliderLinkClass = 'nav-link'
      this.sketchLinkClass = 'nav-link active'
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
