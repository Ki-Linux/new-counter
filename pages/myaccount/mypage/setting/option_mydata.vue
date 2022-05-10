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
            <div class="reminder_option"  v-else-if="show_info[2]">
                <p>いいねやコメントのリマインダー(お知らせ)を許可しますか?</p>
                <div v-for="(good_or_comment, index) in good_or_comments" :key="good_or_comment">
                    <p>{{ good_or_comment }}</p>
                    <label>
                        <input type="radio" :name="index" value="はい" @click="checkReminder(index, 1)" :checked="required_num[index] === 1">はい
                    </label>
                    <label>
                        <input type="radio" :name="index" value="いいえ" @click="checkReminder(index, 0)" :checked="required_num[index] === 0">いいえ
                    </label> 
                </div>
            </div>
            <div class="logout"  v-else-if="show_info[3]">
                <h1>ログアウトしますか?</h1>
                <button @click="logout">はい</button>
            </div>
        </div>
        <div class="contents_list" v-if="contents_show">
            <h1>設定</h1>
            <div class="all_option">
                <ul v-for="(option_content, index) in option_contents" :key="index">
                    <li @click="showContent(index)">{{ option_content }}</li>
                </ul>
            </div>
            <div class="back_button">
                <back_button where_go="account"/>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AxiosRequestConfig } from 'axios';
import backButton from '../../../../components/back_button/back.vue';
import { confirm } from '@/components/confirmation/confirm_person';

@Component({
    middleware: 'reject',
    components: {
        'back_button': backButton,
    }
})
export default class optionMyData extends Vue {
    user_id_name: [number, string] = [0, ''];//ユーザーid, name
    good_or_comments: string[] = ['いいね', 'コメント'];//いいね、コメント
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
    now_num: number = 4;//現在の番号
    required_num: number[] = [2, 2];//リマインダーするかしないか(defaultはする)

    beforeMount() {
        
        console.log('go mount')
        this.user_id_name[1] = this.$store.state.username;
        confirm(this.user_id_name[1]);

        //fetchUid(document.cookie, username);
        
    }

    mounted() {
        

        this.$axios.get('get_id', {
            params: {
                username: this.user_id_name[1],
            }
        })
        .then((response) => {
            console.log(response.data)
            this.user_id_name[0] = response.data;
        })

    }
    

    CheckChangePassword(which: string) {

        let set_data = {
            username: this.user_id_name[1],
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
                username: this.user_id_name[1],
                password: this.new_password,
            }

            method_url = { //編集
                method: 'put',
                url: 'check_change_password/' + this.user_id_name[0],
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

    checkReminder(index_num: number, yes_or_no: number) {

        if(this.required_num[index_num] === yes_or_no) {//同じだったら送信しない

            return;
        }


        this.$axios.put('post_reminder_update/' + this.user_id_name[0], {
            username: this.user_id_name[1],
            yes_no: yes_or_no,
            good_or_comment: index_num,
        })
        .then((response) => {
            
            const reminder = response.data.update_reminder;

            console.log(reminder)
            if(reminder) {

                if(this.required_num[index_num] === 0) {

                    this.required_num[index_num] = 1;

                } else if(this.required_num[index_num] === 1) {

                    this.required_num[index_num] = 0;

                }

            }
        })

    }

    showContent(show_num: number) {

        if(this.now_num === show_num) {
            return;
        }

        const reset_data = () => {

            this.inconsistency = false;
            this.new_password = "";
            this.confirm_password = "";
            this.show_info.splice(this.now_num, 1, false); //クリックしたコンテンツの初期化

        }

        this.success_change_password = false;
        
        reset_data();//データリセット

        this.now_num = show_num;//現在クリックしている値を入れる

        this.show_info.splice(this.now_num, 1, true);//クリックしたコンテンツの表示
        console.log(this.show_info)

        const api_data = (num: number) => {

            const set_data = {
                username: this.user_id_name[1],
                clicked_num: num,
            }
        

            const method_url: AxiosRequestConfig = { //編集
                method: 'get',
                url: 'get_information',
                params: set_data
            }
            

            this.$axios(method_url)
            .then((response) => {

                console.log(response.data.get_contents);

                const address_or_post_reminder = response.data.get_contents;

                if(num === 0) {

                    this.accounts.splice(0, 2, { title: '登録メールアドレス', info: address_or_post_reminder},{ title: 'ユーザー名', info: this.user_id_name[1]});
                
                } else if(num === 2) {

                    for(let i=0; i < 2; i++) {
                        this.required_num.splice(i, 1, address_or_post_reminder[i].can_report)
                    }
                
                   // this.required_num[0] = 1//address_or_post_reminder[0].can_report;
                   // this.required_num[1] = 1//address_or_post_reminder[1].can_report;
                    console.log(address_or_post_reminder[1].can_report)

                }
            
            })

        }

        

        if(this.now_num === 0 || this.now_num === 2) {
            api_data(this.now_num);//api実行
        }

    }

    logout() {

        console.log(this.user_id_name[0])

        this.$axios.delete('logout/' + this.user_id_name[0])
        .then((response) => {
            console.log(response.data)
            const red_data = response.data.logout;

            if(red_data) {
                console.log('success');
                this.$router.push('/');
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

    .reminder_option {
        font-size: 20px;
        padding-top: 40px;
        text-align: center;

    }

    .logout {
        text-align: center;
        padding-top: 40px;
        button {
            font-size: 20px;
            margin-top: 20px;
            background-color: white;
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

        .back_button {
            margin-left: 40px;
            button {
                font-size: 15px;
            }
        }

    }

    ul {
        list-style: none;
    }

   
}
</style>
