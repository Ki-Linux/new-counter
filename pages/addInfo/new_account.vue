<template>
    <div id="new_account">
        <div class="title">
            <h1>新規登録</h1>
        </div>
        <form class="write_in" @submit.prevent="toNext">
            <div>
                <label for="mail">メールアドレス</label>
                <input type="email" v-model="mail" name="mail" required>
            </div>
            <div>
                <label for="name">ユーザーネーム</label>
                <input type="text" v-model="username" name="username" maxlength="15" required>
            </div>
            <div>
                <label for="password">パスワード<br/><span>7~14文字</span></label>
                <input type="password" v-model="password" name="password" minlength="7" maxlength="14" required>
            </div>
            <div>
                <label for="password_again">もう一度パスワード<br/><span>7~14文字</span></label>
                <input type="password" v-model="password_again" name="password_again" minlength="7" maxlength="14" required>
            </div>
            <input type="submit">
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class newAccount extends Vue {
    mail:string = "seima0616@gmail.com";
    username: string = "ddddddddd";
    password: string = "ddddddddddddd";
    password_again: string = "dddddddddddddd";

    toNext():void {

       //console.log("toNext");
       this.$axios.post('/logins', {
           mail: this.mail,
           username: this.username,
           password: this.password
       })
       
    }
}
</script>
<style lang="scss">
#new_account {
    margin-top: 30px;
    font-size: 30px;
    text-align: center;
}

</style>