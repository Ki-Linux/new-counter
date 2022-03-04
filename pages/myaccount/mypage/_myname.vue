<template>
    <div id="myname">
        <reminder_name/>
        <profile_name/>
        <div class="up_down_button">
            <button>アップ</button>
            <button>ダウン</button>
            <ul>
                <li>アップ…目標値に向かってプラスのカウントを行う</li>
                <li>ダウン…現在値から0に向かってマイナスのカウントを行う</li>
            </ul>
        </div>
        <div class="option">
            <ul>
                <li><nuxt-link to="">プロフィール編集</nuxt-link></li>
                <li><nuxt-link to="">設定</nuxt-link></li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import profileName from '../../../components/mypage/profile.vue';
import reminderName from '../../../components/mypage/reminder.vue';

@Component({
    components: {
        'profile_name': profileName,
        'reminder_name': reminderName,
    }
})
export default class myname extends Vue {

}
</script>
<style lang="scss">
li {
    list-style: none;
}



.up_down_button {
        //float: left;
    text-align: center;
    
}
    
    
</style>