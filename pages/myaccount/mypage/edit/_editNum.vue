<template>
    <div id="edit">
        <form @submit.prevent="dataSend">
            <div class="post_data">
                <img :src="url" alt="">
                <input type="file" name="picture" ref="preview" @change="editPicture" multiple>
                <textarea name="comment" id="" cols="30" rows="10" maxlength="200" v-model="my_comment"></textarea>
            </div>
            <div class="content_data"  v-for="(content_data, index) in contentData" :key="content_data">
                <input type="checkbox" id="check" name="selector" value="check" @change="checkOn(index)">
                <label for="check">{{ content_data }}</label>
            </div>
            <button type="submit">{{ button_name }}</button>
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AxiosRequestConfig } from 'axios';

@Component
export default class edit extends Vue {
    url = "";
    my_comment = "";
    array_check: number[] = [0, 0, 0, 0];
    //check: boolean = false;
    contentData: string[] = [
                            '他の人がいいねできるようにする', 
                            'ほかのひとがコメントできるようにする', 
                            'この投稿の閲覧数を投稿する', 
                            'このサイトのトップページに表示する(チェックすることでこの投稿をより多くの人に見てもらえます。)'
                        ];
    button_name: string = "";

    mounted() {
        if(this.$route.params.editNum === 'new_post') {

            this.button_name = "投稿";

        } else {

            this.button_name = "編集";

        }
    }
    
    editPicture(e: Event) {

        const  file = (<HTMLInputElement>e.target).files![0];
        this.url = URL.createObjectURL(file);

    }

    checkOn(index: number) {

       
            for(let i: number=0; i < 4; i++) {//ボックス一覧の表示

                switch(index) {//チェックしている番号の列

                case i:
                    if(this.array_check[i] === 1) {//チェックしていないとき

                        this.array_check[i] = 0;

                    } else {

                        this.array_check[i] = 1;

                    }
                break;

            }
            
        }

        //return array_check;

    }

    dataSend() {//databaseへ
        const editNum = this.$route.params.editNum;

        const set_data = {
            username: 'h',
            image: this.url,
            comment: this.my_comment,
            show_good: this.array_check[0],
            others_comment: this.array_check[1],
            can_see: this.array_check[2],
            to_top: this.array_check[3],
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
input {
    display: block;
}
</style>
