<template>
  <section>
    <div class="content">
      <Logo/>
      <MapGirl class="art"/>
      <div class="slogan">Monitore seus tweets</div>
      <div class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet imperdiet justo, id vestibulum elit egestas eget. pharetra ante.</div>
      <button @click="signin">
        <TwitterBird css="birdIcon"/>
        <span>Logar com o twitter</span>
      </button>
    </div>
  </section>
</template>

<script>
import { twitterSignin } from '../api/auth'
import Logo from '../components/Logo'
import MapGirl from '../components/icons/MapGirl'
import TwitterBird from '../components/icons/TwitterBird'
import { mapState } from 'vuex'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    Logo,
    MapGirl,
    TwitterBird
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async signin () {
      await twitterSignin()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables";
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 20px);
  padding: 10px;
}
.logo { margin-bottom: 10px; }
.art { margin: 10vh 0; }
.slogan {
  font-size: 15px;
  font-family: Chivo;
  font-weight: bold;
  margin-bottom: 15px;
}
.description {
  font-size: 14px;
  font-family: Chivo;
  font-weight: normal;
  margin-bottom: 30px;
}
button {
  padding: 10px 12px;
  background-color: $color-1;
  border: 1px solid $color-1;
  height: 43px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 14px;
  .birdIcon {
    width: 25px;
    fill: white;
    margin-right: 10px;
  }
  span {
    color: #fff;
    font-family: bungee;
    font-size: 11px;
  }
}
</style>
