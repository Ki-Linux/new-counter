<template>
    <div id="confirmation">
        <form @submit.prevent="Confirm">
            <input type="mail" v-model="mail_confirm">
            <input type="submit">
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class confirmation extends Vue {
    mail_confirm: string = "";

    Confirm() {

        this.$axios.post("mail", {
            mail: this.mail_confirm
        })
        .then((response) => {
            console.log(response);
            
        });
    }

}
</script>
