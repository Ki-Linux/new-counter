import persistedstate from 'vuex-persistedstate'

export default ({ store })=> {//JSON set
    persistedstate({
        key: 'set_Data',
        paths: ['plan', 'first_data', 'back_data', 'which_button', 'username', 'select_plan'],
    })(store)
} 