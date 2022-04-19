<template>
    <div id="myname">
        <reminder_name/>
        <profile_name/>
        <div class="to_album">
            <button @click="toAlbum">マイアルバム</button>
        </div>
        <div class="pop_up" v-if="show_pop">
           <pop_up v-if="show_pop" @pop_up_show="popShow"/>
        </div>
        <div class="up_down_button">
            <button @click="toSelectPage">カウントする</button>      
            <ul>
                <li><span>アップ</span>…目標値に向かってプラスのカウントを行う</li>
                <li><span>ダウン</span>…現在値から0に向かってマイナスのカウントを行う</li>
            </ul>
        </div>
        <div class="back_home">
          <back_home where_go="home"/>
        </div>
        <div class="option">
            <ul>
                <li><nuxt-link class="editor" to="/myaccount/mypage/profileEdit/change_profile">プロフィール編集</nuxt-link></li>
                <li><nuxt-link class="editor" to="">設定</nuxt-link></li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import profileName from '../../../components/mypage/profile.vue';
import reminderName from '../../../components/mypage/reminder.vue';
import backHome from '../../../components/back_button/back.vue';
import popUp from '../../../components/pop_up/pop_up_two.vue';

@Component({
    components: {
        'profile_name': profileName,
        'reminder_name': reminderName,
        'back_home': backHome,
        'pop_up': popUp,
    }
})
export default class myname extends Vue {
  show_pop: boolean = false;

  mounted() {
    //localStorageのデータを削除
      
    const account_name = this.$route.params.myname;
    this.$store.dispatch("planSelect_arrayDelete", account_name);
  }

  popShow(value: boolean) {

    this.show_pop = value;

  }


  toAlbum() {
    this.$router.push('/myaccount/mypage/album_select/my_album');
  }


  toSelectPage() {
    this.show_pop = true;

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

 .to_album {
    float: left;
    margin: 20px 0 0 40px;
    font-size: 19px;

    button {
      background-color: beige;
    }
  }


.up_down_button {
        //float: left;
    text-align: center;
    font-size: 50px;

    button {
      padding: 10px 30px;
      margin-right: 20px;
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

.back_home {
  float: right;
  padding: 30px;
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