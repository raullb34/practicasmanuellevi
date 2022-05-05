<template>
  <div class="count-down">
    <div class="texto" v-bind:style="{'background-color':'black', 'color':'green', 'width':'255px', 'margin-left':'305px', 'font-size':'30px'}">{{timerCount}}</div>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: Number,
      default: 30
    }
  },
  data () {
    return {
      timerEnabled: true,
      timerCount: -1
    }
  },
  methods: {
    play () {
      this.timerCount = this.time
      let interval = setInterval(() => {
        this.timerCount--
        if (this.timerCount <= 0) {
          clearInterval(interval)
        }
      }, 1000)
      this.timerEnabled = true
    },
    pause () {
      this.timerEnabled = false
    }
  },
  mounted: function () {
    this.play()
  }
}
</script>
