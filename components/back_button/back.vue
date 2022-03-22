<template>
    <div id="back">
        <button @click="goBack">{{ word_button }}</button>
    </div>
</template>
<script lang="ts">
import { Vue,Component, Prop } from 'vue-property-decorator';

@Component
export default class backButton extends Vue {
    word_button: string = "←トップ画面に戻る"

    @Prop()
    public where_go!: string;

    created() {

        if(this.where_go === "account") { //ホーム画面に戻る

            this.word_button = "←戻る";

        }
        

    }

    goBack() {

        
        let send_url = '/';


        if(this.where_go === "account") {
            
            //アカウント画面に戻る
            const name = this.$store.state.username;
            send_url = '/myaccount/mypage/' + name;
            

        }

        this.$router.push(send_url);

    }
}
</script>
<style lang="scss">
#back {
    font-size: 30px;

    button {
        padding: 3px 10px;
        background-color: rgb(241, 241, 241);
    }

}

</style>
