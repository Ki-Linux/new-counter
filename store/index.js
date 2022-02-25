import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export const state = () => ({
    plan: 'free',
    first_data: 0,
    back_data: ["", 8, 9, 're'],
    which_button: ["", 0],//0はgetterが反応するようにするためのもの
    token: "",
    /*plugins: [
        createPersistedState({
            storage: {
                getItem: key => Cookies.get(key),
                setItem: (key, value) => ,
                removeItem: key => Cookies.remove(key),
            }
        })         
    ]*/
});


export const mutations = {


    UpDownNumber(state, selection) {


    //Vue.set(state.back_data, 2, state.back_data[2]++);

        if(selection === "up") {

            state.back_data.splice(2, 1, state.back_data[2]+=1);
            state.which_button[0] = selection; 
            
            //Vue.set(state., 2, state.back_data[2]++); 
        } else if(selection === "down"){

            state.back_data.splice(2, 1, state.back_data[2]-=1);
            state.which_button[0] = selection;

        } else {//初期化

            state.back_data.splice(2, 1, state.first_data);
            state.which_button[0] = selection;
        }

        state.which_button.splice(1, 1, state.which_button[1]+=1);//getter反応のため
        //localStorage.setItem('set_JSON', JSON.stringify(state.back_data));//tolocalStorage

    },

    /*increment_back(state, num) {//data reset with vuex
        
        Vue.set(state.back_data, 2, num);
    },*/

    dataInto(state, row) {//optionでのdataの変更

        row.splice(1, 2, Number(row[1]), Number(row[2]));//change from string to Number

        for(let i=0; i < 4; i ++) {
           
            Vue.set(state.back_data, i, row[i]);
        }

        state.first_data = row[2];//初期化の方の数字

    },

    loginToken(state, res) {//トークンをstoreへ
        state.token = res;
        //this.$cookies.set("key", state.token, { expires: 7 });
    },

    cookieToken(state, content) {//くっきーからstoreへ
        state.token = content;
        console.log(state.token)
    }


};


export const getters = {
    
    whichButtonData(state) {
        return state.which_button;
    },
    backPresentData(state) {
        return state.back_data[2];
    },
    backTargetData(state) {
        return state.back_data[1];
    },
    showImg(state) {
        return state.back_data[3];
    }

}


export const actions = {

    UpDownNumber(context, selection) {

        context.commit("UpDownNumber", selection);
    },

    /*increment(context, num) {//data reset with vuex
        context.commit("increment_back", num);
    },*/

    inData(context, row) {

        context.commit("dataInto", row);
    },

    loginToken(context, res) {//setToken to cookie

        context.commit("loginToken", res)
    }, 

    nuxtServerInit({ commit }, { req }) {//reload
        commit("cookieToken", req.headers.cookie)
        //console.log(req.headers.cookie);
    }

}




/*export default new Vuex.Store({
    state: {
        back_data: '["＞",  8, 4, "せ"]',
    },
    mutations: {
    },
    actions: {
    }
})*/