<template>
  <div id="app">
    <div id="map"></div>
    <div class="search" :class="{'open': openMenu}">
      <div class="input-group" v-if="user">
        <input @keyup.enter="searchHashtag" @blur="searchHashtag" v-model="search" placeholder="Pesquisar hashtag" type="text">
        <IconSearch class="icon"/>
      </div>
    </div>
    <Menu v-if="user" :switchMenu="switchMenu" />
    <router-view  class="actions" :class="{'open': openMenu}"/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getLocationsByHashTag } from './api/tweet'
import IconSearch from './components/icons/Search'
import Menu from './components/Menu'
import { setToken, getToken } from './libs/util'
export default {
  components: {
    IconSearch,
    Menu
  },
  computed: {
    ...mapState(['user', 'openMenu'])
  },
  data () {
    return {
      search: '',
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
        // pin and popup with the hashtag text
        const markers = this.locations.map(x => {
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
  // solving problems with map size
  created () {
    window.addEventListener('resize', this.resize)
  },
  destroyed () {
    window.removeEventListener('resize', this.resize)
  },
  async mounted () {
    // verifiy if is a callback url
    if (this.$route.query.oauth_token) {
      if (!getToken()) await setToken(this.$route.query)
      this.$router.push('/')
      this.$store.commit('user', getToken())
    }

    // genenerating the map
    this.map = window.L.map('map', {
      zoomControl: false
    }).setView([51.505, -0.09], 13)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map)
    // window.L.control.zoom({
    //   position: 'bottomright'
    // }).addTo(this.map)
  },
  methods: {
    resize () {
      this.map.invalidateSize()
    },
    async searchHashtag () {
      this.locations = await getLocationsByHashTag(this.search)
    },
    // open and close menu
    switchMenu () {
      this.$store.commit('openMenu', !this.openMenu)
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
.search {
  transition: 0.3s;
  z-index: 9999;
  position: absolute;
  // left: 15vw;
  display: flex;
  width: calc(100vw - 20px);
  margin: 10px;
  &.open {
    display: none;
  }
  .input-group {
    display: flex;
    background-color: #fff;
    padding: 15px;
    width: 100%;
    border-radius: 14px;
    input {
      width: 100%;
      font-size: 14px;
      border: none;
      outline: none;
      font-family: chivo;
    }
    .icon {
      width: 20px;
    }
  }
}
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

.actions {
  position: absolute;
  z-index: 9999;
  overflow: hidden;
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
  .search {
    justify-content: flex-start;
    left: 15vw;
    &.open {
      display: flex;
      left: 40vw;
    }
    .input-group {
      width: 500px;
    }
  }
}
</style>
