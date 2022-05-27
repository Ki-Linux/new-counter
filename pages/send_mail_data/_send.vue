<template>
    <div id="send">
        <p v-if="this.$route.params.send === 'one'">
            メールを送信しました。ご確認ください。
        </p>
        <button @click="back">戻る</button>
    </div>
</template>
<script lang="ts">
import { Vue,Component } from 'vue-property-decorator';

@Component
export default class send extends Vue {

    back() {
       
       this.$router.push('/addInfo/login');

    }

}
</script>
<style lang="scss">
#send {
    text-align: center;
    font-size: 20px;
    padding-top: 40px;

    button {
        margin-top: 20px;
    }
}
</style>