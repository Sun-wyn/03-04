<template>
  <div>
    <el-card shadow="never">
      <el-menu>
        <el-menu-item >
          <g-link to="/new" class="item">
            <i class="el-icon-star-off"></i>
            <span>最新动态</span>
          </g-link>
        </el-menu-item >
        <el-menu-item>
          <g-link to="/social" class="item">
            <i class="el-icon-mobile-phone"></i>
            <span>社交圈</span>
          </g-link>
        </el-menu-item>
        <el-menu-item>
          <g-link to="/blog" class="item">
            <i class="el-icon-edit-outline"></i>
            <span>博客列表</span>
          </g-link>
        </el-menu-item>
        <el-menu-item>
          <g-link to="/project" class="item">
            <i class="el-icon-service"></i>
            <span>开源项目</span>
          </g-link>
        </el-menu-item>
      </el-menu>
    </el-card>

    <el-card shadow="never" style="margin-top: 20px;text-align: center">
      <div
        v-if="!tokenVal"
        style="font-size: 0.9rem;line-height: 1.5;color: #606c71;"
      >
        <el-tag type="danger" size="small">&nbsp;</el-tag>&nbsp;&nbsp;
        Token未绑定&nbsp;&nbsp;
        <el-button type="text" @click="openTokenDialog">绑定</el-button>
      </div>
      <div
        v-if="tokenVal"
        style="font-size: 0.9rem;line-height: 1.5;color: #303133;"
      >
        <el-tag type="success" size="small">&nbsp;</el-tag>&nbsp;&nbsp;
        Token已绑定&nbsp;&nbsp;
        <el-button type="text" @click="cancellation">注销</el-button>
      </div>
      <div style="margin-top: 10px;text-align: left">
        <el-alert
          title="Token获取"
          type="info"
          description="在 github-> settings-> developerSettings-> personalAccessTokens 勾选gist权限,获取Token. 详情参考README.md"
          :closable="false"
        >
        </el-alert>
      </div>
    </el-card>
    <token-dialog ref="tokenDialog"></token-dialog>
  </div>
</template>

<script>
import TokenDialog from '@/components/TokenDialog.vue'
import token from '@/store/token.js'
export default {
  components: {
    TokenDialog,
  },
  data() {
    return {
      parentUrl: '',
      menuList: [],
      tokenVal: '',
    }
  },
  computed: {
    githubUsername() {
      return this.$page.busers.edges[0].node.githubUsername
    },
    mini() {
      return this.$page.busers.edges[0].node.mini
    },
  },
  mounted() {
    this.getTokenFn()
  },
  methods: {
    openTokenDialog() {
      this.$refs.tokenDialog.open(() => {})
    },
    cancellation() {
      token.cancellation()
      this.getTokenFn()
    },
    getTokenFn() {
      this.tokenVal = token.getToken()
    },
  },
}
</script>
<style>
.item{
    display: inline-block;
    width:100%;
    height: 100%;
    color: #303133;
}
.item:hover{
    text-decoration: none;
}
.active--exact{
    color: #409EFF;
}
.active--exact>i{
    color: #409EFF;
}
</style>
