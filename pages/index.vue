<template>
  <div id="home"> 
      <nav>
        <nuxt-link class="to_count" to="/counterDo/login_select">プラマイカウントを使う</nuxt-link>
        <img class="selector_img" @click="changeBox" :src="url_change" alt="open">
        <p>投稿はこちらから→</p>
      </nav>
      <header>
        <transition-group name="slide-fade">
            <div v-show="show_section" class="show_login" v-for="login in logins" v-bind:key="login">
              <nuxt-link class="link" :to="login.to_url">{{ login.showed_data }}</nuxt-link>
            </div> 
        </transition-group>
      </header>
      <main>
        <div class="top_container">
          <h1><span>プラ</span><span>マイ</span>カウンター</h1>
          <div class="description">
            <h2>プラマイカウンターとは</h2>
            <p>
              どんなときでもどんなものでも数える(カウント)したいときに楽しく使える魔法のようなカウンターなのだ。
            </p>
            <ul>
              <li>こんなときに使える</li>
              <li>何かを集めている</li>
              <li>残り何個か数えたい</li>
              <li>「数える」ことであればどんなものでもこのプラマイカウンターがおすすめ!!</li>
            </ul>
          </div>
        </div>
        <div class="center_container">
          <div class="title_change">
            <p>何かを集めたい(アップ)のとき</p>
            <p>残り何個かを数えたい(ダウン)のとき</p>
          </div>
          <div class="img_show">
            <p><img src="../static/Home/before_up.png" alt=""></p>
            <p><img src="../static/Home/before_down.png" alt=""></p>
          </div>
          <div class="title_change">
            <h2>ボタンをクリックすると</h2>
            <p>↓</p>
            <p>↓</p>
          </div>
          <div class="img_show">
            <p><img src="../static/Home/after_up.png" alt=""></p>
            <p><img src="../static/Home/after_down.png" alt=""></p>
          </div>
        </div>
        <div class="footer_container">
          <table>
            <caption>みんなの投稿一覧</caption>
            <tbody>
            <tr v-for="show_every_data in showEveryData" :key="show_every_data.picture">
              <th><img :src="show_every_data.picture" alt="picture"></th>
              <td>{{ show_every_data.my_comment }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </main>
      <footer>
        <ul>
          <li><nuxt-link class="next" to="">利用規約</nuxt-link></li>
          <li><nuxt-link class="next" to="">プライバシーポリシー</nuxt-link></li>
          <li><nuxt-link class="next" to="">お問い合わせ</nuxt-link></li>
        </ul>
      </footer>
    </div>
</template>
<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Home extends Vue{
  logins: { showed_data: string, to_url: string }[] = [ 
    { showed_data: "ログイン", to_url: "/addInfo/login/2" },
    { showed_data: "新規登録", to_url: "/addInfo/new_account" },
    { showed_data: "ログアウト", to_url: "/addInfo/logout" },
  ];
  url_change: string = require("../static/Home/selector_box.png");
  change_box: boolean = true;//urlの変更
  show_section: boolean = false; //ログイン欄の表示(true==表示,false==非表示)
  showEveryData: { picture: string; my_comment: string; }[]
                = [{
                  picture: "",
                  my_comment: ""
                }]
    
    created() {

     

      this.$axios.get('only_top')
      .then((response) => {
        console.log(response.data.topData);
        this.showEveryData = response.data.topData;
        

      })
      .catch((response) => {
        console.log(response);
      })
    }

    mounted() {
      //localStorageのデータを削除
      localStorage.clear();
    }
    
    changeBox() {//2つの画像の変更の繰り返し
      if(this.change_box == true) {
        //開くに変更
        this.url_change = require("../static/Home/close_selection.png"); 
        this.change_box = false;
        this.show_section = true;
      } else {
        //閉じるに変更
        this.url_change = require("../static/Home/selector_box.png"); 
        this.change_box = true;
        this.show_section = false;
      }
    }


  
}
</script>    
<style lang="scss">

  #home {/*最初の画面にでてくるところの全体*/
    padding-top: 0;
    background-color:rgba(255, 250, 240, 0.6);
  }

  nav {//トップ画面
   z-index: 10;
   width: 100%;
   height: 100px;
   background-color: rgba(0, 0, 0, 0.397);
   .to_count {
      display: inline-block;
      color: white;
      font-size: 25px;
      line-height: 100px;
      padding:0 25px 0;
      background-color: rgba(17, 63, 75, 0.281);
      text-decoration: none;
      &:hover {
        background-color: rgba(17, 63, 75, 0.76);
      }
    }
    p {
      color: white;
      padding-right: 10px;
      float: right;
      line-height: 100px;
    }
  
  .selector_img {
    width: 90px;
    float: right;
    padding: 15px 25px 0 0;
  }
  }
  
  //animation
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .4s ease;
    
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-5px);
    opacity: 0;
  } 
  header {
      position: fixed;
      right: 0;
    .show_login {
      background-color: rgba(6, 66, 77, 0.514);
      width: 200px;
      margin: 0 0 0 auto;
      
      .link {
            display: block;
            text-decoration: none;
            color: white;
            line-height: 95px;
            font-size: 25px;
            text-align: center;
            &:hover {
              background-color: rgba(121, 28, 28, 0.24);
            }
      }
    }
  }

  main {
    text-align: center;

    .top_container {

      //background: url("../static/Home/background_number3.jpg") no-repeat;
      //width: 100%;
      margin-top: 100px;

      h1 {
        font-size: 60px;
        color: rgba(48, 48, 48, 0.9);

        span:first-of-type {
          color: rgba(255, 41, 41, 0.8);
        }

        span:last-of-type {
          color: rgba(19, 19, 223, 0.7);
        }
      }

      .description {
        margin: 110px;
        border: 3px double #ddd;
        padding: 20px;

        h2 {
          font-size: 30px;

        }

        p {
          margin-top: 20px;
          font-size: 25px;
          color: rgba(172, 0, 0, 0.8);
        }

        ul {

          list-style: none;
          font-size: 20px;
          padding-right: 1rem;

          li {
            padding: 10px 0;
            //color: red;
            &:nth-of-type(2) {
              text-decoration: underline;
              text-decoration-color: rgba(255, 60, 60, 0.9);
            }
             &:nth-of-type(3) {
              text-decoration: underline;
              text-decoration-color: rgba(0, 132, 255, 0.3);
            }
 
            &:first-of-type {
              font-size: 30px;
            }
          }

        }
      
      }

    }

    .center_container {
      background: linear-gradient(to right, rgba(255, 12, 12, 0.6) 0%, rgba(255, 60, 60, 0.6) 50%, rgba(0, 132, 255, 0.3) 50%, rgba(0, 132, 255, 0.3) 100%);
      padding-bottom: 50px;
      
      .title_change {  
        display: inline-block;
        width: 100%;
        
        p {
          padding: 30px 0;
          float: left;
          width: 50%;
        }
        
      }
      
      .img_show {
        display: flex;
        justify-content: space-around;
        
        p {
          flex-basis: 40%;
        }
      }

      .title_change {
        display: inline-block;
        width: 100%;

        h2 {
          margin-top: 50px;
          z-index: 5;
          background-color: white;
        } 

        p {
          float: left;
          width: 50%;
          padding-bottom: 30px;
          font-size: 30px;
        }
      }
    }

    .footer_container {
      background-color: rgba(60, 133, 94, 0.7);
      margin: 60px auto;
       width: 40%;
       height: 40vh;
      overflow-x: hidden;
      overflow-y: scroll;
      //margin-bottom: 40px;
     //table {
       //width: 50px;
     // height: 60px;
     //background-color: blue;
     table {
       width: 100%;
       caption {
        font-size: 25px;
        color: black;
      }
     }

     table, th, td {
       border: 3px solid white;
     }
     th {
       width: 40%;
       
     }
     td {
     
       word-break: break-all;
       width: 60%;
       //text-overflow: ellipsis;
     }
     
    }

  }

  footer {
    height: 250px;
    background-color: rgba(0, 9, 90, 0.7);

    ul {
        cursor: default;
        padding: 30px;
        float: right;
        font-size: 20px;
      li {

        padding: 10px 0;

        .next {
          color: white;
          text-decoration: none;
        }
      }
     
    }
  }

  li {
    list-style: none;
    
  }


  



/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}
/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}
/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role="list"],
ol[role="list"] {
  list-style: none;
}
/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}
/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}
/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}
/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}
/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}
/* Remove all animations and transitions for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
   scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>
