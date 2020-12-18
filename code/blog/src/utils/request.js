import axios from 'axios'
import Vue from 'vue'
import Cookie from '@/utils/cookie'


const service = axios.create({
    baseURL: "https://api.github.com",
    timeout: 15000,
})

service.interceptors.request.use(
    config => {
        let token = Cookie.getAttribute("TOKEN_KEY")
        if (token) {
            let sp = "?"
            if (config.url.indexOf("?") >= 0) {
                sp = "&"
            }
            config.url = config.url + sp + "access_token=" + token
            config.headers.Accept = 'application/vnd.github.v3+json'
        }
        return config
    },
    error => {

    }
)


service.interceptors.response.use(
    response => {
        let responseJson = response.data
        return response
    },
    error => {
        let message
        switch (error.response.status) {
            case 401:
                message = "Token错误"
                break
            default:
                message = error.response.data.message
                break
        }
        Vue.prototype.$message({
            message: message,
            type: 'error'
        })
        return Promise.reject('error')
    }
)

export default service
