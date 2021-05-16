import Vue from 'vue'
import Vuex from 'vuex'


export const state = () => ({
    status: '',
    token: localStorage.getItem('access_token') || '',
    user: localStorage.getItem('user') || {}
})

export const mutations = {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, {
        token,
        user
    }) {
        state.status = 1
        state.token = token
        state.user = user
    },
    auth_error(state) {
        state.status = 'error'
    },
    logout(state) {
        state.status = ''
        state.token = ''
        localStorage.removeItem('user')
        state.user = {}
    },
}

export const actions = {
    login({
        commit
    }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            this.$axios.post('/auth/login', user)
            .then(res => {


                if (res.data.status == 1)
                {
                    let token = res.data.data.token
                    let user = res.data.data.user


                    localStorage.setItem('access_token', token)

                    localStorage.setItem('user', JSON.stringify(user));

                    this.$axios.defaults.headers.common['Authorization'] = token

                    commit('auth_success', {
                        token,
                        user
                    })

                    resolve(res)

                } else {
                    resolve(res)
                }
                

            })
            .catch(err => {
                commit('auth_error')
                localStorage.removeItem('access_token')
                reject(err)
            })
        })
    },


    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('logout')

            this.$axios.post('/auth/logout')
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
            delete this.$axios.defaults.headers.common['Authorization']
            resolve()
        })
    }
}

export const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user
}