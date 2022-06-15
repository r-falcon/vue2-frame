<template>
  <div class="app-container">
    <button style="margin: 10px 0" @click="isShow1 = !isShow1">Toggle</button>
    <transition name="fade">
      <div v-if="isShow1">单元素/组件过渡</div>
    </transition>
    <!-- 
      过渡的类名：
      在进入离开的过渡中，会有6个切换：v-enter、v-enter-active、v-enter-to、v-leave、v-leave-active、v-leave-to
    -->
    <!-- css过渡 -->
    <button style="margin: 10px 0" @click="isShow2 = !isShow2">Toggle</button>
    <transition name="slide-fade">
      <div v-if="isShow2">hello world</div>
    </transition>

    <button style="margin: 10px 0" @click="isShow3 = !isShow3">Toggle</button>
    <div class="animate__animated animate__fadeInUp">
      <div v-if="isShow3">love and peace</div>
    </div>

    <button style="margin: 10px 0" @click="isShow4 = !isShow4">Toggle</button>
    <!-- <transition name="fade"> this is animate content </transition> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow1: true,
      isShow2: true,
      isShow3: true,
      isShow4: true,
    };
  },
};
</script>

<style>
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
} */

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter-active {
  animation: bounce-in 0.5s;
}

.fade-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}
</style>
