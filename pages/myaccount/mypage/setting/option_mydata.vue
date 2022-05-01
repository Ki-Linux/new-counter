<template>
    <div id="option_my_data">
        <div class="password_show" v-if="!contents_show">
            <p>自分のアカウントのパスワードを入力してください</p>
            <form @submit.prevent="CheckChangePassword('check')">
                <input type="password" v-model="password_data">
                <input type="submit">
            </form>
            <p v-if="not_success">パスワードが違います。</p>
        </div>
        <div class="contents">
            <div class="account_info" v-if="show_info[0]">
                <ul v-for="account in accounts" :key="account.title">
                    <li>{{ account.title }}</li>
                    <li>{{ account.info }}</li>
                </ul>
            </div>
            <div class="new_password" v-else-if="show_info[1]">
            <form @submit.prevent="CheckChangePassword('change')"  v-if="!success_change_password">
                <p>パスワード変更(7 ~ 14文字)</p>
                <input type="text" v-model="new_password" name="password" minlength="7" maxlength="14" required>
                <p>もう一度パスワードを入力(7 ~ 14文字)</p>
                <input type="password" v-model="confirm_password" name="password_again" minlength="7" maxlength="14" required>
                <input type="submit">
                <p v-if="inconsistency">パスワードが一致しません</p>
            </form>
            <p v-else>パスワードを変更いたしました。</p>
            </div>
        </div>
        <div class="contents_list" v-if="contents_show">
            <h1>設定</h1>
            <div class="all_option">
                <ul v-for="(option_content, index) in option_contents" :key="index">
                    <li @click="showContent(index)">{{ option_content }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AxiosRequestConfig } from 'axios';

@Component
export default class optionMyData extends Vue {
    option_contents: string[] = ['アカウント情報', 'パスワード変更', 'リマインダー設定', 'ログアウト'];
    accounts: { title: string, info: string}[]
     = [{ title: '登録メールアドレス', info: ''},{ title: 'ユーザー名', info: ''}];
    show_info: boolean[] = [false, false, false, false]; 
    contents_show: boolean = true;
    password_data: string = "";
    new_password: string = "";
    confirm_password: string = "";
    not_success: boolean = false;
    inconsistency: boolean = false;
    success_change_password: boolean = false;
    

    CheckChangePassword(which: string) {

        const name = this.$store.state.username;

        let set_data = {
            username: name,
            password: this.password_data,
        }
        

        let method_url: AxiosRequestConfig = { //編集
            method: 'post',
            url: 'check_change_password',
            params: set_data
        }

        if(which==="change") {

            if(this.new_password !== this.confirm_password) {

                this.inconsistency = true;
                return;

            }

            set_data = {
                username: name,
                password: this.new_password,
            }

            method_url = { //編集
                method: 'put',
                url: 'check_change_password/1',
                params: set_data
            }

        }
            

        this.$axios(method_url)
        .then((response) => {

            //console.log(response.data);
            const res = response.data;
            
            if(which === "click") {

                if(res === 1) {//パスワード照会成功
                    console.log("success");
                    this.contents_show = true;
                } else {//パスワード照会失敗
                    console.log("not_success");
                    this.not_success = true;
                }

            } else {
                
                const res_success = res.change_password_success;
                console.log(res_success);
                if(res_success) {//パスワード変更成功

                    this.success_change_password = true;
                    
                } else {//パスワード変更失敗

                    this.inconsistency = true;

                }
            }
            
            
        });


    }

    showContent(show_num: number) {

        const reset_data = () => {

            this.inconsistency = false;
            this.new_password = "";
            this.confirm_password = "";

        }

        const name = this.$store.state.username;

        this.success_change_password = false;
        
        reset_data();//データリセット

        this.show_info.splice(0, 4, false);//クリックしたコンテンツの初期化

        this.show_info.splice(show_num, 1, true);//クリックしたコンテンツの表示
        console.log(show_num)

        const set_data = {
            username: name,
            clicked_num: show_num,
        }
        

        const method_url: AxiosRequestConfig = { //編集
            method: 'get',
            url: 'get_information',
            params: set_data
        }
            

        this.$axios(method_url)
        .then((response) => {

            if(show_num === 0) {
                
                console.log(response.data.get_contents);

                const address = response.data.get_contents;

                this.accounts.splice(0, 2, { title: '登録メールアドレス', info: address},{ title: 'ユーザー名', info: name});
                

            }
            
        })

    }


}
</script>
<style lang="scss">
#option_my_data {

    .password_show {

        position: absolute;
        padding-top: 150px;
        left: 50%;
        transform: translateX(-50%);

    }

    .password_show, .new_password {
        font-size: 20px;
        padding-top: 40px;
        text-align: center;

        form {
            margin-top: 20px;
            

            input {
                padding: 5px;
                display: block;
                margin: 10px 0 30px 50px;

                &[type="submit"] {
                    margin-left: 140px;
                }

                
            }
            

            
        }
    }

    
    .contents {
        position: absolute;
        left: 300px;
        .account_info {
            text-align: center;

            ul {
                font-size: 25px;
            }
        }
    }

    .contents_list {

         padding-top: 40px;
         background-color: rgba(255, 225, 205, 0.6);
         width: 250px;
         height: 100vh;

        h1 {
            margin-left: 40px;
        }

        .all_option {
            ul {
                
                font-size: 20px;

                li {
                    margin-top: 30px;
                }   
            }
        }

    }

    ul {
        list-style: none;
    }

   
}
</style>
