import persistedstate from 'vuex-persistedstate'
//import * as Cookies from 'js-cookie'

export default ({ store })=> {//JSON set
    persistedstate({
        key: 'set_Data',
        paths: ['back_data', 'back_select_data', 'show_data', 'username', 'select_plan', 'show_phone'],
    })(store)
} 
