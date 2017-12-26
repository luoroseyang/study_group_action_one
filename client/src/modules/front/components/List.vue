<template>
  <div class="list">
    <Side></Side>
    <div class="list__article">
      <ul class="list__article__ul">
        <router-link v-for="article in posts" :key="article.id" :to="'/article/'+article.id" class="continue-reading">
          <li class="list__article__item">
            <h1 class="list__article__item__title">{{ article.title }}</h1>
            <div class="list__article__item__info">
              <p class="list__article__item__time">{{article.createTime}}</p>
              <div class="list__article__item__abstract markdown-body" v-html="compiledMarkdown(article.abstract)"></div>
            </div>
          </li>
        </router-link>
      </ul>
      <Pagination :curPage='curPage' :allPage='allPage' @changePage='changePage'></Pagination>
      <div v-if="posts.length==0 && isLoading==false" class="msg-box">
        <p>暂时没有相关文章</p>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from 'publicComponents/Pagination.vue'
import Loading from 'publicComponents/Loading.vue'
import Side from './common/Side.vue'
import articleApi from 'api/article.js'
import marked from 'lib/marked.js'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'list',
  computed: {
    ...mapGetters([
      'posts',
      'tags',
      'curPage',
      'allPage',
      'selectTags',
      'searchTags',
      'currentPost'
    ]),
    filterMsg() {
      let msg = ''
      this.selectTags.forEach(item => { msg += item.name + '、' })
      return msg.replace(/、$/, '')
    }
  },
  components: {
    Pagination,
    Side,
    Loading
  },
  data() {
    return {
      isLoading: false
    }
  },
  created() {
  },
  beforeMount() {
    // 用来判断是否有数据，有数据就不再请求了
    if(this.currentPost.id == '') {
      return;
    }
    this.isLoading = true;
    this.getAllPosts({page:this.$store.state.route.params.page}).then(()=> {
      this.isLoading = false;
    })
  },
  preFetch(store) {
    store.dispatch('getAllTags')
    return store.dispatch('getAllPosts',{page:store.state.route.params.page}).then(()=>{
    })
  },
  methods: {
    ...mapActions([
      'getAllPosts',
      'getAllTags'
    ]),
    compiledMarkdown(value) {
      return marked(value)
    },
    changePage(cur) {
      this.isLoading = true;
      this.$router.push('/page/' + cur)
      this.getAllPosts({tag:this.searchTags, page:cur}).then(() => {
        this.isLoading = false;
      })
    }
  },
  watch: {
    selectTags() {
      this.isLoading = true;
      this.getAllPosts({
        tag: this.searchTags
      }).then(()=> {
        this.isLoading = false;
      })
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  flex: 1;
  padding: 10px;
  max-width: 1200px;
  width: 96%;
  height: 100%;
  margin: 0 auto 20px;
  padding-top: 10px;
  display: flex;
  .list__article {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .list__article__ul {
    margin: 20px 0 0 0;
    padding: 0;
  }
  
  .list__article__item {
    margin: 0 auto;
    padding: 0px 30px 10px 30px;
    margin-bottom: 15px;
    list-style: none;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }

  .list__article__item__title {
    font-size: 24px;
    margin: 10px 0;
    word-break: break-all;
    a {
      text-decoration: none;
      color: black;
    }
  }
  .list__article__item__time {
    color: #7f8c8d;
    font-weight: 400;
    margin-bottom: 10px;
    margin-top: 2px;
  }
  .list__article__item__abstract {
    margin-bottom: 5px;
  }
  .continue-reading {
    text-decoration: none;
    color: #0366d6;
  }
  .list__article__filterMsg {
    font-size: 20px;
    text-align: center;
    span {
      color: blue;
    }
  }
  .list__loading {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 200px;
    margin-left: 25px;
    margin-top:  -90px;
  }
  .msg-box {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    margin-left: 25px;
    margin-top:  -90px;
    text-align: center;
    color: #bfbfbf;
  }
}

</style>
