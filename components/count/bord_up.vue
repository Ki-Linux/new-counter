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

            this.back_select_data = this.$store.state.back_select_data;
        };

        get showData() {//free planのときのみ

            return this.$store.getters.showData;
        };

        get showSelect() {
            return this.$store.getters.showSelect;
        };
        
        get backTargetData() {//目標のデータ vuexから
            return this.$store.getters.backTargetData;
        };
        get showWordImg() {//img data vuexから show_data[1]

            let arrayWordImg: string[] = [];


            let into_data = this.$store.getters.showWordImg;//freeプランのときは同じ数を入れる

            for(let i=0; i < this.showData; i++) {

                if(this.$store.state.select_plan !== "free") {

                    into_data = this.$store.state.show_data[i + 1];//freeプラン以外のときは違うデータを代入する
                }

                arrayWordImg.splice(i, 0, into_data);

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