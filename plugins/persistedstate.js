import persistedstate from 'vuex-persistedstate'

export default ({ store })=> {//JSON set
    persistedstate({
        key: 'set_Data',
        paths: ['back_data', 'back_select_data', 'show_data', 'username', 'select_plan'],
    })(store)
} 