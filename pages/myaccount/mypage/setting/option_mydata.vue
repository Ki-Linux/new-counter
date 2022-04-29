<template>
    <div id="option_my_data">
        <div class="contents">
            <div class="account_info">
                <ul v-for="account in accounts" :key="account.title">
                    <li>{{ account.title }}</li>
                    <li>{{ account.info }}</li>
                </ul>
            </div>
        </div>
        <div class="contents_list">
            <h1>設定</h1>
            <div class="all_option">
                <ul v-for="option_content in option_contents" :key="option_content">
                    <li>{{ option_content }}</li>
                </ul>
            </div>
        </div>
        
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class optionMyData extends Vue {
    option_contents: string[] = ['アカウント情報', 'パスワード変更', 'リマインダー設定', 'ログアウト'];
    accounts: { title: string, info: string}[]
     = [{ title: '登録メールアドレス', info: ''},{ title: 'ユーザー名', info: ''}];


}
</script>
<style lang="scss">
#option_my_data {

    
    .contents {
        position: absolute;
        left: 300px;
        .account_info {
            text-align: center;

            ul {
                font-size: 25px;
            }
        }
    }

    .contents_list {

         padding-top: 40px;
         background-color: rgba(255, 225, 205, 0.6);
         width: 250px;
         height: 100vh;

        h1 {
            margin-left: 40px;
        }

        .all_option {
            ul {
                
                font-size: 20px;

                li {
                    margin-top: 30px;
                }   
            }
        }

    }

    ul {
        list-style: none;
    }

   
}
</style>
