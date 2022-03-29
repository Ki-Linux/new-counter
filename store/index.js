import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export const state = () => ({
    back_data: [],//["", 目標値, 現在値, ""],
    back_select_data: [],
    show_data: [0, ""],//[現在表示されている文字や画像の数, 文字や画像(freeは同じものが繰り返されるから１つだけ)]
    show_select: false,//選択を表示するかどうか
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

        const show_data = state.show_data;


    //Vue.set(state.back_data, 2, state.back_data[2]++);

        if(selection[0] === "up") {//数を増やす

            //state.show_data.splice(0, 1, state_show_data++);
            //state.which_button[0] = selection; 

            /*if(state.select_plan === "free") {

                state.back_data.splice(2, 1, state.back_data[2]++);

            }*/

            if(state.select_plan === "free") {

                show_data.splice(0, 1, show_data[0]+=1);//表示されている数字にプラス１する
                return;

            }

            state.show_select = selection[1];//freeプラン以外のときはselect_dataをtrueにする
                
            
            
            //Vue.set(state., 2, state.back_data[2]++); 
        } else if(selection[0] === "down"){//数を減らす

            //state.which_button[0] = selection;

            if(state.select_plan === "free") {

                show_data.splice(0, 1, show_data[0]-=1);//表示されている数字にマイナス１する
            }

            
 

        } else {//初期化

            //state.back_data.splice(2, 1, state.first_data);
            state.which_button[0] = selection[0];
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

        
        let which_array = state.back_data;//freeのときに入れる配列

        

        for(let i=0; i < into_array; i++) {
           
            //Vue.set(state.back_data, i, row[i]);
            

            which_array.splice(i, 1, row[i]);//back_dataかback_select_dataに文字や画像を入れる(!!基本となるデータ)


        }


        const show_data = state.show_data;
        show_data[0] = row[2];//現在値を入れる


        if(state.select_plan === "free") {//freeのときの文字や画像を入れる
      
            show_data[1] = row[3];
            return;

        } 
        
        show_data[1] = state.back_select_data[0];//free以外のときの1番最初の文字や画像を入れる

    },

    chooseData(state, content) {

        state.show_data.splice(0, 1, state.show_data[0]+=1);//数を＋1する
        state.show_data.splice(state.show_data.length, 0, content[0]);//選択したデータを入れる
        state.show_select = content[1];//選択画面を閉じる
        
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

    planSelect_arrayDelete(state, content) {//データを削除
        state.select_plan = content;

        const back = state.back_data;
        const select = state.back_select_data;
        const show_data = state.show_data;

        back.splice(0, back.length);
        select.splice(0, select.length);
        show_data.splice(0, show_data.length);
        
    },


    inSelectData(state, content) {

        state.back_select_data = content;

    }


};


export const getters = {

    showData(state) {//freeプランのときのみ
        return state.show_data[0];
    },
    showSelect(state) {//選択肢の表示
        return state.show_select;
    },
    whichButtonData(state) {
        return state.which_button;
    },
    backTargetData(state) {
        return state.back_data[1];
    },
    showWordImg(state) {//free
        return state.show_data[1];
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

    chooseData(context, data) {

        context.commit("chooseData", data);

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