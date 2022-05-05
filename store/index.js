import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export const state = () => ({
    back_data: [],//["", 目標値, 現在値, "", "imgorword"],
    back_select_data: [],
    show_data: [],//[現在表示されている文字や画像の数, 文字や画像(freeは同じものが繰り返されるから１つだけ)の代数]
    show_select: false,//選択を表示するかどうか
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


            if(state.select_plan === "free" || state.back_data[4] === "nothing") {//いずれの選択でもなしはここで終了

                show_data.splice(0, 1, show_data[0]+=1);//表示されている数字にプラス１する
                return;

            }

            state.show_select = selection[1];//freeプラン以外のときはselect_dataをtrueにする
                
            
            
            //Vue.set(state., 2, state.back_data[2]++); 
        } else if(selection[0] === "down"){//数を減らす

            if(show_data[0] !== 0) {//マイナス値に行かないようにする

                show_data.splice(0, 1, show_data[0]-=1);//表示されている数字にマイナス１する

               
            
                if(state.select_plan !== "free" && state.back_data[4] !== "nothing") {//show_dataから一番最後のデータを削除する　いずれの選択でもなしはここで終了
                    show_data.splice(show_data.length - 1, 1);
                }

            }

            //if(state.select_plan === "free") {

                

            
 

        } else {//初期化

            const delete_length = state.back_data[2];

            show_data.splice(0, 1, delete_length);//数字を初期化

           /* if(state.select_plan === "free") {//freeプラン

                show_data.splice(0, 1, );
            }*/

            if(state.select_plan !== "free" && state.back_data[4] !== "nothing") {//freeプランかつなし以外

                show_data.splice(1, show_data.length - 1);//一回、画像データをすべて削除する

                const select_data = state.back_select_data;//登録したデータすべて1種類ずつ

    //free以外のときに文字や画像を入れる(入れる個数)
    let time = 0;


        while(time <= show_data[0]) {//回数
            for(let i=1; i <= select_data.length; i++) {//具体的な入れるもの　select_dataからデータを取ってくる

                show_data.splice(i, 0, select_data[i - 1]);
                time++;

                if(time === show_data[0]) {//回数に達したら強制終了
                    return;
                }
   
            }
        }

                /*let time = 0;


                while(time <= state.back_data[2]) {//回数
                    for(let i=1; i <= state.back_select_data.length; i++) {//具体的な入れるもの　select_dataからデータを取ってくる        

                        show_data.splice(i, 0, state.back_select_data[i - 1]);
                        time++;

                        if(time === show_data[0]) {//回数に達したら強制終了
                            return;
                        }

                                
                    }
                    
                }*/

                //show_data.splice()//show_dataを初期化
            }    
            
            
        }


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

        const select_data = state.back_select_data;//登録したデータすべて1種類ずつ

    //free以外のときに文字や画像を入れる(入れる個数)
    if(show_data[0] === 0) {//0だったらデータを何も入れない

        return;

    }
    
    let time = 0;


        while(time <= show_data[0]) {//回数
            for(let i=1; i <= select_data.length; i++) {//具体的な入れるもの　select_dataからデータを取ってくる

                show_data.splice(i, 0, select_data[i - 1]);
                time++;

                if(time === show_data[0]) {//回数に達したら強制終了
                    return;
                }
   
            }
        }
                //}
        
        
        

    },

    chooseData(state, content) {

        state.show_data.splice(0, 1, state.show_data[0]+=1);//数を＋1する

        //const alter_num = state.back_select_data.indexOf(content[0]);//文字列ではなく代わりに数字を入れる

        state.show_data.splice(state.show_data.length, 0, content[0]);//選択したデータを入れる(数字のデータは1から始めるので+1する)
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

    },


};


export const getters = {

    showData(state) {//freeプランのときのみ
        return state.show_data[0];
    },
    showSelect(state) {//選択肢の表示
        return state.show_select;
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

    },


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