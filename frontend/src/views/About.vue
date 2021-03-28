<template>
  <div key="map">
    <div id="map"></div>
  </div>
</template>

<script>
import { getLocationsByHashTag } from '../api/tweet'
export default {
  data () {
    return {
      map: null,
      locations: [],
      appApi: process.env.VUE_APP_API
    }
  },
  async mounted () {
    this.locations = await getLocationsByHashTag('imkaian')
    this.map = window.L.map('map')
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map)
    const icon = window.L.icon({
      iconUrl: require('../assets/img/pin.svg'),
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
    console.log(markers)
    this.map.fitBounds(group.getBounds())
  }
}
</script>
<style lang='scss' scoped>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
