<template>
  <div id="app">
    <div id="map" :class="{'open': openMenu}"></div>
    <router-view class="actions" :class="{'open': openMenu}"/>
  </div>
</template>
<script>
import { setToken } from './libs/util'
export default {
  data () {
    return {
      openMenu: true,
      locations: [],
      map: null
    }
  },
  watch: {
    locations (value) {
      if (value.length > 0) {
        const icon = window.L.icon({
          iconUrl: require('./assets/img/pin.svg'),
          iconSize: [38, 95]
        })
        const markers = this.locations.map(x => {
          console.log(x)
          return window.L.marker([JSON.stringify(x.cordenates.coords[1]), JSON.stringify(x.cordenates.coords[0])], { icon }).addTo(this.map)
            .bindPopup(`
              <div class="popup-map">
                ${x.text}
              </div>
            `)
        })
        const group = window.L.featureGroup(markers).addTo(this.map)
        this.map.fitBounds(group.getBounds())
      }
    }
  },
  created () {
    window.addEventListener('resize', this.resize)
  },
  destroyed () {
    window.removeEventListener('resize', this.resize)
  },
  mounted () {
    console.log(this.$route)
    if (this.$route.query.oauth_token) {
      setToken(this.$route.query)
    }
    this.map = window.L.map('map', {
      zoomControl: false
    }).setView([51.505, -0.09], 13)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map)
    window.L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map)
  },
  methods: {
    resize () {
      this.map.invalidateSize()
    }
  }
}
</script>

<style lang="scss">
.leaflet-control-attribution {
  display: none;
}
</style>

<style lang="scss" scoped>
@import "./assets/scss/_variables";
#map {
  transition: 0.3s;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  &.open {
    left: 100% ;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.actions {
  transition: 0.3s;
  width: 0;
  height: 100%;
  background-color: #fff;
  &.open {
    width: 100%;
  }
}
@media screen and (min-width: $width-desktop) {
  #map { &.open { left: 300px !important; } }
  .actions { &.open { width: 300px !important; } }
}
</style>
