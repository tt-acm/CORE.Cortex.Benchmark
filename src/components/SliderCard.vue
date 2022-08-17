<template>
  <div class='horizontal'>
    <div class='card-body' style='width: 70%'>
      <h3 class='display-8 text-left'>{{ endpoint.name }}</h3>
        <div v-for='(slider, i) in sliders' :key='i'>
          <div class='horizontal'>
            <label style='width: 500px; text-align: left;'>{{ slider.name }}</label>
            <label style='width: 50px'>{{ slider.min }}</label>
            <input type='range' v-model='values[i]' class='form-range mx-5' @change='callEndpoint' :min='slider.min' :max='slider.max' :step='slider.step'>
            <label style='width: 100px'>{{ slider.max }}</label>
            <input style='width: 100px;' v-model='values[i]'/>
          </div>
      </div>
    </div>
    <div style='width: 30%'>
        <table class="table table-bordered table-responsive">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">status</th>
              <th scope="col">duration</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(req, i) in requests" :key="i">
              <th scope="row">{{ i }}</th>
              <td :class="req.class">{{ req.status }}</td>
              <td>{{ req.delta.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} ms</td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>

<style scoped>
.horizontal {
    display: flex;
}
</style>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    endpoint: Object,
    sliders: Array
  },
  data () {
    return {
      values: this.sliders.map(s => s.min),
      response: {},
      lastStart: null,
      requests: []
    }
  },
  methods: {
    callEndpoint () {
      const payload = {
        run_id: this.endpoint.run_id,
        region_name: 'us-east-1',
        content_type: 'application/json',
        key: process.env.VUE_APP_CORTEX_KEY_ID,
        token: process.env.VUE_APP_CORTEX_TOKEN,
        input_data: {
          Input: [this.values]
        }
      }
      console.log(payload)
      const xhr = new XMLHttpRequest()

      const url = 'https://core-cortex.herokuapp.com/api/external/invoke-endpoint'
      // const url = 'http://localhost:1337/api/external/invoke-endpoint'
      xhr.open('POST', url, true)
      // xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.onload = (e) => {
        if (xhr.readyState === 4) {
          var status = xhr.status
          var reqEnd = Date.now()
          var statusClass = null
          if (xhr.status === 200) {
            statusClass = 'bg-success text-light'
            console.log(xhr.responseText)
          } else {
            statusClass = 'bg-danger text-light'
            console.error(xhr.statusText)
          }
          var timeDelta = reqEnd - this.lastStart
          this.requests.push({
            delta: timeDelta,
            status: status,
            class: statusClass
          })
          console.log('Delta', timeDelta)
        }
      }
      this.lastStart = Date.now()
      xhr.send(this.urlEncode(payload))
    },
    urlEncode (obj, prefix) {
      var str = []
      for (var p in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, p)) {
          var k = prefix
            ? prefix + '[' + p + ']'
            : p
          var v = obj[p]
          str.push((v !== null && typeof v === 'object')
            ? this.urlEncode(v, k)
            : encodeURIComponent(k) + '=' + encodeURIComponent(v))
        }
      }
      return str.join('&')
    }
  }
})
</script>
