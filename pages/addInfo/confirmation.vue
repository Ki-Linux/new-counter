<template>
    <div id="confirmation">
        <form @submit.prevent="Confirm">
            <input type="text" v-model="pass_confirm">
            <input type="submit" >
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class confirmation extends Vue {
    pass_confirm: string = "";

    Confirm() {

        this.$axios.post("/api/mail", {

            pass_confirm: this.pass_confirm,

        })
        .then(function(response) {
            console.log(response);
        })
    }

}
</script>
