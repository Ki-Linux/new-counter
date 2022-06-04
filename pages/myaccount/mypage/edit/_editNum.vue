<template>
    <div id="edit">
        <form @submit.prevent="dataSend">
            <div class="sub_button">
                <button type="button" @click="stopPost">{{ button_name }}をやめる</button>
                <button type="submit">{{ button_name }}</button>
            </div>
            <div class="img_selector">
                <label v-for="(select_name, index) in select_names" :key="select_name">
                    <input type="radio" name="index" :value="index" @click="imgSelect(index)" :checked="index === 0">
                    {{ select_name }}
                </label>
            </div>
            <div class="post_data">
                <div class="img_file">
                    <div v-if="show_select_button && $store.state.back_data[4] === 'img'">
                        <div class="shift_data" v-for="(shift_img, index) in shift_imgs" :key="index">
                            <button type="button" @click="shiftImg(index)" :class="{second_button: index === 1}">
                                {{ shift_img }}
                            </button>
                        </div>
                    </div>
                    <div class="img_box">
                        <p v-if="select_img_chosen && this.url !== 'notImg'">
                            <img :src="show_url" alt="img none">
                        </p>
                        <p v-else>画像はありません</p>
                    </div>    
                    <input v-if="select_img_chosen" type="file" name="picture" ref="preview" @change="editPicture" multiple="multiple">
                </div>  
                <div class="comment">
                    <textarea name="comment" id="" cols="30" rows="10" maxlength="200" placeholder="コメントを入力" v-model="my_comment"></textarea>
                </div>         
            </div>
            <div class="right_position">
                <div class="content_data"  v-for="(content_data, index) in contentData" :key="content_data">
                    <p>{{ content_data }}</p>
                    <label>
                        <input type="radio" :name="index" value="はい" @click="checkOn(index, 1)" :checked="array_check[index] === 1 && show_checked">
                        はい
                    </label>
                    <label>
                        <input type="radio" :name="index" value="いいえ" @click="checkOn(index, 0)" :checked="array_check[index] === 0 && show_checked">
                        いいえ
                    </label> 
                </div>
            </div>
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AxiosRequestConfig } from 'axios';
import { confirm } from '@/components/confirmation/confirm_person';

@Component({
    middleware: 'reject'
})
export default class edit extends Vue {

    url: string = "notImg";//データベースへ送るURL
    storage_image: any;//storageへ送るURL
    show_url: string|ArrayBuffer|null = require("@/static/edit/hatena.png");//示すurl
    str_url: string = "";
    my_comment = "";
    array_check: number[] = [2, 2, 2, 2, 2];
    contentData: string[] = [
                            'みんなの閲覧リストに表示する',
                            '他の人がいいねできるようにする', 
                            'ほかのひとがコメントできるようにする', 
                            'この投稿の閲覧数を表示する', 
                            'このサイトのトップページに表示する(チェックすることでこの投稿をより多くの人に見てもらえます。)'
                        ];
    button_name: string = "";
    show_checked: boolean = false;//印をつけるかつけないか
    select_names: string[] = [
                            '画像を選択',
                            'なし'
                        ];
    shift_imgs: string[] = ['◀', '▶'];//[現在の画像の番号, 画像の移動]
    shift_num: number = 0;
    select_img_chosen: boolean  = true;
    show_select_button: boolean = false;//画像切り替えボタンを表示する
    select_image: boolean = false;
    add_edit: boolean = false;

    head() {

        let title_data;
        const router_data = this.$route.params.editNum;

        if(router_data === "new_post") {

            title_data = "投稿";
        } else {

            title_data = "編集";
        }

        return {
            title: title_data
        }
    }

    beforeMount() {
        
        console.log('go mount');

        const username = this.$store.state.username;

        confirm(username);
        
    }

    mounted() {

        const editNum = this.$route.params.editNum;

        if(editNum === 'new_post') {//投稿

            this.button_name = "投稿";

            const store = this.$store.state;

            let img_data = store.back_data;
            const plan = store.select_plan;
            const back_data = store.back_select_data;

            this.my_comment = img_data[2] + "から" + img_data[1] + "まで達成!!";

                
            if(back_data.length > 1 && img_data[4] !== "nothing") {//画像をたくさん選択しているとき　なし選択は除外

                this.show_select_button = true;//画像を切り替えるボタンを表示

            }

            if(plan !== "free") {

                img_data[3] = store.back_select_data[this.shift_num];//最初は0

            }

            this.url = img_data[3];
            this.storage_image = [this.url, false];
            this.show_url = process.env.SERVER_URL+this.url;

            if(img_data[4] === "nothing" || img_data[4] === "word") {//画像以外のとき

                this.url = "notImg";
                this.show_url = "notImg";
                
            }

        } else {//編集

            this.button_name = "編集";

            this.$axios.get("edit_show", {
                params: {
                    id: editNum,
                    target: 'edit',
                }
            })
            .then((response) => {
                const res = response.data.contents[0];
                this.url = res.picture;


                const server_storage_url = process.env.SERVER_URL;
                this.show_url = server_storage_url + this.url;
                this.storage_image = [this.url, false];

                this.my_comment = res.my_comment;
                this.array_check.splice(0, 5, res.can_list , res.can_good, res.can_comment, res.can_see, res.can_top);
                this.show_checked = true;
            })
            .catch((err) => {
                console.log(err);
            })

        }

    }

    shiftImg(img_num: number) {

        const select_data = this.$store.state.back_select_data;
        const last_data = select_data.length - 1;

        const base_url = process.env.SERVER_URL;
        const url = base_url;

        if(img_num === 0) {//-1

            this.shift_num -=1 ;

            if(this.url === select_data[0]) {//最初のデータで左を押したときに一番最後のデータを表示する

                this.shift_num = last_data;

            }

        }

        if(img_num === 1) {//+1

            this.shift_num++;
            
            if(this.url === select_data[last_data]) {//最後のデータで右を押したときに一番最初のデータを表示する
                this.shift_num = 0;
            }
            
        }

        this.url = select_data[this.shift_num];
        this.storage_image = [this.url, false];
        this.show_url = url + this.url;

        console.log(img_num);

    }

    imgSelect(num: number) {

        console.log(num);

        const store = this.$store.state;

        const img_data = store.back_data;
        const back_data = store.back_select_data;

        if(num === 0) {

            this.select_img_chosen = true;

            if(img_data[4] !== "nothing" && back_data.length > 1 && !this.select_image) {

                this.show_select_button = true;//◀▶

            }

        } else if(num === 1) {

            this.select_img_chosen = false;
            this.show_select_button = false;//◀▶

        }

    }
    
    editPicture(e: Event) {

        this.show_select_button = false;
        this.select_image = true;
        
        const file = (<HTMLInputElement>e.target).files![0];

        this.storage_image = [file, true];
        this.url = file.name;

        const reader = new FileReader();

        reader.addEventListener('load', () => {

            const result = reader.result;

            this.show_url = result;

            this.add_edit = true;

        })

        reader.readAsDataURL(file);

    }

    stopPost() {

        const editNum = this.$route.params.editNum;

        if(editNum === 'new_post') {//post

            if(window.confirm('本当にやめますか?')) {
                this.$router.push('/myaccount/mypage/album_select/choose_album');
            }

        } else {//edit

            const name = this.$store.state.username;

            this.$router.push('/myaccount/everyone_page/' + name);

        }
        
    }

    checkOn(index: number, select_num: number) {
       
        for(let i: number=0; i < 5; i++) {//ボックス一覧の表示

            switch(index) {//チェックしている番号の列

                case i:

                    this.array_check[i] = select_num;
 
                break;

            }
            
        }

        console.log(this.array_check); 

    }

    dataSend() {//databaseへ

        if(this.array_check.includes(2)) {

            alert('選択していない場所があります。');
            return;
        }

        if(this.my_comment === "") {

            this.my_comment = 'コメントがありません。';

        }

        if(!this.select_img_chosen) {//画像でないときのみ代入

            this.url = "notImg";

        } 

        const editNum = this.$route.params.editNum;
        const name = this.$store.state.username;

        //const post_image = (num_edit: string) => {

            const formData = new FormData();

            const first_parameter = [
                'username',
                'comment',
                'can_list',
                'show_good',
                'others_comment',
                'can_see',
                'to_top',
                'file',
                'default_or_selected'
            ];

            const second_parameter = [
                name,
                this.my_comment,
                this.array_check[0],
                this.array_check[1],
                this.array_check[2],
                this.array_check[3],
                this.array_check[4],
                this.storage_image[0],
                this.storage_image[1]
            ];

            for(let i=0; i < first_parameter.length; i++) {

                formData.append(first_parameter[i], second_parameter[i]);

            }

            
             

            

            /*formData.append('file', this.storage_image[0]);
            formData.append('default_or_selected', this.storage_image[1]);
            formData.append('album_or_post', 'post');

            console.log(formData);
            console.log(this.storage_image[0]);*/

            /*this.$axios.post('album_post_image', formData)
            .then((response) => {

                console.log(response);

                let url;
                if(num_edit === 'new_post') {

                    url = ('/myaccount/mypage/album_select/choose_album');

                } else {

                    url = ('/myaccount/everyone_page/' + name);

                }

                this.$router.push(url);
                    
            })
            .catch((err) => {
                console.log(err);
            });*/

        //}

        console.log(formData);

        if(editNum === 'new_post') {//paramsがこの文字のときは編集ではなく投稿

            this.$axios.post('edit', formData)
            .then((response) => {
                console.log(response);

                const res = response.data;

                if(res.success === "store_true") {
                    console.log("success");

                    this.$router.push('/myaccount/mypage/album_select/choose_album');
                    
                }

            })
            .catch((err) => {
                console.log(err);
            });

        } else {

            formData.append('id', editNum);

            this.$axios.post('edit_update', formData)// + editNum, 
            .then((response) => {
                const res = response.data;

                if(res.success === "update_true") {

                    this.$router.push('/myaccount/everyone_page/' + name);

                }
                

            })
            .catch((err) => {
                console.log(err);
            });

            /*console.log(this.url);

            const set_data = {
                username: name,
                image: this.url,
                comment: this.my_comment,
                can_list: this.array_check[0],
                show_good: this.array_check[1],
                others_comment: this.array_check[2],
                can_see: this.array_check[3],
                to_top: this.array_check[4],
            }*/

            /*const method_url: AxiosRequestConfig = { //編集
                method: 'put',
                url: 'edit_update/' + editNum,
                params: set_data,
            }*/

            /*this.$axios(method_url)
            .then((response) => {
                console.log(response);

                const res = response.data;

                if(res.success === "update_true" && this.add_edit && this.url !== "notImg") {

                   // post_image(editNum);
                    return;

                }

                this.$router.push('/myaccount/everyone_page/' + name);
            })
            .catch((err) => {
                console.log(err);
            });*/

        }

    }

}
</script>
<style lang="scss">
html {
    background-color: rgba(255, 225, 225, 0.7);
}
#edit {

    form {

        .img_selector {
            padding: 50px 50px 0;
            font-size: 20px;
            
        }

        .post_data {
            width: 40%;
            padding: 50px;
            float: left;
            background-color: rgb(227, 255, 255);

           .img_file {

               .shift_data {
                   display: inline;

                   .second_button {
                       float: right;
                   }
                   
               }

               .img_box {

                    p img {

                        width: 100%;
                        background-color: rgba(187, 187, 187, 0.4);
                    }

                } 

                input[type="file"] {

                    padding: 20px 0 40px;

                }

            }
            
            .comment {

                textarea {

                    display: block;
                    padding: 5px;
                    width: 30vw;
                    font-size: 20px;
                    margin-top: 30px;
                }

            }
            
        }


        .right_position {

            text-align: center;
            float: right;
            font-size: 20px;
            padding: 80px;
            width: 60%;
            background-color: rgb(255, 249, 218);

            .content_data {

                padding: 20px 0;

            }

        }

        .sub_button {
            
            float: right;
            padding: 10px 20px 10px;

            button {
                background-color: white;

                &[type="submit"] {

                    font-size: 30px;
                    padding: 3px 20px;
                
                }

            }

        }

    } 

}
</style>
