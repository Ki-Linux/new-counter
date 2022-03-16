<template>
    <div id="orner" v-if="show_content">
        <form @submit.prevent="goReminder">
            <input type="text" placeholder="誰宛てか(全体は*を使う)" v-model="username">
            <input type="text" placeholder="タイトル" v-model="title">
            <textarea placeholder="内容の記入" id="" cols="30" rows="10" v-model="content"></textarea>
            <input type="submit">
        </form>
        <input type="password" v-model="pass" placeholder="passwordの記入">
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class orner extends Vue {
    show_content: boolean = false;
    title: string = "";
    content: string = "";
    username: string = "";
    pass: string = "";

    mounted() {
        if(this.$route.params.orner === process.env.pass_one) {
            this.show_content = true;
        }
    }

    goReminder() {

        if(this.pass === process.env.pass_two && confirm('送信しますか?')) {
            console.log(this.username)

            this.$axios.post("reminder_send", {
                title: this.title,
                content: this.content,
                username: this.username,
                //contentPost: this.content, 
            })
            .then((response) => {
                console.log(response.data.resTitle);
                console.log(response.data.resContent);
                console.log(response.data.resName);

            })
            .catch((error) => {
                console.log(error);
            })

        } else {
            console.log('not sending');
        }
        
        
    }
}
</script>
