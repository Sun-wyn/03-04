<template>
  <div>
    <el-dialog title="绑定Token" :visible.sync="show" width="500px">
      <el-form :model="tokenForm" ref="tokenForm" label-width="100px">
        <el-form-item label="GitHub">
          <el-tag>{{ githubUsername }}</el-tag>
        </el-form-item>
        <el-form-item
          prop="token"
          label="Token"
          :rules="[
            { required: true, message: '请输入accessToken', trigger: 'blur' },
          ]"
        >
          <el-input
            :key="0"
            v-model="tokenForm.token"
            placeholder="请保管好Token"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import token from '../store/token'
import UserApi from '@/api/user'

export default {
  data() {
    return {
      show: false,
      handleClose: null,
      tokenForm: {
        token: '',
      },
    }
  },
  computed: {
    githubUsername() {
      return this.$page.busers.edges[0].node.githubUsername
    },
  },
  methods: {
    open(handleClose) {
      this.handleClose = handleClose
      this.show = true
      this.tokenForm.token = ''
    },
    onSubmit() {
      this.$refs['tokenForm'].validate((valid) => {
        if (valid) {
          let githubUsername = this.githubUsername
          let accessToken = this.tokenForm.token
          this.verifyTokenFn(accessToken, githubUsername)
          if (typeof this.handleClose == 'function') {
            this.handleClose()
          }
        }
      })
      this.show = false
    },
    verifyTokenFn(accessToken, githubUsername) {
      UserApi.verifyToken(accessToken)
        .then((response) => {
          let result = response.data
          if (githubUsername == result['login']) {
            token.setToken(accessToken)
            this.$parent.getTokenFn()
            this.$notify({
              title: '成功',
              message: 'Token绑定成功',
              type: 'success',
            })
          } else {
            this.$message({
              message: 'Token用户不一致',
              type: 'error',
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
