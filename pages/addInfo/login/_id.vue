<template>
    <div id="login">
            <p class="canSend" v-if="$route.params.id === '1'">
                ご確認メールを送信しました。
            </p>
        <div class="title">
            <h1>ログイン</h1>
        </div>
        <form @submit.prevent="doLogin">
            <div class="name_space">
                <label for="mail">メールアドレス</label>
                <p><input type="mail" v-model="email" name="mail" required></p>   
            </div>
            <div class="name_space">
                <label for="password">パスワード</label>
                <p><input type="password" v-model="password" name="password" required></p> 
                <nuxt-link class="forget_password" to="/addInfo/confirmation">
                    パスワードを忘れたとき
                </nuxt-link>
            </div>
            <p>{{ no_content }}</p>
            <input type="submit">
            <div class="toNew">
                <nuxt-link class="new_add" to="/addInfo/new_account">新しくアカウントを作る</nuxt-link>
            </div> 
        </form>  
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import $cookies from 'cookie-universal-nuxt';

@Component
export default class login extends Vue {

    email:string =  "";
    password:string = "";
    no_content: string = "";

    head() {
        return {
            title: 'ログイン',
            meta: [
                { hid: 'description', name: 'description', content: 'プラマイカウンターのログインフォームになります。' }
            ]
        }
    }

    doLogin() {

        console.log("doLogin!");

        this.$axios.post("login", {
            mail: this.email,
            password: this.password,
        })
        .then((response) => {
            console.log(response);

            const res = response.data;

            console.log(res);

            const divided_data = res.divided_data;
            const username = res.username;

            if(divided_data === 'nothing') {

                this.no_content="メールアドレスまたはパスワードが違います。";

            } else {

                let expire = new Date();

                expire.setTime(expire.getTime() + (24 * 60 * 60 * 1000));

                this.$cookies.set('key', divided_data + '; expires' + expire.toUTCString());
                const set_cookie_data = divided_data + '; expires' + expire.toUTCString();

                this.$store.dispatch("loginTokenName", [set_cookie_data, username]);
                
                if(this.$store.state.username !== "") {

                    let param_url: string = '/myaccount/mypage/' + username;

                    if(this.$route.params.id === "1" && this.$store.state.back_data.length > 0) {

                        param_url = '/myaccount/mypage/edit/new_post';

                    }

                    this.$router.push(param_url);

                }

            }
            

        })
        .catch((err) => {
            console.log(err);
        }); 

    }

}
</script>
<style lang="scss">
#login {

    text-align: center;
    padding-top: 30px;
    font-size: 30px;

    .canSend {
        float: left;
        font-size: 15px;
        padding-left: 10px;
        animation: name 1s ease 1s 3 normal;
    }

    @keyframes name {

        from {
            color: black;
        }
        to {
            color: rgb(0, 51, 192);
        }

    }

    .title h1 {
        padding-top: 30px;
    }

    .name_space {

        margin: 30px 0;

        p input {

            padding: 6px;
            width: 300px;

        }

        .forget_password {

            font-size: 15px;

        }

    }

    input[type="submit"] {

        -webkit-appearance: none;
        color: rgb(36, 36, 36);
        background-color: rgba(204, 204, 204, 0.6);

    }

    .toNew {

        font-size: 15px;
        padding: 20px;
        
        .new_add {
            
            color: blue;

        }
        
    }

}
</style>