// store/user.js
import { getStore } from '@/utils/mUtils'
import { getUserInfo } from '@/api/user'  // 导入用户信息相关接口
import { getToken, setToken, removeToken } from '@/utils/auth'

const user  = {
    state : {
        name:'',
        avatar:'',
        token: getToken('Token'),
        roles: [],
        browserHeaderTitle: getStore('browserHeaderTitle') || 'ColdCoder'
    },
    getters : {
        token: state => state.token,
        roles: state => state.roles,
        avatar: state => state.avatar,
        name: state => state.name,
        browserHeaderTitle: state => state.browserHeaderTitle,
    },
    mutations: {
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_BROWSERHEADERTITLE: (state, action) => {
            state.browserHeaderTitle = action.browserHeaderTitle
        },
        SET_NAME: (state, name) => {
        state.name = name
        },
        SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
        }
    },

}
