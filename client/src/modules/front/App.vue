<template>
  <div id="app">
    <div class="wrap">
      <Top></Top>
      <transition name="fade" mode="out-in">
        <keep-alive exclude="article">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import Top from "./components/common/Top.vue";

export default {
  name: "app",
  components: {
    Top
  }
};
</script>

<style lang="less">
@import "assets/style/main.less";
@import "assets/style/markdown.less";
@import "assets/style/reset.less";

#app {
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
