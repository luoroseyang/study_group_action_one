<template>
  <div class="sideBox">
    <div class="sideBox__mask" :class="{ 'sideBox__mask--show': sideBoxOpen}" @click="closeSideBox"></div>
    <div class="sideBox__main" :class="{ 'sideBox__main--open': sideBoxOpen}">
      <img src="https://s10.mogucdn.com/mlcdn/c45406/171221_06lj22cljgc1a4cbk0gfjhfk6gh02_640x640.jpg" alt="" class="sideBox__img" @click="backToIndex">
      <p class="sideBox__name">抱抱柚子</p>
      <p class="sideBox__motto">Zhe shi ge sha ???</p>
      <ul class="sideBox__tagList">
        <li v-for="tag in tags" class="sideBox__tagItem" :class="{ 'sideBox__tagItem--active': (typeof selectTags.find(function(e){return e.id == tag.id}) !== 'undefined')}" @click="toggleSelectTags({id:tag.id, name:tag.name})" :key="tag.id">
          <span>{{tag.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import tagApi from "api/tag.js";
import throttle from "lib/throttle.js";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "sideBox",
  data() {
    return {
      tagList: [],
      scrollTop: 0
    };
  },
  props: {
    category: {
      type: Array,
      required: false
    }
  },
  computed: {
    ...mapGetters(["tags", "selectTags", "sideBoxOpen"])
  },
  created() {
    if (typeof window == "undefined") {
      return;
    }
    this.getAllTags();
  },
  methods: {
    ...mapMutations({
      setSelectTags: "SET_SELECT_TAGS",
      toggleSideBox: "TOGGLE_SIDEBOX",
      closeSideBox: "CLOSE_SIDEBOX",
      toggleSelectTags: "TOGGLE_SELECT_TAGS"
    }),
    ...mapActions(["getAllTags"]),
    backToIndex() {
      this.$router.push("/");
    },
    clearSelectTagArr() {
      this.setSelectTags([]);
    }
  },
  watch: {}
};
</script>

<style lang="less" scoped>
.sideBox {
  height: 100%;
  margin-right:20px;
  float: left;
  text-align: center;
  .sideBox__img {
    width: 150px;
    border-radius: 50%;
    box-shadow: 0 0 2px black;
    margin-top: 10px;
    cursor: pointer;
  }
  .sideBox__name {
    color: grey;
    font-size: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .sideBox__motto {
    color: grey;
    margin-bottom: 8px;
  }
  .sideBox__iconItem {
    display: inline-block;
    cursor: pointer;
    a {
      text-decoration: none;
      color: grey;
      .iconfont {
        font-size: 28px;
        &:hover {
          color: black;
        }
      }
    }
  }
  .sideBox__tagList {
    list-style: none;
    padding: 10px;
  }
  .sideBox__tagItem {
    background-color: #fff;
    display: inline-block;
    padding: 0 10px;
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    white-space: nowrap;
    &:hover {
      background-color: #409eff;
      color: #fff;
    }
  }
  .sideBox__tagItem--active {
    background-color: #409eff;
    color: #fff;
  }
  .sideBox__mask {
    display: none;
  }
}

@media screen and (max-width: 850px) {
  .sideBox {
    display: none;
  }
}
</style>
