
import Vue from 'vue'
import Vuex from 'vuex'
if(process.env.NODE_ENV === "development"){
    Vue.use(Vuex) 
} 

import user from './modules/user'
import menu from './modules/menu'
import permission from './modules/permission'



export default new Vuex.Store({
    modules: {
        user,
        menu,
        permission,
        
    }
});


