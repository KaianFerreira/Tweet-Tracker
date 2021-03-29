<template>
  <section>
    <div class="content">
      <div class="wrapper">
        <Logo/>
        <div class="routes">
          <div class="route">
            <div class="icon">
              <IconUser/>
            </div>
            <label>Perfil</label>
          </div>
          <div class="route">
            <div class="icon">
              <IconClipboard/>
            </div>
            <label>Hashtags Salvas</label>
          </div>
        </div>
      </div>
      <div class="icon-close" @click="switchMenu()">
        <IconDoubleArrow/>
      </div>
    </div>
  </section>
</template>

<script>
import IconUser from '../components/icons/User'
import IconClipboard from '../components/icons/Clipboard'
import IconDoubleArrow from '../components/icons/DoubleArrow'
import { mapState } from 'vuex'
import Logo from '../components/Logo'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    Logo,
    IconClipboard,
    IconUser,
    IconDoubleArrow
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
.icon-close {
  width: 30px;
  align-self: flex-end;
  margin: 20px;
  cursor: pointer;
}
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 20px);
  height: 100%;
  padding: 10px;
}
.icon {
  margin-right: 10px;
  width: 20px;
}
.routes {
  width: 100%;
  .route {
    background: linear-gradient(89.95deg, rgba(196, 196, 196, 0.14) 2.37%, rgba(196, 196, 196, 0) 96.66%);
    display: flex;
    align-items: center;
    margin: 10px 10px;
    padding: 10px;
    border-radius: 10px;
    label {
      font-family: Chivo;
      font-size: 12px;
    }
  }
}
.logo { margin-bottom: 10px; }
</style>
