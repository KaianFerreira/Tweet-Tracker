<template>
  <section>
    <div class="logo">
      <div class="name">TWEET TRACKER</div>
      <div class="icon">
        <IconPin/>
      </div>
    </div>
  </section>
</template>

<script>
import IconPin from './icons/pin'
export default {
  components: {
    IconPin
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables";
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: pre;
    .name {
      color: $color-1;
      font-family: Bungee;
      font-size: 28px;
    }
    .icon {
      width: 26px;
    }
  }
</style>
