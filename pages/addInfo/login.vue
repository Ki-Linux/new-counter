<template>
    <div id="login">
        <form @submit.prevent="doLogin">
            <input type="email" v-model="email">
            <input type="password" v-model="password">
            <input type="submit">
        </form>
        <p>{{ $auth.loggedIn }}</p>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import $cookies from 'cookie-universal-nuxt';

@Component
export default class login extends Vue {
    email:string =  "";
    password:string = "";
    

    doLogin() {
        console.log("doLogin!");

        //fdsavd@gmail.com
        //sdfsd
        this.$axios.post("/api/login", {
            mail: this.email,
            password: this.password,
        })
        .then((response) => {
            console.log(response);
            //console.log(response);
            this.$store.dispatch("loginToken", response.data.token);
            this.$cookies.set('key', response.data.token);
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