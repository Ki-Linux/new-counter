<template>
    <div id="top_label">
        <button @click="toHome">ホームに戻る</button>
        <p v-if="$store.state.back_data[0] === '＞'">アップ</p>
        <p v-else>ダウン</p>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TopLabel extends Vue {

  toHome(): void {
    const conf: string = 'フリーカウントでホームに戻るとデータが保存されませんがよろしいですか？';
    const vuexData = this.$store.state;

    if(vuexData.canClick) {//clickできるか(popup)

        let url;

        if(vuexData.select_plan == "free" && vuexData.username == "") {

          url = ('/');

        } else {

          url = ('/myaccount/mypage/' + vuexData.username);
          
        }
        
        this.$router.push(url);
      
    }
        
  }
}
</script>
<style lang="scss">
  #top_label {

    background-color: rgba(0, 5, 34, 0.6);
    padding: 20px;

    button {
      background-color: rgba(255, 255, 255, 0.8); 
      font-size: 25px;
      margin-left: 10px;
    }

    p {
      float: right;
      color: rgba(255, 255, 255, 0.9);
      font-size: 30px;
      line-height: 40px;
      margin-right: 40px;
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