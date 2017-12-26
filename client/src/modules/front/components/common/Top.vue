<template>
  <header class="top-header">
    <router-link to="/" class="top-header__main-icon" @click.native="clearFilter">抱抱柚子</router-link>
  </header>
</template>
<script>

export default {
  name: "top-header",
  data() {
    return {};
  },
  created() {},
  methods: {
  },
  computed: {}
};
</script>
<style lang="less" scoped>
.top-header {
  height: 60px;
  line-height: 60px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
  padding: 0 40px 0 40px;
  background: rgba(76, 144, 221, 0.4);
  z-index: 3;
  .top-header__main-icon {
    text-decoration: none;
    color: #FFF;
    font-weight: 600;
    font-size: 20px;
  }
  .top-header__menu-button {
    position: absolute;
    left: 10px;
    top: 50%;
    width: 32px;
    height: 32px;
    margin-top: -16px;
    display: none;
  }
}

@media screen and (max-width: 850px) {
  .top-header {
    display:none;
  }
}
</style>
