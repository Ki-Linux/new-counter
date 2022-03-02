<template>
    <div id="confirmation">
        <form @submit.prevent="Confirm">
            <input type="mail" v-model="mail_confirm">
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
            
        });
    }

}
</script>
