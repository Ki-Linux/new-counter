<template>
    <div id="all_select_img">
        <form @submit.prevent="postData">
            <div class="name">
            <input type="text" v-model="written_name" placeholder="タイトルを記入" maxlength="15">
        </div>
        <div class="img_box">
            <div class="show_img">
                <img :src="img_data" alt="select_img">
            </div>
            <div class="select_img" v-if="$store.state.select_plan !== 'free'">
                <p v-for="(next_img, index_num) in next_imgs" :key="index_num">
                    <button type="button" @click="nextImg(index_num)">{{ next_img }}</button>
                </p>
            </div>
            <div class="img_button">
                <input type="file" name="picture" ref="preview" @change="editImg" multiple="multiple">
            </div>
            <p>{{ attention }}</p>
            <!--<div class="no_img">
                <button type="button">画像なし</button>
            </div>-->
        </div>
        <div class="submit_button">
            <button type="submit">アルバムに追加</button>
            <nuxt-link to="">アルバムを作成しない</nuxt-link>
        </div>
        </form>  
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class chooseAlbum extends Vue {
    img_data: string = require('../../../../static/edit/hatena.png');
    img_num: number = 0;
    next_imgs: string[] = ["◀", "▶"];
    written_name: string = "";
    attention: string = "";

    mounted() {

        const store = this.$store.state;

        const back_data = store.back_data;

        if(back_data[4] === "img") {

            if(store.select_plan === "free"){

                this.img_data = back_data[3];

            } else {

                this.img_data = store.back_select_data[0];
                
            }
        } 
    
    }

    nextImg(num: number) {

        //console.log(num)
        /*if(num === 0) {
            [require('../../../../static/edit/hatena.png')]
        }*/

        const select_data = this.$store.state.back_select_data;
        const last_data = select_data.length - 1;

        if(num === 0) {//-1

            this.img_num -=1;

            if(this.img_data === select_data[0]) {//最初のデータで左を押したときに一番最後のデータを表示する

                this.img_num = last_data;

            }

        }

        if(num === 1) {//+1

            this.img_num++;
            
            if(this.img_data === select_data[last_data]) {//最後のデータで右を押したときに一番最初のデータを表示する
                this.img_num = 0;
            }

            
        }


        this.img_data = select_data[this.img_num];

    }

    editImg(e: Event) {
        const  file = (<HTMLInputElement>e.target).files![0];
        this.img_data = URL.createObjectURL(file);
    }

    postData() {

        

        if(this.written_name === "" || this.img_data  === require('../../../../static/edit/hatena.png')){

            this.attention = "タイトルまたは画像がありません。";
            return;

        }

        const store_data = this.$store.state

        this.$axios.post('album_data', {
            username: store_data.username,
            image: this.img_data,
            selector: store_data.back_data[0],
            target: store_data.back_data[1],
            present: store_data.back_data[2],
            title: this.written_name,
        })
        .then((response)=> {
            console.log(response)
        })




    }

}
</script>
