<template>
  <div id="home"> 
    <div class="first">
      <nav>
        <nuxt-link class="to_count" to="/login_select">プラマイカウントを使う</nuxt-link>
        <img class="selector_img" @click="changeBox" :src="url_change" alt="open">
        <p>投稿はこちらから→</p>
      </nav>
      <header>
        <transition-group name="slide-fade">
            <div v-show="show_section" class="show_login" v-for="login in logins" v-bind:key="login">
              <nuxt-link class="link" to="/about">{{ login }}</nuxt-link>
            </div> 
        </transition-group>
      </header>
    </div>
  </div>
</template>
<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Home extends Vue{
  logins: string[] = ["ログイン", "新規登録", "ログアウト"];
  url_change: string = require("../static/Home/selector_box.png");
  change_box: boolean = true;//urlの変更
  show_section: boolean = false; //ログイン欄の表示(true==表示,false==非表示)
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
  .first {/*最初の画面にでてくるところの全体*/
    padding-top: 0;
    background-color: rgb(197, 197, 214);
    height: 800px;
  }
  nav {
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
