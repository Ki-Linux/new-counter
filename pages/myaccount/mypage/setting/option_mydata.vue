<template>
    <div id="option_my_data">
        <div class="password_show" v-if="!contents_show">
            <p>自分のアカウントのパスワードを入力してください</p>
            <form @submit.prevent="checkPassword">
                <input type="password" v-model="password_data">
                <input type="submit">
            </form>
            <p v-if="not_success">パスワードが違います。</p>
        </div>
        <div class="contents">
            <div class="account_info">
                <ul v-for="account in accounts" :key="account.title">
                    <li>{{ account.title }}</li>
                    <li>{{ account.info }}</li>
                </ul>
            </div>
        </div>
        <div class="contents_list" v-if="contents_show">
            <h1>設定</h1>
            <div class="all_option">
                <ul v-for="option_content in option_contents" :key="option_content">
                    <li>{{ option_content }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class optionMyData extends Vue {
    option_contents: string[] = ['アカウント情報', 'パスワード変更', 'リマインダー設定', 'ログアウト'];
    accounts: { title: string, info: string}[]
     = [{ title: '登録メールアドレス', info: ''},{ title: 'ユーザー名', info: ''}];
    contents_show: boolean = false;
    password_data: string = "";
    not_success: boolean = false;

    checkPassword() {

        const name = this.$store.state.username;

        this.$axios.post('check_password', {
            username: name,
            password: this.password_data,
        })
        .then((response) => {
            //console.log(response.data);
            const res = response.data;
            
            if(res === 1) {//パスワード照会成功
                console.log("success");
                this.contents_show = true;
            } else {//パスワード照会失敗
                console.log("not_success");
                this.not_success = true;
            }
        })

    }


}
</script>
<style lang="scss">
#option_my_data {

    .password_show {
        font-size: 20px;
        position: absolute;
        padding-top: 150px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;

        form {
            margin-top: 20px;

            input {
                padding: 5px;

                &[type="password"] {
                    width: 250px;
                }
            }
            

            input {
                padding: 5px;
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
