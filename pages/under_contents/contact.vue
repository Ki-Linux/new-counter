<template>
    <div id="contact">
        <h1>お問い合わせ</h1>
        <form @submit.prevent="sendContactMail">
            <textarea name="contact" id="contact" cols="30" rows="5" v-model="content_address.content" placeholder="200文字まで" maxlength="200"></textarea>
            <p>メールアドレス</p>
            <input type="mail" v-model="content_address.address" placeholder="メールアドレス" maxlength="40">
            <p>{{ attention }}</p>
            <input type="submit">
        </form>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class contract extends Vue {
    content_address:{content: string, address: string} = {content: "", address: ""};
    attention: string = "";

    head() {
        return {
            title: 'お問い合わせ',
            meta: [
                { hid: 'description', name: 'description', content: 'プラマイカウンターお問い合わせフォーム。何かあればこちらからお問い合わせください。' }
            ]
        }
    }

    sendContactMail() {

        const content = this.content_address.content;
        const address = this.content_address.address;

        if(content === "") {//不足

            this.attention = "中身が入力されていません。";
            return;

        } else if(address === "") {//不足

            this.attention = "メールアドレスが入力されていません。";
            return;

        }

        this.$axios.post('sendContactMail', {

            content: content,
            address: address,

        })
        .then((response) => {

            const can_contact = response.data.can_contact;
            console.log(can_contact);

            if(can_contact) {
                this.$router.push('/under_contents/send_end');
            }
        })
        .catch((response) => {
            console.log(response);
            location.reload();
        })

    }
}
</script>
<style lang="scss">
#contact {

    font-size: 20px;
    text-align: center;
    padding-top: 30px;

    textarea {
        margin-top: 20px;
        padding: 5px;
        width: 300px;
        text-align: left;

    }

    input {
        
        &[type="mail"] {
       
            width: 300px;
            padding: 5px;
        }

        &[type="submit"] {
            -webkit-appearance: none;
            display: block;
            margin-top: 20px;
            margin-left: 50%;
            transform: translateX(-50%);
            font-size: 25px;
            padding: 3px 8px;
        }
    }

}

</style>