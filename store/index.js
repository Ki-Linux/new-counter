import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export const state = () => ({
    plan: 'free',
    back_data: [],//["", 8, 9, ""],
    back_select_data: [],
    show_data: [0, ""],//[現在表示されている文字や画像の数, 文字や画像(freeは同じものが繰り返されるから１つだけ)]
    which_button: ["", 0],//0はgetterが反応するようにするためのもの
    token: null,
    username: "",
    canClick: true,
    select_plan: "",
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

        if(selection === "up") {//数を増やす

            //state.show_data.splice(0, 1, state_show_data++);
            //state.which_button[0] = selection; 

                /*if(state.select_plan === "free") {

                    state.back_data.splice(2, 1, state.back_data[2]++);

                }*/

            if(state.select_plan === "free") {

                state.show_data.splice(0, 1, state.back_data[2]+=1);//表示されている数字にプラス１する

            }

            
                
            
            
            //Vue.set(state., 2, state.back_data[2]++); 
        } else if(selection === "down"){//数を減らす

            //state.which_button[0] = selection;

            if(state.select_plan === "free") {

                state.show_data.splice(0, 1, state.back_data[2]-=1);//表示されている数字にマイナス１する
            }

            
 

        } else {//初期化

            //state.back_data.splice(2, 1, state.first_data);
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

        const into_array = row.length;

        //freeのときに入れる配列
        let which_array = state.back_data;

        if(state.select_plan !== "free") {//free以外のときに入れる配列

            which_array = state.back_select_data;

        } 

        

        for(let i=0; i < into_array; i++) {
           
            //Vue.set(state.back_data, i, row[i]);
            

            which_array.splice(i, 1, row[i]);//文字や画像を入れる(!!基本となるデータ)


        }

        //state.back_data = row[2];//初期化の方の数字

    },

    loginTokenName(state, res) {//トークンとユーザーネームをstoreへ
        state.token = res[0];
        state.username = res[1];
        //this.$cookies.set("key", state.token, { expires: 7 });
    },

    loginName(state, res) {//トークンとユーザーネームをstoreへ
        state.username = res;
        //this.$cookies.set("key", state.token, { expires: 7 });
    },

    cookieToken(state, content) {//くっきーからstoreへ
        state.token = content;
        console.log(state.token)
    },

    changeClick(state, content) {
        state.canClick = content;
        console.log(state.canClick)
    },

    planSelect_arrayDelete(state, content) {
        state.select_plan = content;

        const back = state.back_data;
        const select = state.back_select_data;

        back.splice(0, back.length);
        select.splice(0, select.length);
        
    },

    chooseData(state, content) {

        state.back_data.splice(3, 1, content);
    },

    inSelectData(state, content) {

        state.back_select_data = content;

    }


};


export const getters = {

    showData(state) {//freeプランのときのみ
        return state.show_data[0];
    },
    whichButtonData(state) {
        return state.which_button;
    },
    backTargetData(state) {
        return state.back_data[1];
    },
    showImg(state) {//free
        return state.back_data[3];
    },
    isAuthenticated(state) {
        return state.token != null
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

    loginTokenName(context, res) {//setToken to cookie

        context.commit("loginTokenName", res);
    }, 

    loginName(context, res) {//setToken to cookie

        context.commit("loginName", res);
    }, 

    nuxtServerInit({ commit }, { req }) {//reload
        commit("cookieToken", req.headers.cookie);
        //console.log(req.headers.cookie);
    },

    changeClick(context, judge) {
        context.commit("changeClick", judge);
    },

    planSelect_arrayDelete(context, plan) {
        context.commit("planSelect_arrayDelete", plan);
    },

    chooseData(context, data) {

        context.commit("chooseData", data);

    },

    inSelectData(context, send_array) {

        context.commit("inSelectData", send_array);

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