<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import demo1 from './demo1.js'
import demo2 from './demo2.js'
import demo3 from './demo3.js'
import demo4 from './demo4.js'
import demo5 from './demo5.js'
import demo6 from './demo6.js'
import demo7 from './demo7.js'
import demo8 from './demo2.js'

export default {
  name: "demo1",
  data() {
    return {
      isLoading: false
    };
  },
  props: {
    type: Number
  },
  mounted () {
    let id = this.$route.params.id || this.type
    let arr = [demo1, demo2, demo3, demo4, demo5, demo6, demo7, demo8]
    arr[id - 1]()
  }
};
</script>

<style lang="less" scoped>
#canvas {
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
}
</style>
