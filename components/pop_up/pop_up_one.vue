<template>
    <div id="pop_up_one" v-if="!$store.state.canClick">
        <div class="label_close">
            <div class="title_desc">
                <h1>完成しました!!</h1>
                <p>ログインで完成した記録を</p>
                <div class="canDesc">
                    <p>
                        <span>専用のアルバムに保存</span>    
                        <br><span>手頃なシェア</span>
                        <br>することができます!
                    </p>
                </div>
                <p>このサイトでシェアすると</p>
            </div>
            <ul class="merit">
                <li>いいね、コメントなど様々な機能を選択したうえで投稿できる!!</li>
                <li>機能を制限しても「制限しています」のような表示がないので、Twitter、Instagramよりも制限しやすい!!</li>
                <li>周りを気にしない気軽な投稿をしたい!!</li>
                <ul>
                    <li>Twitter、Instagramでは投稿しにくいな</li>
                    <li>Twitter、Instagramでこんな投稿しちゃっていいのかな</li>
                    <li>誰からもいいねされなかったらどうしよう</li>
                </ul>
                <li>そんな方には、周りを気にしなくていいこのサイトでのシェアがおすすめ!!</li>
            </ul>
            <div class="selector">
                <button @click="toLogin">ログインする</button>
                <label class="twitter" @click="twitterGo">
                    <p><img src="../../static/twitter/twitter_logo.png" alt="twitter"></p>
                    Twitterでシェア
                </label>
                <nuxt-link class="back_home" to="/">ログインしないでホームに戻る</nuxt-link>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class popUp extends Vue {

    toLogin() {
        this.$router.push('/addInfo/login/thisLogin');
    }



    twitterGo() {

        let twitterURL = 'https://twitter.com/intent/tweet';
        twitterURL += '?text=' + '';
        twitterURL += '&url=' + encodeURIComponent(window.location.origin);

        
        window.open(twitterURL);
    }
}
</script>
<style lang="scss">
#pop_up_one {
 width: 100%;
 
}
.label_close {
    position: fixed;
    background-color: rgb(255, 195, 223);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;

    

    .title_desc {
        text-align: center;

        h1 {
            font-size: 50px;
        }

        .canDesc {
            padding: 25px 0;

            span:first-of-type {
                text-decoration: underline;
                text-decoration-color: rgba(122, 255, 60, 0.9);
            }

            span:nth-of-type(2) {
                text-decoration: underline;
                text-decoration-color: rgba(226, 255, 60, 0.9);
            }
        }

        p {
            font-size: 30px;
        }
    }

    .merit li{

        padding: 5px 0;
        font-size: 20px;
        
    }

}

.selector {
    text-align: center;
    cursor: default;

    .back_home {
        display: block;
        color: black;
    }

    .twitter {
        display: block;
        background-color: red;
        margin: 20px 17vw;
        color: rgb(0, 110, 255);
        

        p img {
            width: 35px;
            margin: 0 auto;
            background-color: rgba(0, 217, 255, 0.8);
            padding: 7px;
        }
    } 

    button {
        font-size: 30px;
        color: rgb(29, 29, 29);
        background-color:rgba(106, 208, 255, 0.3);

        &:hover {
            background-color:rgba(106, 208, 255, 0.6);
        }
    }
}
</style>