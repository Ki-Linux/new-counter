<template>
    <div id="bord_up">
        <div class="contents_item" v-for="(show_img, img_Index) in showImg" :key="img_Index">
            <img v-if="show_img.match('http')" :src="show_img" alt="select_img">
            <p v-else>{{ show_img }}</p>
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
        array_imgs: string[] = [];
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
        get showImg() {//img data　vuexから

                

            //if(this.$store.state.select_plan === "free") {//free

                if(this.only_first === true) {//saisho

                    let count = 1;
                    while(count <= this.showData) {
                        this.array_imgs.push(this.$store.getters.showImg);
                        count++;
                    //console.log(this.array_imgs);
                    }
                    this.only_first = false;
                    return this.array_imgs;

                } else {//tugikara

                    if(this.whichButtonData[0] == "up") {

                        

                        

                        //選択肢を表示
                        /*if(this.first_set_word_or_img) {//初めの１回

                            const choose_img = this.$store.state.back_data;

                            for(let i=3; i < choose_img.length; i++) {//Vuexの配列から値を表示
                                this.choose_imgs.splice(i - 3, 1, choose_img[i]);
                            }

                            this.first_set_word_or_img = false;*/

                            

                        //} else {//2回目から

                            //if(this.$store.state.select_plan === "free") {// free plan

                            this.array_imgs.push(this.$store.getters.showImg);

                            return this.array_imgs;

                        //}

                        //}

                        
                        

                    } else if(this.whichButtonData[0] == "down") {
                        this.array_imgs.splice(0,1);
                        return this.array_imgs;
                    } else {//初期化
                        this.array_imgs = [];
                        let count = 1;
                        while(count <= this.$store.state.first_data) {
                        this.array_imgs.push(this.$store.getters.showImg);
                        count++;
                    }
                    return this.array_imgs;
                    
                    
                    }
                
                }

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