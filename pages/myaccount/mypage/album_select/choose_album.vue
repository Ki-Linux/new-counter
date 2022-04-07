<template>
    <div id="all_select_img">
        <div class="to_next">
            <nuxt-link class="not_album" :to="'/myaccount/mypage/' + $store.state.username">アルバムに追加しない</nuxt-link>
        </div>
        <div class="title_desc">
            <h1>アルバム追加</h1>
            <p>マイページのアルバムに記録を追加できます!!</p>
        </div>
        <form @submit.prevent="postData">
            <div class="name">
            <input type="text" v-model="written_name" placeholder="タイトルを記入" maxlength="15">
        </div>
        <div class="img_box">
            <div class="show_img">
                <img :src="img_data" alt="select_img">
            </div>
            <div class="select_img" v-if="$store.state.select_plan !== 'free' && $store.state.back_data[4] === 'img' && show_next_img">
                <p v-for="(next_img, index_num) in next_imgs" :key="index_num">
                    <button type="button" :class="{right_button: index_num === 0}" @click="nextImg(index_num)">{{ next_img }}</button>
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
            
        </div>
        </form>  
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class chooseAlbum extends Vue {
    img_data: string | ArrayBuffer | null = require('../../../../static/edit/hatena.png');
    img_num: number = 0;
    next_imgs: string[] = ["◀", "▶"];
    written_name: string = "";
    attention: string = "";
    show_next_img: boolean = true;

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

        this.show_next_img = false;

       // const file = document.querySelector('input[type=file]').files![0];
        const  file = (<HTMLInputElement>e.target).files![0];
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            this.img_data = reader.result
        })

        
        reader.readAsDataURL(file);
        
        
        console.log(this.img_data)

        
        //this.img_data = URL.createObjectURL(file);
    }

    postData() {

        

        if(this.written_name === "" || this.img_data  === require('../../../../static/edit/hatena.png')){

            this.attention = "タイトルまたは画像がありません。";
            return;

        }

        const store_data = this.$store.state

        const str = String(this.img_data);
        console.log(this.img_data)
        

        this.$axios.post('album_data', {
            username: store_data.username,
            image: str,
            selector: store_data.back_data[0],
            target: store_data.back_data[1],
            present: store_data.back_data[2],
            title: this.written_name,
        })
        .then((response)=> {
            console.log(response)

            const album = response.data.album

            if(album) {
                this.$router.push('/myaccount/mypage/' + store_data.username);
            }

        })
        .catch((res) => {
            console.log(res);
        })




    }

}
</script>
<style lang="scss">
#all_select_img {
    text-align: center;
    padding-top: 50px;

    .to_next {
        
       padding-right: 30px;

        .not_album {
            float: right;
            font-size: 20px;
            
        }

    }

    .title_desc {
        h1 {
            font-size: 40px;
            padding-top: 50px;
        }

        p {
            font-size: 20px;
        }
    }

    form {

        padding-top: 30px;

        .name > input {
            width: 400px;
            padding: 5px;
            font-size: 25px;
        }

    } 


    .img_box {
        
        padding: 30px 0;
        
        
        .show_img {

            img{
            position: relative;
            margin-left: 50%;
            transform: translateX(-50%);
            width: 200px;
            background-color: rgba(0, 0, 0, 0.3);

            
            }
            
        }

        .select_img {
                //display: inline;
            //float: left;
            background-color: bisque;
            margin: 0 30vw;
            
            p button {
                font-size: 40px;
                float: right;
                background-color: rgb(175, 175, 175);
                color:rgba(0, 0, 0, 0.8);
            }

            p .right_button {
               float: left;
                margin-right: 100px;
                
            }

        } 
        

        

        
        .img_button {
            padding: 30px 0 20px;

            input[type="file"] {
                padding: 40px;
                font-size: 20px;
            }
        }
    }

    .submit_button {
        

        button {
            font-size: 25px;
            background-color: aliceblue;
            padding: 5px 15px;
        }

        
        
    }
}
</style>