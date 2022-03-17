<template>
    <div id="myname">
        <reminder_name/>
        <profile_name/>
        <div class="up_down_button">
            <button @click="toCountPage">カウントする</button>        
            <ul>
                <li><span>アップ</span>…目標値に向かってプラスのカウントを行う</li>
                <li><span>ダウン</span>…現在値から0に向かってマイナスのカウントを行う</li>
            </ul>
        </div>
        <div class="option">
            <ul>
                <li><nuxt-link class="editor" to="">プロフィール編集</nuxt-link></li>
                <li><nuxt-link class="editor" to="">設定</nuxt-link></li>
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

  toCountPage() {
    this.$router.push('/addInfo');
  }

}
</script>
<style lang="scss">

li {
    list-style: none;
}

.option {
  font-size: 25px;
  

  ul li {
    
    padding: 10px 0;

    .editor {
      color: rgb(0, 62, 73);
      text-decoration: none;
    }
  }
}



.up_down_button {
        //float: left;
    text-align: center;
    font-size: 50px;

    button {
      padding: 10px 30px;
      margin: 0 10px;
      background-color: rgb(236, 236, 236);
      color: rgb(29, 104, 0);
    
    }


    ul li {
      font-size: 30px;
      

      &:first-of-type span {

        color: rgb(104, 0, 0);
        font-weight:bold;

      }

      &:last-of-type span {
        color: rgb(0, 0, 104);
        font-weight:bold;
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