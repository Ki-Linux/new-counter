<template>
    <div id="rule">
        <div class="terms_of_use" v-if="$route.params.rule === 'terms_of_use'">
            <h1>利用規約</h1>
            <p>禁止行為</p>
            <ul>
                <li>登録ユーザーは本サイトで下記の行為をすることを禁じます。</li>
            </ul>
            <ul class="terms_of_use_one" v-for="rule_first in terms_of_rule[0]" :key="rule_first">
                <li>{{ rule_first }}</li>
            </ul>
            <p>・投稿及びコメントでの</p>
            <ul class="terms_of_use_two" v-for="rule_second in terms_of_rule[1]" :key="rule_second">
                <li>{{ rule_second }}</li>
            </ul>
            <p>・投稿をするときの写真の著作権や自己及び他人のプライバシーには十分気をつけてください。</p>
            <ul class="terms_of_use_three" v-for="rule_third in terms_of_rule[2]" :key="rule_third">
                <li>{{ rule_third }}</li>
            </ul>
            <p>違反行為の取り扱い</p>
            <ul v-for="rule_fourth in terms_of_rule[3]" :key="rule_fourth">
                <li>{{ rule_fourth }}</li>
            </ul>
            <p>変更、終了</p>
            <ul v-for="rule_fifth in terms_of_rule[4]" :key="rule_fifth">
                <li>{{ rule_fifth }}</li>
            </ul>
        </div>
        <div class="privacy_policy" v-else-if="$route.params.rule === 'privacy_policy'">
            <h1>プライバシーポリシー</h1>
            <ul v-for="privacy_policy in privacy_policies" :key="privacy_policy">
                <li>{{ privacy_policy }}</li>
            </ul>
        </div>
        <div class="back_button">
            <back_data/>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import backData from '@/components/back_button/back.vue';

@Component({
    components: {
        'back_data': backData,
    }
})
export default class Rule extends Vue {
    terms_of_rule: string[][]
    = [ 
        [
            '1.法令違反または犯罪に関係する行為',
            '2.公序良俗に反する行為',
            '3.自己及び他人のプライバシーを侵害する行為',
            '4.投稿機能を利用する場合には以下の行為をしないよう気をつけてください。報告があった場合や管理人が違反行為を発見した場合に告知なく削除させていただくことやアカウントを停止させていただくこともあります。'
        ],
        [
            
            '過度な暴力的または残虐な表現',
            '他人の名誉または信用を毀損する表現',
            '過度にわいせつな表現',
            '差別を助長する表現',
            '他人に不快感を与える表現',
            '異性との出会いを目的とした表現',
        ],
        [
            '5.第三者に成りすます行為',
            '6.承諾のない宣伝、営業行為',
            '7.他の利用者に不利益、損害、不快感を与える行為',
            '8. 荒らしを目的とした行為'
        ],
        [
            '上記に違反した場合はメールやアカウントホーム画面上のお知らせでの注意喚起または予告なくアカウントの停止を行わせていただく場合があります。'
        ],
        [
            '本サイトは管理人の都合で予告なく変更または終了することがあります。',
            '本サイトの規約は変更される場合があります。その際にはアカウントのホーム画面上のお知らせにて告知いたします。'
        ]
    ];

    privacy_policies: string[]
    = [
        '本サイトで保持したメールアドレス、パスワード、アカウント名、アカウントアイコン画像及び投稿の中身は本サイトの範囲で利用します。',
        'ご登録いただきましたメールアドレスは主に新規登録の通知及び禁止行為違反に対応するための注意喚起の際に利用させていただきます。',
        '別途用件でも必要があった際に本サイトの範囲でメールアドレスを利用させていただく場合もあります。',
        '本サイトの運営が終了する際には、アカウント、投稿及びコメントの情報等をすべて削除いたします。'
    ];
}
</script>
<style lang="scss">
#rule {
    padding: 30px;

    .terms_of_use {

        p {
            padding-left: 10px;

            &:first-of-type, &:nth-of-type(4), &:nth-of-type(5) {
                font-weight: bold;
                padding-top: 20px;
            }

            &:nth-of-type(2), &:nth-of-type(3) {
                padding-left: 50px;
            }
        }

        .terms_of_use_one, .terms_of_use_two, .terms_of_use_three {
            li {
                list-style: none;
            }
        }


  
        .terms_of_use_two {
            padding-left: 80px;
        }

        
    

    }

    .privacy_policy {
        h1 {
            padding-left: 10px;
        }

        ul li {
            padding: 10px 0;
        }
    }

    .back_button {
        margin: 40px 10px;
        button {
            font-size: 20px;
        }
    }
    

}
</style>