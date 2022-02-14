import persistedstate from 'vuex-persistedstate'

export default ({ store })=> {//JSON set
    persistedstate({
        key: 'set_Data',
    })(store)
} 