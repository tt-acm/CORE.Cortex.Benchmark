<template>
  <div>
    <div class='horizontal'>
      <div class='mx-3 mt-5' style='width: 50vw;'>
        <div class='horizontal py-2'>
          <label style='width: 37vw; text-align: left;'>Number of Stories</label>
          <label style='width: 7vw'>1</label>
          <input style='width: 50vw' type='range' v-model='storyNumber' class='form-range mx-5' @input='throttleCompute' :min='1' :max='15' :step='1'>
          <label style='width: 10vw'>15</label>
          <input style='width: 6vw;' class='mx-5' v-model='storyNumber'/>
        </div>
        <div class='horizontal py-2'>
          <label style='width: 37vw; text-align: left;'>Bay Width [ft]</label>
          <label style='width: 7vw'>10</label>
          <input style='width: 50vw' type='range' v-model='bayWidth' class='form-range mx-5' @input='throttleCompute' :min='10' :max='40' :step='0.1'>
          <label style='width: 10vw'>40</label>
          <input style='width: 6vw;' class='mx-5' v-model='bayWidth'/>
        </div>
        <div class='horizontal py-2'>
          <label style='width: 37vw; text-align: left;'>Tributary Width [ft]</label>
          <label style='width: 7vw'>9</label>
          <input style='width: 50vw' type='range' v-model='tribWidth' class='form-range mx-5' @input='throttleCompute' :min='9' :max='30' :step='0.1'>
          <label style='width: 10vw'>30</label>
          <input style='width: 6vw;' class='mx-5' v-model='tribWidth'/>
        </div>
        <div class='horizontal py-2'>
          <label style='width: 37vw; text-align: left;'>Story Height [ft]</label>
          <label style='width: 7vw'>8</label>
          <input style='width: 50vw' type='range' v-model='storyHeight' class='form-range mx-5' @input='throttleCompute' :min='8' :max='15' :step='0.1'>
          <label style='width: 10vw'>15</label>
          <input style='width: 6vw;' class='mx-5' v-model='storyHeight'/>
        </div>
        <div class='horizontal py-2'>
          <label style='width: 37vw; text-align: left;'>Wind Base Shear/Story [kips]</label>
          <label style='width: 7vw'>10</label>
          <input style='width: 50vw' type='range' v-model='windBaseShearStory' class='form-range mx-5' @input='throttleCompute' :min='10' :max='90' :step='0.1'>
          <label style='width: 10vw'>90</label>
          <input style='width: 6vw;' class='mx-5' v-model='windBaseShearStory'/>
        </div>
        <div class='horizontal py-2'>
          <label style='width: 37vw; text-align: left;'>DL</label>
          <label style='width: 7vw'>70</label>
          <input style='width: 50vw' type='range' v-model='dl' class='form-range mx-5' @input='throttleCompute' :min='70' :max='100' :step='0.1'>
          <label style='width: 10vw'>100</label>
          <input style='width: 6vw;' class='mx-5' v-model='dl'/>
        </div>
        <div class='horizontal py-2'>
          <label style='width: 37vw; text-align: left;'>LL</label>
          <label style='width: 7vw'>40</label>
          <input style='width: 50vw' type='range' v-model='ll' class='form-range mx-5' @input='throttleCompute' :min='40' :max='100' :step='0.1'>
          <label style='width: 10vw'>100</label>
          <input style='width: 6vw;' class='mx-5' v-model='ll'/>
        </div>
        <div class='horizontal py-2'>
          <label style='width: 37vw; text-align: left;'>Additional SDL [kips]</label>
          <label style='width: 7vw'>8</label>
          <input style='width: 50vw' type='range' v-model='additionalSDL' class='form-range mx-5' @input='throttleCompute' :min='8' :max='20' :step='0.1'>
          <label style='width: 10vw'>20</label>
          <input style='width: 6vw;' class='mx-5' v-model='additionalSDL'/>
        </div>
        <div class='horizontal py-2'>
          <label style='width: 37vw; text-align: left;'>Additional LL [kips]</label>
          <label style='width: 7vw'>1</label>
          <input style='width: 50vw' type='range' v-model='additionalLL' class='form-range mx-5' @input='throttleCompute' :min='1' :max='10000' :step='0.1'>
          <label style='width: 10vw'>10,000</label>
          <input style='width: 6vw;' class='mx-5' v-model='additionalLL'/>
        </div>
        <div>
          <table class='table table-bordered mt-5' style='width: 15vw'>
          <tbody>
            <tr>
              <td colspan='2'>
                <h4>Telemetry</h4>
              </td>
            </tr>
            <tr>
              <th  scope='row'>Latest</th>
              <td>
                <span v-if='lastReqDelta' class='badge rounded-pill text-bg-primary'>{{ lastReqDelta }} ms</span>
              </td>
            </tr>
            <tr>
              <th class='text-left' scope='row'>Average</th>
              <td>
                <span v-if='avgReqDelta' class='badge rounded-pill text-bg-secondary'>{{ avgReqDelta }} ms</span>
              </td>
            </tr>
            <tr>
              <th class='text-left' scope='row'>Fastest</th>
              <td>
                <span v-if='fastestReqDelta' class='badge rounded-pill text-bg-success'>{{ fastestReqDelta }} ms</span>
              </td>
            </tr>
            <tr>
              <th class='text-left' scope='row'>Slowest</th>
              <td>
                <span v-if='slowestReqDelta' class='badge rounded-pill text-bg-danger'>{{ slowestReqDelta }} ms</span>
              </td>
            </tr>
            <tr>
              <th class='text-left' scope='row'>Total</th>
              <td>
                <span class='badge rounded-pill text-bg-dark'>{{ this.deltas.length }}</span>
              </td>
            </tr>
            <tr>
              <td colspan='2'>
                <button type='button' @click='resetTelemetry()' class='btn btn-primary'>Reset</button>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      <div>
        <div style='content-align: center;'>
          <div v-if='loading' class='spinner-border text-primary' role='status'/>
          <div class="horizontal">
            <div class="mt-5 mr-4">
            <svg v-show='!loading' xmlns='http://www.w3.org/2000/svg' transform='scale(1,-1)' width='20vw' height='500' viewBox='0 0 16 16'>
            </svg>
              <div>
                <h1><span class='badge bg-primary mt-2' id='highlightedProfile'></span></h1>
                <h3><span class='badge bg-secondary mt-1' id='highlightedMemberType'></span></h3>
              </div>
            </div>
            <table class="table table-bordered mt-5 mx-4" style='display: flex;' v-if="results.finalSections.length > 0">
            <tbody>
              <tr>
                <th>Level</th>
                <th colspan="2">Column</th>
                <th colspan="2">Beam</th>
                <th colspan="2">Brace</th>
              </tr>
              <tr v-for="(section, i) in results.finalSections.slice().reverse()" :key='i'>
                <th scope="row">{{ results.finalSections.length - i }}</th>
                <th :style="section.columnTableStyle"></th>
                <td>{{ section.column }}</td>
                <th :style="section.beamTableStyle"></th>
                <td>{{ section.beam }}</td>
                <th :style="section.braceTableStyle"></th>
                <td>{{ section.brace}}</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import _ from 'lodash'
// import * as d3 from 'd3'

export default defineComponent({
  name: 'SketchView',
  props: ['columnSections', 'cbfSections', 'colors'],
  mounted () {
    this.svgEmpty = true
  },
  data () {
    return {
      storyNumber: 1,
      bayWidth: 10,
      tribWidth: 9,
      storyHeight: 8,
      windBaseShearStory: 10,
      dl: 70,
      ll: 40,
      additionalSDL: 0,
      additionalLL: 0,
      colSxns: this.columnSections,
      cbfSxns: this.cbfSections,
      endpoints: {
        cbf: '62ec30eda6d6b20016f66cc1',
        cbfForces: '62ec1de47c76100016bde3dc',
        columnSections: '62ec2f0aa6d6b20016f66a77'
      },
      key: process.env.VUE_APP_CORTEX_KEY_ID,
      token: process.env.VUE_APP_CORTEX_TOKEN,
      results: {
        cbf: [],
        cbfForces: [],
        columnSections: [],
        finalSections: []
      },
      loading: false,
      columnWidth: '1px',
      beamWidth: '1px',
      braceWidth: '0.5px',
      selWidth: '2px',
      svgEmpty: true,
      lastReqStart: null,
      lastReqEnd: null,
      runs: {},
      deltas: [],
      lastReqDelta: null,
      avgReqDelta: null,
      fastestReqDelta: null,
      slowestReqDelta: null
    }
  },
  methods: {
    reset () {
      this.results.cbf = []
      this.results.cbfForces = []
      this.results.columnSections = []
      this.results.finalSections = []
    },
    throttleCompute: _.throttle(function () {
      const guid = crypto.randomUUID()
      this.designBracedFrame(guid)
    }, 100),
    designBracedFrame (guid) {
      const start = Date.now()
      this.lastReqStart = start
      this.runs[guid] = {
        start: start
      }
      if (this.svgEmpty) {
        this.loading = true
      }
      this.reset()
      this.computeCBF(guid)
    },
    drawBracedFrame () {
      const svg = document.querySelector('svg')

      while (svg.lastChild) {
        svg.removeChild(svg.lastChild)
      }

      const highlights = []

      for (let i = 1; i <= this.storyNumber; i++) {
        const elements = this.addSegment(parseFloat(this.bayWidth), parseFloat(this.storyHeight), i)
        elements.elements.forEach(e => {
          svg.appendChild(e)
        })
        elements.highlights.forEach(h => {
          highlights.push(h)
        })
      }

      highlights.forEach(h => {
        svg.appendChild(h)
      })

      const viewBoxMin = this.pt(-5, -5)
      const viewBoxMax = this.pt(parseFloat(this.bayWidth) + 10, parseFloat(this.storyHeight) * parseFloat(this.storyNumber) + 10)
      this.svgEmpty = false
      this.changeViewBox(svg, viewBoxMin, viewBoxMax)
    },
    changeViewBox (svg, min, max) {
      svg.setAttribute('viewBox', min.x.toString() + ' ' + min.y.toString() + ' ' + max.x.toString() + ' ' + max.y.toString())
    },
    addSegment (width, height, level) {
      const data = this.results.finalSections[level - 1]
      const yStart = height * (level - 1)

      const baseLeft = this.pt(0, yStart)
      const baseRight = this.pt(0 + width, yStart)

      const topLeft = this.pt(0, yStart + height)
      const topRight = this.pt(0 + width, yStart + height)

      const beamMiddle = this.pt(0 + width / 2, yStart + height)

      const colLeft = this.addPath(baseLeft, topLeft, this.columnWidth, data.columnColor, data.column, 'column')
      const colRight = this.addPath(baseRight, topRight, this.columnWidth, data.columnColor, data.column, 'column')
      const beam = this.addPath(topLeft, topRight, this.beamWidth, data.beamColor, data.beam, 'beam')
      const leftBrace = this.addPath(baseLeft, beamMiddle, this.braceWidth, data.braceColor, data.brace, 'brace')
      const rightBrace = this.addPath(baseRight, beamMiddle, this.braceWidth, data.braceColor, data.brace, 'brace')

      return {
        elements: [
          leftBrace.element,
          rightBrace.element,
          beam.element,
          colLeft.element,
          colRight.element
        ],
        highlights: [
          leftBrace.highlight,
          rightBrace.highlight,
          beam.highlight,
          colLeft.highlight,
          colRight.highlight
        ]
      }
    },
    addPath (from, to, width, color, sxn, type) {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      const highlight = document.createElementNS('http://www.w3.org/2000/svg', 'path')

      p.setAttribute('d', 'M ' + from.x.toString() + ' ' + from.y.toString() + ' L ' + to.x.toString() + ' ' + to.y.toString())
      highlight.setAttribute('d', 'M ' + from.x.toString() + ' ' + from.y.toString() + ' L ' + to.x.toString() + ' ' + to.y.toString())

      p.style.stroke = '#' + color
      p.style.strokeWidth = width

      highlight.style.stroke = '#ffd412'
      highlight.style.strokeWidth = '2px'
      highlight.setAttribute('stroke-opacity', '0')
      highlight.setAttribute('stroke-linecap', 'round')

      highlight.addEventListener('mouseenter', function (e) {
        document.getElementById('highlightedProfile').innerHTML = sxn
        document.getElementById('highlightedMemberType').innerHTML = type
        e.currentTarget.setAttribute('stroke-opacity', '1')
        // e.currentTarget.setAttribute('stroke-dasharray', '0.5,0.5')
        // e.currentTarget.style.strokeWidth = '2px'
      })

      highlight.addEventListener('mouseleave', function (e) {
        document.getElementById('highlightedProfile').innerHTML = null
        document.getElementById('highlightedMemberType').innerHTML = null
        e.currentTarget.setAttribute('stroke-opacity', '0')
        // e.currentTarget.removeAttribute('stroke-dasharray')
        // e.currentTarget.style.strokeWidth = width
      })
      return {
        element: p,
        highlight: highlight
      }
    },
    pt (x, y) {
      return {
        x: x,
        y: y
      }
    },
    createCortexPayload (runId, values) {
      return {
        run_id: runId,
        region_name: 'us-east-1',
        content_type: 'application/json',
        key: this.key,
        token: this.token,
        input_data: {
          Input: values
        }
      }
    },
    computeCBF (guid) {
      const values = [[
        this.storyNumber,
        this.bayWidth,
        this.tribWidth,
        this.storyHeight,
        this.windBaseShearStory,
        this.dl,
        this.ll
      ]]

      const payload = this.createCortexPayload(this.endpoints.cbf, values)

      this.sendRequest(payload, (e) => {
        var response = JSON.parse(e.target.responseText).data.Output[0]
        response = response.filter(function (x) {
          return x !== 0
        })
        this.cbf = this.partitionList(response, 3)
        this.computeColumnForces(guid)
      })
    },
    computeColumnForces (guid) {
      const values = [[
        this.storyNumber,
        this.bayWidth,
        this.tribWidth,
        this.storyHeight,
        this.windBaseShearStory,
        this.dl,
        this.ll
      ]]

      const payload = this.createCortexPayload(this.endpoints.cbfForces, values)

      this.sendRequest(payload, (e) => {
        var response = JSON.parse(e.target.responseText).data.Output
        this.cbfForces = response.filter(function (x) {
          return x !== 0
        })
        this.computeColumnSections(guid)
      })
    },
    computeColumnSections (guid) {
      var accLL = this.accumulateForces(this.ll)
      var accDL = this.accumulateForces(this.dl)
      var combined = this.combineForces(accLL, accDL)

      var values = []

      combined.forEach(f => {
        values.push([this.storyHeight, f])
      })

      const payload = this.createCortexPayload(this.endpoints.columnSections, values)

      this.sendRequest(payload, (e) => {
        var response = JSON.parse(e.target.responseText).data.Output
        var columnSxns = this.indicesToColumnSxns(response)
        var colIndicesFromForces = this.convertColumnSxnsToCbfIndices(columnSxns)

        var index = 0
        var newSegments = []
        this.cbf.forEach(segment => {
          var cbfColIndex = segment[0]
          var colIndexFromForces = colIndicesFromForces[index++]
          var newSegment = [Math.max(cbfColIndex, colIndexFromForces), segment[1], segment[2]]
          newSegments.push(newSegment)
        })

        var newColumnSxns = []
        newSegments.forEach(s => {
          var sxns = this.indicesToCbfSxns(s)
          newColumnSxns.push({
            column: sxns[0],
            columnColor: this.colors[s[0]],
            columnTableStyle: 'width: 25px; background-color: #' + this.colors[s[0]] + ';',
            beam: sxns[1],
            beamColor: this.colors[s[1]],
            beamTableStyle: 'width: 25px; background-color: #' + this.colors[s[1]] + ';',
            brace: sxns[2],
            braceColor: this.colors[s[2]],
            braceTableStyle: 'width: 25px; background-color: #' + this.colors[s[2]] + ';'
          })
        })
        this.results.finalSections = newColumnSxns
        console.log('Final Sections', this.results.finalSections)
        this.loading = false
        this.drawBracedFrame()
        const end = Date.now()
        this.runs[guid].end = end
        this.computeTelemetry(guid)
      })
    },
    computeTelemetry (guid) {
      const run = this.runs[guid]
      delete this.runs[guid]

      const delta = run.end - run.start
      this.deltas.push(delta)
      this.lastReqDelta = delta
      this.fastestReqDelta = Math.min(...this.deltas)
      this.slowestReqDelta = Math.max(...this.deltas)
      this.avgReqDelta = parseInt(this.deltas.reduce((partialSum, a) => partialSum + a, 0) / this.deltas.length)
    },
    resetTelemetry () {
      this.lastReqStart = null
      this.lastReqEnd = null
      this.runs = {}
      this.deltas = []
      this.lastReqDelta = null
      this.avgReqDelta = null
      this.fastestReqDelta = null
      this.slowestReqDelta = null
    },
    sendRequest (payload, callback) {
      const xhr = new XMLHttpRequest()
      const url = 'https://core-cortex.herokuapp.com/api/external/invoke-endpoint'
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.onload = (e) => {
        callback(e)
      }
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
    },
    partitionList (list, size) {
      var output = []
      for (var i = 0; i < list.length; i += size) {
        var s = list.slice(i, i + size)
        output[output.length] = s
      }
      return output
    },
    accumulateForces (load) {
      var accumulated = [load]
      for (var i = 1; i < this.storyNumber; i++) {
        accumulated.push(parseFloat(load) + parseFloat(accumulated.slice(-1)))
      }
      return accumulated
    },
    combineForces (ll, dl) {
      var output = []
      for (var i = 0; i < ll.length; i++) {
        var combo1 = ll[i] * 1.4
        var combo2 = dl[i] * 1.2 + ll[i] * 1.6
        var combo = Math.max(combo1, combo2)
        output.push(combo)
      }
      return output
    },
    indicesToColumnSxns (indices) {
      var output = []
      indices.forEach(i => {
        output.push(this.colSxns[i])
      })
      return output
    },
    indicesToCbfSxns (indices) {
      var output = []
      indices.forEach(i => {
        output.push(this.cbfSxns[i])
      })
      return output
    },
    convertColumnSxnsToCbfIndices (sxns) {
      var cbfIndices = []
      sxns.forEach(sxn => {
        cbfIndices.push(this.cbfSxns.indexOf(sxn))
      })
      return cbfIndices
    }
  }
})
</script>

<style scoped>
.horizontal {
    display: flex;
}
.spinner-border {
  display: block;
  position: relative;
  margin: auto;
  margin: 0;
  position: absolute;
  top: 40%;
  left: 80%;
}

th {
  width:5vw
}

svg{
    display: flex;
    margin: auto;
}
</style>
