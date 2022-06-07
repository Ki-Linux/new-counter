<template>
    <div id="myname">
        <div class="instruct_incline" v-if="show_phone_desc && $store.state.show_phone">
            <phone_description @ok_click="OKClick"/>
        </div>
        <div class="pop_up" v-if="show_pop">
           <pop_up v-if="show_pop" @pop_up_show="popShow"/>
        </div>
        <reminder_name/>
        <profile_name/>
        <div class="to_album">
            <button @click="toAlbum">マイアルバム</button>
        </div>
        <div class="up_down_button">
            <button @click="toSelectPage">カウントする</button>      
            <ul>
                <li>
                  <span>
                    アップ
                  </span>
                  …目標値に向かってプラスのカウントを行う
                </li>
                <li>
                  <span>
                    ダウン
                  </span>
                  …現在値から0に向かってマイナスのカウントを行う
                </li>
            </ul>
        </div>
        <div class="back_home">
          <back_home where_go="home"/>
        </div>
        <div class="option">
            <ul>
                <li>
                  <nuxt-link class="editor" to="/myaccount/mypage/profileEdit/change_profile">
                    プロフィール編集
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="editor" to="/myaccount/mypage/setting/option_mydata">
                    設定
                  </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import phoneDescription from '@/components/phone/description.vue';
import profileName from '@/components/mypage/profile.vue';
import reminderName from '@/components/mypage/reminder.vue';
import backHome from '@/components/back_button/back.vue';
import popUp from '@/components/pop_up/pop_up_two.vue';
import { confirm } from '@/components/confirmation/confirm_person';


@Component({//middleware
    middleware: 'reject',
    components: {
        'phone_description': phoneDescription,
        'profile_name': profileName,
        'reminder_name': reminderName,
        'back_home': backHome,
        'pop_up': popUp,
    }
})
export default class myname extends Vue {

  show_pop: boolean = false;
  show_phone_desc: boolean = true;

  head() {
    return {
      title: 'マイページ'
    }
  }

  beforeMount() {
        
    console.log('go mount');
    const account_name = this.$route.params.myname;

    //localStorageのデータを削除
    this.$store.dispatch("planSelect_arrayDelete", account_name);

    confirm(account_name);
        
  }

  OKClick(ok_click: boolean) {

    this.show_phone_desc = ok_click;
    console.log(ok_click);

  }

  popShow(value: boolean) {

    this.show_pop = value;

  }


  toAlbum() {//アルバムへ

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
        font-weight: bold;

      }

      &:last-of-type span {

        color: rgb(0, 0, 104);
        font-weight: bold;

      }
    }
    
}

.back_home {

  float: right;
  padding: 30px;

}
</style>