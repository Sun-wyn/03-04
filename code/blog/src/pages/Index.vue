<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
  </Layout>
</template>
<page-query>
query{
  busers: allMyData{
    edges {
      node {
        githubUsername
        blogTitle
        blogDescribe
        htmlTitle
        fontColor
        useBackgroundImage
        backgroundColorLeft
        backgroundColorRight
        mini
        webSites{
          name
          url
        }
      }
    }
  }
}
</page-query>
<script>
import UserApi from '@/api/user'
export default {
  name: 'App',
  computed: {
    githubUsername() {
      return this.$page.busers.edges[0].node.githubUsername
    },
    htmlTitle() {
      return this.$page.busers.edges[0].node.htmlTitle
    },
  },
  created() {
    
    // this.$setTitle(this.$route.meta.title)
    // let pathArr = this.$route.path.split('/')
    // if (pathArr[1] == 'user' && windowSize.height > windowSize.width * 1.2) {
    //   this.$router.push('/mobile/user/blog')
    // }
    // if (pathArr[1] == 'mobile' && windowSize.height <= windowSize.width * 1.2) {
    //   this.$router.push('/')
    // }
  },
  mounted(){
    this.getInfoFn()
    // let windowSize = this.$util.getWindowSize()

    this.$router.push('/new')
  },
  methods: {
    getInfoFn() {
      UserApi.getInfo(this.githubUsername).then((response) => {
        let result = response.data
        localStorage.setItem('AVATAR_URL', result['avatar_url'])
        localStorage.setItem('NAME', result['name'])
        localStorage.setItem('LOCATION', result['location'])
        localStorage.setItem('BLOG', result['blog'])
        localStorage.setItem('FOLLOWERS', result['followers'])
        localStorage.setItem('FOLLOWING', result['following'])
      })
    },
  },
}
</script>

