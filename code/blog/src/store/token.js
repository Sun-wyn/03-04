import Cookie from '@/utils/cookie'
import Vue from 'vue'

const TOKEN_KEY = "TOKEN_KEY"
const token = {
    getToken: function () {
        return Cookie.getAttribute(TOKEN_KEY)
    },
    setToken: function ( value ) {
        Cookie.setAttribute(TOKEN_KEY, value, 30)
    },
    removeToken: function () {
        Cookie.remove(TOKEN_KEY)
    },
    cancellation() {
        this.removeToken()
        Vue.prototype.$message({
            message: 'Token取消绑定',
            type: 'info'
        })
    }
}

export default token