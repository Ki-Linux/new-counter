<template>
    <div id="login">
        <p v-if="this.$route.params.id === '1'">ご確認メールを送信しました。</p>
        <form @submit.prevent="doLogin">
            <input type="email" v-model="email">
            <input type="password" v-model="password">
            <p>{{ no_content }}</p>
            <input type="submit">
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
    

    doLogin() {
        console.log("doLogin!");

        //fdsavd@gmail.com
        //sdfsd
        this.$axios.post("login", {
            mail: this.email,
            password: this.password,
        })
        .then((response) => {
            console.log(response);
            //console.log(response);
            if(response.data.token === 'nothing') {

                this.no_content="メールアドレスまたはパスワードが違います。";

            } else {

                this.$store.dispatch("loginToken", response.data.token);
                this.$cookies.set('key', response.data.token);

            }
            
           // console.log(req.headers.cookie)
        });

        /*try {
            const response = await ('/api/login', {
                    mail: this.email,
                    password: this.password,
            })
        }
        catch (e) {
            console.log(e);
        }*/
       
            

    }


}
</script>
<style scoped>

</style>