<template>
    <div id="new_account">
        <div class="title">
            <h1>新規登録</h1>
        </div>
        <form class="write_in" @submit.prevent="toNext">
            <div class="label_height">
                <label for="mail">メールアドレス</label>
                <p><input type="email" v-model="mail" name="mail" required></p>   
            </div>
            <div class="label_height">
                <label for="name">ユーザーネーム</label>
                 <p><input type="text" v-model="username" name="username" maxlength="15" required></p> 
            </div>
            <div class="label_height">
                <label for="password">パスワード<br/><span>7~14文字</span></label>
                 <p><input type="password" v-model="password" name="password" minlength="7" maxlength="14" required></p> 
            </div>
            <div class="label_height">
                <label for="password_again">もう一度パスワード<br/><span>7~14文字</span></label>
                 <p><input type="password" v-model="password_again" name="password_again" minlength="7" maxlength="14" required></p> 
            </div>
            <div class="label_height">
                <p>{{ warning }}</p>
                <input type="submit">
            </div>
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import $cookies from 'cookie-universal-nuxt';

@Component
export default class newAccount extends Vue {
    mail:string = "";
    username: string = "";
    password: string = "";
    password_again: string = "";
    warning: string = "";
    //loginId: number = 1;

    toNext():void {

        const can_save_data = () => {

        this.$axios.post("saving", {
            mail: this.mail,
            username: this. username,
            password: this.password,
        })
        .then((response) => {
            
            const next_go: string = response.data.next_go;

            if(next_go === "not_one") {

                this.warning = "このメールアドレスはすでにあります。";

            } else if(next_go === "not_two"){

                this.warning = "このユーザーネームはすでにあります。";

            } else {

                this.$router.push('/addInfo/login/1');

            }
        })
       }

       if(this.password === this.password_again) {
           can_save_data();
       } else {
           this.warning = "パスワードが一致していません。";
       }

       
    }

    /*logout(): void {
        this.$cookies.remove('key');
        //(this as any).$auth.loginWith();
    }*/

}
</script>
<style lang="scss">
#new_account {
    margin-top: 30px;
    font-size: 30px;

    //.write_in p {
        text-align: center;

        .title {
            margin-top: 30px;
        }
    //}
    .label_height {

        margin: 30px;
        
        p input {
            width: 30vw;
            padding: 5px;
        }

        input[type="submit"] {

            color: rgb(36, 36, 36);
            background-color: rgba(204, 204, 204, 0.6);
            margin-bottom: 20px;

        }
    }

}

</style>