<template>
    <div id="everyone_list">
        <p>閲覧リスト</p>
        <button @click="nextContents('front')" v-if="contents_num !== 1">◀</button>
        <div id="show_list" v-for="(content_array, index) in contents_array" :key="index">
            <ul @click="detailDataShow(index)">
                <li><img :src="content_array.picture" alt="写真"></li>
                <li>{{ content_array.my_comment }}</li>
                <li>{{ content_array.username }}</li>
            </ul>          
        </div>
        <button @click="nextContents('back')" v-if="!delete_back_button[0]">▶</button>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class everyone_list extends Vue {
    contents_array: { id: number, picture:string, my_comment: string, username: string, updated_at: string }[]
                     = [];

    contents_num: number = 1;
    delete_back_button: boolean[] = [false];

    public getContents = (num: number) => {

        this.$axios.get('pull_all', {
            params: {
                contents_num: num,
            }
        })
        .then((response) => {
            console.log(response);

            const all_data = response.data.allData;

            //最後のときにボタンを表示させなくする
            const last_judge = response.data.last_number;
            this.delete_back_button.splice(0, 1, last_judge);


            for(let i=0; i < all_data.length; i++) {

                //日付だけ表示
                const new_date = all_data[i].updated_at.split('T').splice(0, 1);

                let push_item = { id: all_data[i].id, picture: all_data[i].picture,  my_comment: all_data[i].my_comment,  username: all_data[i].username, updated_at: new_date[0]};

                this.contents_array.push(push_item);

            }



  
        })
        .catch((error) => {
            console.log(error);
        })

    }

    created() {

        this.getContents(1);

        console.log('in')

    }

    nextContents(which_click: string) {

        this.contents_array.splice(0, 4);

        if(which_click === "front") {

            this.contents_num -= 1;

        } 

                    
        if(which_click === "back"){

            this.contents_num++;

        }


        let multiplication_num = 1;

        if(this.contents_num !== 1) {
            
            multiplication_num = this.contents_num * 4;

        }

        

        this.getContents(multiplication_num);

    }

    detailDataShow(index_num: number) {
        this.$emit('detail_data_show', [true, this.contents_array[index_num]]);
    }

}
</script>
<style lang="scss">
    #everyone_list {
        background-color: rgb(255, 202, 132);
        //margin-left: 70px;
        width: 450px;
        text-align: center;
        p {
            //text-align: center;
            font-size: 30px;
            margin-top: 20px;
            padding: 20px 0;
            //background-color: rgb(218, 238, 255);

        }

        button {
            display: inline-block;  
            background-color: white;
            font-size: 20px;
            margin: 10px 0;
            transform: rotate(90deg);
        }

        #show_list {

            ul {

                list-style: none;
                background-color: rgba(212, 255, 195, 0.6);
                font-size: 23px;
                padding: 20px;
                li {

                    &:first-of-type {
                        padding-top: 20px;
                        position: fixed;
                        //float: left;
                        img {
                            width: 90px;
                            
                            background-color: bisque;
                        }
                    }
                    
                    &:nth-of-type(2), &:nth-of-type(3) {
                        margin-left: 100px;
                        padding: 10px;

                    }

                    &:nth-of-type(2) {
                        display: inline-block;
                        width: 280px;
                        background-color: white;
                    }

                    &:nth-of-type(3) {
                        font-size: 17px;
                        margin-left: 80%;
                    }
                }


            }

        }
    }
</style>