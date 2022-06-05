<template>
    <div id="login_select">
        <div class="instruct_incline" v-if="show_phone_desc">
            <phone_description @ok_click="OKClick"/>
        </div>
        <div class="select_button" :class="{ styleClass: index === 0, styleClassBottom: index == 1 }" v-for="(selector, index) in selectors" :key="selector.description">
            <p>{{ selector.description }}</p>
            <button @click="toPage(index)">
                {{ selector.url_button }}
            </button>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from 'nuxt-property-decorator';
    import phoneDescription from '@/components/phone/description.vue';

    @Component({
        components: {
            'phone_description': phoneDescription
        }
    })
    export default class loginSelect extends Vue {
        show_phone_desc: boolean = true;
        selectors: { description: string; url_button: string; } [] =  [
            {
                description: "マイページからカウントや投稿ができます。",
                url_button: "すでに登録済みの方",
            },
            {
                description: "フリーカウントはアカウント登録なしで気軽にできますが保存されません。",
                url_button: "フリーカウント",
            }
        ];

        head() {
            return {
                title: '選択',
                meta: [
                    { hid: 'description', name: 'description', content: 'ログインとフリーカウントのどちらかを選択できます。' }
                ]
            }
            
        }

        OKClick(ok_click: boolean) {
            this.show_phone_desc = ok_click;
            console.log(ok_click);
        }


        toPage(index: number) {

            const to_url = (url: string) => {
                this.$router.push(url);
            }
            
            switch(index) {
                case 0:
                    to_url("/addInfo/login/thisLogin");
                    break;
                case 1:
                    to_url("/counterDo/optionData/free");
                    break; 
            }
        }
    }
</script>
<style lang="scss">
    #login_select {
        padding: 100px 0;
    }

    .select_button {
        font-size: 20px;
        padding: 40px 20px;
        text-align: center;
        
        button {
            margin-top: 30px;
            padding: 10px 20px;
            font-size: 25px;
            color: rgba(36, 36, 36, 0.9);
        }
    }
    .styleClass {/*上*/
        background-color: rgba(200, 255, 0, 0.5);
        margin-bottom: 100px;
                
    }
    .styleClassBottom {/*下*/
        background-color: rgba(0, 225, 255, 0.5);
        
    }
</style>