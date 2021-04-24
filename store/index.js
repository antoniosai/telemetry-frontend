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


                    localStorage.setItem('access_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNmQwMWRhNGU0YzU2YjkzNTcwZGM0MmUwNDUxMGM2MDdlM2EwYTg2MGExNmJjNzAwODVhZTAxZGUxMTIxZTg4OGZlYzUxMDRlMjM3MjYxMmEiLCJpYXQiOjE2MTkyOTczMDQuNTY4NzQzOTQ0MTY4MDkwODIwMzEyNSwibmJmIjoxNjE5Mjk3MzA0LjU2ODc0NzA0MzYwOTYxOTE0MDYyNSwiZXhwIjoxNjUwODMzMzA0LjU1ODA1OTkzMDgwMTM5MTYwMTU2MjUsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.QDKgmkWvh0eFnZY2pbchNDwdcmSGUsvcO3qwSeMsiRcoVri7c1W04b985lsf7om7RpQipAUMZxkJh5XHydx9mPC7ugcEikU8B1rvGJU_7ny1QOwRvRpQ1lBWERkw3Zptf7SIFzfBazV1s7g--BNNlaGFRZX-nHhPkSrX3AyqlKyI_sokh24TCicFFFW9NM5L8XcEzPA8yW_ek7kVj_6063T3VOyi_-ECI_WHeO4q_qLaqdNezR7hFwrZqzOdHmdjYVzPFHAfu0GCOCLElheyAb5WMOYugNJZJRo2elMta2OOsZgiPglvR_nUbFumnegB_ojbacPpWrV7eCD286ZNKvSVzbAv8XqVYKSfuQvkZ-1LmVgM74qcEFkYSFZfrZ99Dl-Y92oXue81zEmUFEXLynMeJe2ccaRhZdkhjRmMATJ_fA9hQOoRhtsBh866lWqP0837jHbwyN5bOZuPxoNpbxRkVYOZ0cOR7pqPBMXZxXqvsm01l6B0Yd3J2JgLEnZ-NvY9t3OF_VxuiEQLsKkz_jGiquTHqeYCeWYJ4DUfmd5lslxx6Hn_waV4dwty1PXDbAgXKu6IwF7kEdRQmLA8TF65MjxJ18aQE377kbHZcIxbZ1RAXA6tSyMEVk3RZW6pM_WuUU92b79qie7INuh40BfyWZlfPV_i15SkAtzFzbk')

                    localStorage.setItem('user', JSON.stringify(user));

                    this.$axios.defaults.headers.common['Authorization'] = token

                    commit('auth_success', {
                        token,
                        user
                    })

                    resolve(res)

                    // this.$router.push('module1.abmp_report')
                } else {
                    resolve(res)
                }
                

            })
            .catch(err => {
                commit('auth_error')
                localStorage.removeItem('token')
                reject(err)
            })
        })
    },


    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('logout')

            this.$axios.post('/auth/logout')
            localStorage.removeItem('token')
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