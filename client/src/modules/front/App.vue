<template>
  <div id="app">
    <div class="wrap">
      <div class="container">
        <Top></Top>
        <transition name="fade" mode="out-in">
          <keep-alive exclude="article">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
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
.container {
  display: flex;
  flex-direction: column;
  background: url(https://s10.mogucdn.com/mlcdn/c45406/180220_18ij4b1a5ldb75lbk0ihfh3kb2d37_2000x1125.jpg);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-width: 100%;
  min-height: 100%;
  height: 100%;
  width: 100%;
}
</style>
