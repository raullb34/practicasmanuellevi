<template>
  <div class="count-down">
    <div>
      <input type="number" v-model="tiempo" id="start"/> <button id="buttonStart"  v-on:click="play()">Iniciar contador</button>
    </div>
    <p></p>
    <div class="texto">{{timerCount}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timerEnabled: false,
      timerCount: -1,
      tiempo: 0
    }
  },
  methods: {
    play () {
      this.timerCount = this.tiempo
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
  }
}
</script>
