<template>
    <div id="confirmation">
        <form @submit.prevent="Confirm">
            <label for="mail">メールアドレスを入力してください。</label>
            <p>
                <input type="mail" v-model="mail_confirm" name="mail" required>
            </p>
            <p>{{ warning }}</p>
            <input type="submit">
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class confirmation extends Vue {
    mail_confirm: string = "";
    warning: string = "";

    head() {
        return {
            title: 'パスワードを忘れてしまったとき'
        }
    }

    Confirm() {

        this.$axios.post("mail", {
            mail: this.mail_confirm
        })
        .then((response) => {
            
            if(response.data.result === true) {

                this.$router.push('/send_mail_data/one');

            } else {

                this.warning = "メールアドレスが違います。";

            };
            
        })
        .catch((err) => {
            console.log(err);
        });

    }

}
</script>
<style lang="scss">
#confirmation {

    text-align: center;
    padding-top: 30px;

    form {

        font-size: 20px;

        p input[type="mail"] {
            padding: 5px;
            width: 300px;
        }

        p:nth-of-type(2) {
            color: red;
            padding: 20px;
            font-size: 20px;
        }

    }

}
</style>