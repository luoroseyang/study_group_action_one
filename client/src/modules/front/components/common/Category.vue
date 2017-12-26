<template>
  <div class="sideBox">
    <div class="categoryBox" ref="categoryBox">
      <ul class="categoryBox__list">
        <li v-for="item in category" :class="'categoryBox__'+item.tagName" :key="item.id">
          <a :href="item.href">{{item.text}}</a>
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
  name: "category",
  data() {
    return {}
  },
  props: {
    category: {
      type: Array,
      required: false
    }
  }
}
</script>

<style lang="less" scoped>
.sideBox {
  height: 100%;
  overflow-y: auto;
  max-width: 300px;
  margin-top: 30px;
  text-align: left;
  .categoryBox {
    padding-left: 20px;
    padding-right: 15px;
    font-size: 13px;
    ul {
      list-style: none;
      li {
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 1.8;
        a {
          color: #909399;
          text-decoration: none;
          &:hover {
            color: #606266;
          }
        }
      }
    }
    .categoryBox__h1 {
      margin-left: 0;
    }
    .categoryBox__h2 {
      margin-left: 10px;
    }
    .categoryBox__h3 {
      margin-left: 20px;
    }
    .categoryBox__h4 {
      margin-left: 30px;
    }
    .categoryBox__h5 {
      margin-left: 40px;
    }
    .categoryBox__h6 {
      margin-left: 50px;
    }
  }
}
</style>
