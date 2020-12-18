import request from '@/utils/request'

export default {
    verifyToken: function (token) {
        console.log(token)
        return request({
            url: '/user?access_token=' + token
        })
    },
    getInfo: function ( githubUsername ) {
        return request({
            url: '/users/' + githubUsername
        })
    },
    followers: function (query, githubUsername) {
        return request({
            url: `/users/${githubUsername}/followers?page=${query.page}&per_page=${query.pageSize}`
        })
    },
    following: function (query, githubUsername) {
        return request({
            url: `/users/${githubUsername}/following?page=${query.page}&per_page=${query.pageSize}`
        })
    },
    info:function (githubUsername) {
        return request({
            url: `/users/${githubUsername}`
        })
    },
}