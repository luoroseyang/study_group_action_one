<template>
  <div class="admin">
    <div class="admin__list">
      <list></list>
    </div>
    <div class="admin__editor">
      <editor></editor>
    </div>
    <div class="admin__logout">
      <i class="fa fa-power-off" aria-hidden="true" @click="logout"></i>
    </div>
  </div>
</template>

<script>
import Editor from './Editor.vue'
import List from './List.vue'
import {
  mapMutations
} from 'vuex'

export default {
  name: 'admin',
  components: {
    Editor,
    List
  },
  data() {
    return {}
  },
  methods: {
    ...mapMutations({
      deleteToken: 'DELETE_TOKEN'
    }),
    logout() {
      this.$confirm('此操作将退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteToken()
        this.$router.push('/admin/login')
      }).catch(() => {

      })
    }
  },
  computed: {}
}
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/_settings.styl'
.admin
  height 100%
  display flex
  flex-direction row
  &__list
    width 400px
    overflow-y auto
    overflow-x hidden
  &__editor
    flex 1
  &__logout
    position absolute
    top 22px
    right 30px
    font-size 28px
    cursor pointer
    color $blue
</style>
