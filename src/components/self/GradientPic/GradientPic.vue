<template>
  <div :class="[loaded ? 'gradient-wrapper' : '']">
    <img :src="src" @load="loaded = true" />
  </div>
</template>
<script>
export default {
  props: ["src"],
  data() {
    return {
      loaded: false,
    };
  },
};
</script>
<style scoped lang="scss">
@keyframes wrapper-gradient {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes img-gradient {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.gradient-wrapper {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  animation: wrapper-gradient 2s linear;
}
.gradient-wrapper > img {
  animation: img-gradient 2s linear;
}
</style>
