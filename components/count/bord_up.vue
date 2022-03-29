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
        <div class="select_bord">
            <ul v-for="(choose_img, index) in choose_imgs" :key="choose_img">
               <li @click="chooseData(index)">{{ choose_img }}</li> 
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class bord extends Vue {
        choose_imgs: string[] = [];
        only_first: boolean = true;
        first_set_word_or_img: boolean = true;
        get showData() {//free planのときのみ
            return this.$store.getters.showData;
        };
        get whichButtonData() {// get up or down data
            
            
            return this.$store.getters.whichButtonData;
        };
        
        get backTargetData() {//目標のデータ　vuexから
            return this.$store.getters.backTargetData;
        };
        get showWordImg() {//img data　vuexから

            let arrayWordImg: string[] = [];
            const show_word_img = this.$store.getters.showWordImg;

            for(let i=0; i < this.showData; i++) {

                arrayWordImg.splice(i, 0, show_word_img);

            }

            return arrayWordImg;


            //} else {//free以外

                /*const img_data = this.$store.state.back_data;


                for(let i=3; i < img_data.length; i++) {//Vuexの配列から値を表示
                    this.array_imgs.splice(i - 3, 0, img_data[i]);
                }*/


            //}
    
            
        }



        chooseData(choose_num: number) {

            this.$store.dispatch("chooseData", this.choose_imgs[choose_num]);



        }
        /*created(): void {
                
                
            
        }*/
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