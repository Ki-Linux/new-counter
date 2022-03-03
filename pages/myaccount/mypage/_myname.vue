<template>
    <div id="myname">
        <div class="right_position">
            <div class="alerm"><span>11</span><img src="../../../static/mypage/bell2.png" alt="alerm"></div>
            <button>みんなの投稿</button>
        </div>
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

@Component({
    components: {
        'profile_name': profileName,
    }
})
export default class myname extends Vue {

}
</script>
<style lang="scss">
li {
    list-style: none;
}
.right_position {
    float: right;
    
    .alerm {
        position: relative;
        float: right;
        span {
            position: absolute;
            color: white;
            background-color: red;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
           // padding: 10px;
        }
        
    }

}


.up_down_button {
        //float: left;
    text-align: center;
    
}
    
    
</style>