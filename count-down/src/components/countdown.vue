<template>
  <div class="count-down">
    <div>
      <input type="datetime-local" v-model="datend" name="endtime" />
    </div>
    <p></p>
    <div v-if="noactive" class="texto">Fin cuenta atras</div>
  </div>
</template>

<script>
export default {
  name: 'countdown',
  data () {
    return {
      hours: 0,
      days: 0,
      minutes: 0,
      seconds: 0,
      datend: '2022-04-30T00:01',
      noactive: true
    }
  },
  mounted () {
    setInterval(this.updateCounter, 1000)
  },
  methods: {
    updateCounter () {
      let now = new Date()
      let end = new Date(this.datend)
      let distance = end - now
      if (distance > 0) {
        this.hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24))
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000)
        this.noactive = false
      } else {
        this.hours = 0
        this.minutes = 0
        this.days = 0
        this.seconds = 0
        this.noactive = true
      }
    }
  }
}
</script>
