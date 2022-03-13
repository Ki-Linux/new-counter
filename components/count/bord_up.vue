<template>
    <div id="bord_up">
        <div class="contents_item" v-for="(show_img, img_Index) in showImg" :key="img_Index">
            <img v-if="show_img.match('http')" :src="show_img" alt="select_img">
            <p v-else>{{ show_img }}</p>
        </div>
        <div class="leftover">
            <p v-if="$store.state.back_data[0] == '＞'">残り: {{ backTargetData - backPresentData }}</p>
            <p v-else>残り: {{ backPresentData - backTargetData }}</p>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class bord extends Vue {
        array_imgs: string[] = [];
        only_first: boolean = true;
        get whichButtonData() {// get up or down data
            return this.$store.getters.whichButtonData;
        };
        get backPresentData() {//現在のデータ　vuexから
            return this.$store.getters.backPresentData;
        };
        get backTargetData() {//目標のデータ　vuexから
            return this.$store.getters.backTargetData;
        }
        get showImg() {//img data　vuexから
            if(this.only_first === true) {
                let count = 1;
                while(count <= this.backPresentData) {
                    this.array_imgs.push(this.$store.getters.showImg);
                    count++;
                    //console.log(this.array_imgs);
                }
                this.only_first = false;
                return this.array_imgs;
            } else {
                if(this.whichButtonData[0] == "up") {
                    this.array_imgs.push(this.$store.getters.showImg);
                    return this.array_imgs;
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