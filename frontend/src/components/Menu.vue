<template>
  <section>
    <div class="content" :class="{ 'open' : openMenu }">
      <div @click="switchMenu()">
        <IconHamburguer css="icon hamburger"/>
      </div>
      <div @click="$router.push('/')">
        <IconHome css="icon home"/>
      </div>
      <div>
        <IconUser css="icon user"/>
      </div>
    </div>
  </section>
</template>

<script>
import IconHome from './icons/Home'
import IconHamburguer from './icons/Hamburguer'
import IconUser from './icons/User'
import { mapState } from 'vuex'
export default {
  components: {
    IconHome,
    IconHamburguer,
    IconUser
  },
  computed: {
    ...mapState(['openMenu'])
  },
  methods: {
    switchMenu () {
      this.$store.commit('openMenu', !this.openMenu)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables";
  .content {
    z-index: 9999;
    background-color: #fff;
    bottom: 0;
    position: absolute;
    width: calc(100% - 40px);
    height: 45px;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon {
      width: 30px;
      fill: #000;
    }
  }
  @media screen and (min-width: $width-desktop) {
    .home, .user { display: none; }
    .content {
      transition: 0.3s;
      cursor: pointer;
      justify-content: center;
      width: 25px;
      height: 25px;
      padding: 10px;
      border-radius: 14px;
      top: 10px;
      left: 10%;
      &.open {
        left: 35vw;
      }
    }
  }
</style>
