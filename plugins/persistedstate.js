import persistedstate from 'vuex-persistedstate'

export default ({ store })=> {//JSON set
    persistedstate({
        key: 'set_Data',
        paths: ['plan', 'first_data', 'back_data', 'back_select_data', 'which_button', 'username', 'select_plan'],
    })(store)
} 