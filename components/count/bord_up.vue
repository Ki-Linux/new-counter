<template>
    <div id="bord_up">
        <div class="contents_item" v-for="(show_word_img, img_Index) in showWordImg" :key="img_Index">
            <img v-if="show_word_img.match('http')" :src="show_word_img" alt="select_img">
            <p v-else>{{ show_word_img }}</p>
        </div>
        <div class="leftover">
            <p v-if="$store.state.back_data[0] == '＞'">残り: {{ backTargetData - showData }}</p>
            <p v-else>残り: {{ showData - backTargetData }}</p>
        </div>
        <div class="select_bord" v-if="$store.state.select_plan !== 'free' && showSelect">
            <ul v-for="(select_data, index) in back_select_data" :key="select_data">
               <li @click="chooseData(index)">{{ select_data }}</li> 
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class bord extends Vue {
        back_select_data: string[] = [];

        mounted() {

            this.back_select_data = this.$store.state.back_select_data

        };

        get showData() {//free planのときのみ

            return this.$store.getters.showData;
        };

        get showSelect() {
            return this.$store.getters.showSelect;
        };

        get whichButtonData() {// get up or down data
            
            
            return this.$store.getters.whichButtonData;
        };
        
        get backTargetData() {//目標のデータ　vuexから
            return this.$store.getters.backTargetData;
        };
        get showWordImg() {//img data　vuexから

            let arrayWordImg: string[] = [];
            const default_data = this.$store.state.back_data[2];
            const show_word_img = this.$store.getters.showWordImg;

            for(let i=0; i < default_data; i++) {

                arrayWordImg.splice(i, 0, show_word_img);

            }

            return arrayWordImg;
    
            
        }



        chooseData(choose_num: number) {//クリックした選択肢のデータ

            this.$store.dispatch("chooseData", [this.back_select_data[choose_num], false]);//選択した文字、画像データ 選択データを閉じる

            //this.$store.state.select_data = false;
            console.log(choose_num)

        }
        
    }
</script>
<style lang="scss">
    #bord_up {
        width: 70vw;
        height: 100vh;
        background-color: rgba(255, 254, 173, 0.301);
        overflow-Y: scroll;
        display: flex;
        flex-wrap: wrap;
        p {
            font-size: 25px;
        }
        .contents_item {
            img {
                width: 110px;
            }


            p {
                padding: 5px;
            }
        }
        .leftover p {
            color:rgb(255, 115, 0);
        }
 
    }
</style>