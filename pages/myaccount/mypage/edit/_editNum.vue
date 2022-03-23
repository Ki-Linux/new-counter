<template>
    <div id="edit">
        <form @submit.prevent="dataSend">
            <div class="img_selector" v-for="(select_name, index) in select_names" :key="select_name">
                <label>
                    <input type="radio" name="index" :value="index" @click="imgSelect(index)" :checked="index === 0">{{ select_name }}
                </label>
            </div>
            <div class="post_data">
                <div class="img_file">
                    <div class="default_img">
                        <img v-if="img_style_chosen === 1" :src="url[0]" alt="img none">
                    </div>
                    <div class="img_box">
                        <img v-if="img_style_chosen === 0" :src="url[1]" alt="img none">
                        <p v-if="img_style_chosen === 2">画像はありません</p>
                    </div>    
                    <input v-if="img_style_chosen === 0" type="file" name="picture" ref="preview" @change="editPicture" multiple="multiple">
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
                <button type="submit">{{ button_name }}</button>
            </div>
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AxiosRequestConfig } from 'axios';

@Component
export default class edit extends Vue {
    url = [require("../../../../static/Home/after_up.png"), require("../../../../static/Home/after_up.png")];//[default_img, select_img]
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
                            'カウンターで使った画像',
                            'なし'
                        ];
    img_style_chosen: number  = 0;

    mounted() {

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

        for(let i=0; i < 3; i++) {

            switch(num) {
                case i:
                    this.img_style_chosen = num;

                    if(i === 0) {
                        this.url[i] = this.$store.state.back_data[3];
                        console.log(this.url[i]);
                    }
                
                break;
            }

        }

        
        

    }
    
    editPicture(e: Event) {

        const  file = (<HTMLInputElement>e.target).files![0];
        this.url[1] = URL.createObjectURL(file);

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

        if(this.array_check.includes(2)) {

            alert('選択していない場所があります。');

            return;
        }



        const editNum = this.$route.params.editNum;

        const set_data = {
            username: 'h',
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
        })
    }

}
</script>
<style lang="scss">
#edit {

    form {

        .post_data {
            width: 40%;
            padding: 50px;
            float: left;
           
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


            .content_data {
                

                 padding: 20px 0;

            }

            button[type="submit"] {
                font-size: 30px;
                margin-top: 30px;
                padding: 3px 20px;
                background-color: rgb(219, 219, 219);
                float: left;
                transform: translateX(-50%);
                
            }
            
        }

    } 

}

/*input {
    display: block;
}*/
</style>
