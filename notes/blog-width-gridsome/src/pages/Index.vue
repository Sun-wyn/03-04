<template>
  <Layout>
    <!-- Page Header -->
    <header class="masthead" 
    :style="{'background-image': `url(GRIDSOME_API_URL+${general.cover.url})`}">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1>{{general.title}}</h1>
              <span class="subheading">{{general.subTitle}}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div
            class="post-preview"
            v-for="edge in $page.posts.edges"
            v-bind:key="edge.node.id"
          >
            <g-link :to="'/post/'+edge.node.id" >
            <h2 class="post-title">
              {{ edge.node.title }}
            </h2>
            </g-link>
            <p class="post-meta">
              Posted by
              <a href="#">{{ edge.node.author.username }}</a>
              on {{ edge.node.created_at }}
            </p>
            <p>
              <span style="margin-right:10px;" v-for="tag in edge.node.tags" v-bind:key='tag.id'>
                <g-link :to="'/tag/'+tag.id" >
                  {{tag.title}}
                </g-link>
              </span>
            </p>
            <hr />
          </div>

          <!-- Pager -->
          <!-- <div class="clearfix">
            <a class="btn btn-primary float-right" href="#"
              >Older Posts &rarr;</a
            >
          </div> -->
          <Pager :info="$page.posts.pageInfo"/>
        </div>
      </div>
    </div>
  </Layout>
</template>
<page-query>
query ($page: Int) {
  posts: allStrapiPost (perPage:2, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id 
        title
      	author {
          id
        	username
      	}
        tags {
          id
          title
        }
        created_at
      }
    }
  }
  general: allStrapiGeneral{
    edges{
      node{
        id
        title
        subTitle
        cover{
          url
        }
      }
    }
  }
}
</page-query>
<script>
import { Pager } from 'gridsome'
export default {
  name: "IndexPage",
  components: {
    Pager
  },
  metaInfo: {
    title: "Hello, world!",
  },
  computed: {
    general () {
      return this.$page.general.edges[0].node
    }
  }
};
</script>

<style>
</style>
