<template>
    <div id="edit">
        <form @submit.prevent="dataSend">
            <div class="sub_button">
                <button type="submit">{{ button_name }}</button>
            </div>
            <div class="img_selector">
                <label v-for="(select_name, index) in select_names" :key="select_name">
                    <input type="radio" name="index" :value="index" @click="imgSelect(index)" :checked="index === 0">{{ select_name }}
                </label>
            </div>
            <div class="post_data">
                <div class="img_file">
                    <div class="img_box">
                        <p v-if="select_img_chosen && url.match('http')"><img :src="url" alt="img none"></p>
                        <p v-else>画像はありません</p>
                    </div>    
                    <input v-if="select_img_chosen" type="file" name="picture" ref="preview" @change="editPicture" multiple="multiple">
                </div>  
                <div class="comment">
                    <textarea name="comment" id="" cols="30" rows="10" maxlength="200" v-model="my_comment"></textarea>
                </div>         
            </div>
            <div class="right_position">
                <div class="desc">
                    <p>※選択しないところはデフォルトで【はい】として扱われます。</p>
                </div>
                <div class="content_data"  v-for="(content_data, index) in contentData" :key="content_data">
                    <p>{{ content_data }}</p>
                    <label>
                        <input type="radio" :name="index" value="はい" @click="checkOn(index, 1)" :checked="array_check[index] === 1 && show_checked">はい
                    </label>
                    <label>
                        <input type="radio" :name="index" value="いいえ" @click="checkOn(index, 0)" :checked="array_check[index] === 0 && show_checked">いいえ
                    </label> 
                </div>
            </div>
            
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AxiosRequestConfig } from 'axios';

@Component
export default class edit extends Vue {
    url = require("../../../../static/edit/hatena.png");//[default_img, select_img]
    my_comment = "";
    array_check: number[] = [2, 2, 2, 2, 2];
    //check: boolean = false;
    contentData: string[] = [
                            'みんなの閲覧リストに表示する',
                            '他の人がいいねできるようにする', 
                            'ほかのひとがコメントできるようにする', 
                            'この投稿の閲覧数を投稿する', 
                            'このサイトのトップページに表示する(チェックすることでこの投稿をより多くの人に見てもらえます。)'
                        ];
    button_name: string = "";
    show_checked: boolean = false;//印をつけるかつけないか
    select_names: string[] = [
                            '画像を選択',
                            'なし'
                        ];
    select_img_chosen: boolean  = true;

    mounted() {

        const img_data = this.$store.state.back_data[3];

        //if(img_data.includes('http')) {//画像のときのみ代入

            this.url = img_data;

        //} 

        

        const editNum = this.$route.params.editNum;

        if(editNum === 'new_post') {

            this.button_name = "投稿";

        } else {

            this.button_name = "編集";

            this.$axios.post("edit_show", {
                id: editNum,
            })
            .then((response) => {
                const res = response.data[0];
                this.url = res.picture;
                this.my_comment = res.my_comment;
                this.array_check.splice(0, 5, res.can_list , res.can_good, res.can_comment, res.can_see, res.can_top);
                this.show_checked = true;
            })


        }


    }

    imgSelect(num: number) {
        console.log(num);


            switch(num) {

                case 0:
                    this.select_img_chosen = true;
                
                break;
                case 1:
                    this.select_img_chosen = false;
                break;

            }
        

    }
    
    editPicture(e: Event) {

        const  file = (<HTMLInputElement>e.target).files![0];
        this.url = URL.createObjectURL(file);

    }

    checkOn(index: number, select_num: number) {


       
            for(let i: number=0; i < 5; i++) {//ボックス一覧の表示

                switch(index) {//チェックしている番号の列

                case i:
                    //if(this.array_check[i] === 1) {//チェックしていないとき

                    this.array_check[i] = select_num;
                    

             
                break;

            }

            //console.log(this.array_check)
            
        }

        //return array_check;
        console.log(this.array_check) 

    }

    dataSend() {//databaseへ

        if(this.my_comment === "") {

            this.my_comment = 'コメントがありません。';

        }

        if(this.array_check.includes(2)) {

            alert('選択していない場所があります。');

            return;
        }

        if(!this.url.includes('http')) {//画像でないときのみ代入

            this.url = "notImg";

        } 



        const editNum = this.$route.params.editNum;
        const name = this.$store.state.username;

        const set_data = {
            username: name,
            image: this.url,
            comment: this.my_comment,
            can_list: this.array_check[0],
            show_good: this.array_check[1],
            others_comment: this.array_check[2],
            can_see: this.array_check[3],
            to_top: this.array_check[4],
        }
        
        //console.log(this.array_check);
        let method_url: AxiosRequestConfig = { //編集
            method: 'put',
            url: 'edit_update/' + editNum,
            params: set_data
        }

        if(editNum === 'new_post') {//paramsがこの文字のときは編集ではなく投稿

            method_url = {
                method: 'post',
                url: 'edit',
                params: set_data
            }
            

        } 

        this.$axios(method_url)
        .then((response) => {
            console.log(response);

            const res = response.data;

            if(res.success === "store_true") {
                console.log("success");

                this.$router.push('/myaccount/mypage/' + name);
            }
        })
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

               .img_box {

                    width: 90%;
                    background-color: rgba(187, 187, 187, 0.4);

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

        .desc {
            padding-bottom: 40px;
            font-size: 20px;
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

            button[type="submit"] {
                font-size: 30px;
                padding: 3px 20px;
                background-color: white;
                
                //float: left;
                //transform: translateX(-50%);
                
            }

        }

         

    } 

}

/*input {
    display: block;
}*/
</style>
