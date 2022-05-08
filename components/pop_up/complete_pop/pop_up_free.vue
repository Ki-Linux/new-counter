<template>
    <div id="pop_up_free">
        <div class="title_desc">
                <h1>完成しました!!</h1>
                <div class="canDesc">
                    <ul>
                        <li>ログインで</li>
                        <li>自分専用のアルバムに記録</li>    
                        <li>記録をシェア</li>
                        <li>みんなの投稿を見る</li>
                        <li>ができます!</li>
                    </ul>
                </div>
            </div>
            <ul class="merit">
                <p>このサイトで<span>シェア</span>すると</p>
                <li>いいね、コメントなど機能を選択したうえで投稿できる!!</li>
                <!--<li>機能を制限しても「制限しています」のような表示がないので、Twitter、Instagramよりも制限しやすい!!</li>-->
                <li>周りを気にしない気軽な投稿をしたい!!</li>
                <ul>
                    <li>Twitter、Instagramのコミュニティでは投稿しにくいな...</li>
                    <li>Twitter、Instagramでこんな投稿しちゃっていいのかな...</li>
                    <li>誰からもいいねされなかったら嫌だな...</li>
                </ul>
                <li>そんな方には、記録の共有に特化したここでのシェアがおすすめ!!</li>
            </ul>
            <div class="selector">
                <button @click="toLogin">ログインする</button>
                <label class="twitter" @click="twitterGo">
                    <p><img src="../../../static/twitter/twitter_logo.png" alt="twitter"></p>
                    Twitterでシェア
                </label>
                <nuxt-link class="back_home" to="/">ログインしないでホームに戻る</nuxt-link>
            </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class popUpFree extends Vue {

    toLogin() {
        this.$router.push('/addInfo/login/toNextEdit');
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
.title_desc {
        text-align: center;

        h1 {
            font-size: 40px;
        }

        .canDesc {
            margin-right: 30px;

            ul {
                font-size: 25px;
                li {
                    &:first-of-type {
                        padding-bottom: 10px;
                    }

                    &:nth-of-type(2) { 
                        
                        color: rgba(4, 119, 0, 0.9);
                    }

                    &:nth-of-type(3) {
                        color: rgba(150, 177, 0, 0.9);
                    }

                    &:nth-of-type(4) {
                        color: rgba(2, 0, 95, 0.9);
                    }

                    &:last-of-type {
                        padding-top: 10px;
                    }
                }
            }

        }

    }

    .merit {
         color: rgb(49, 49, 49);
         

        p {
            font-size: 30px;
            text-align: center;
            margin-right: 30px;

            span {
                color: rgba(150, 177, 0, 0.9);
            }
           
        }

        li{
            padding: 5px 0;
            font-size: 20px;
            margin-left: 100px;
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