<template>
    <div class="right_position"> 
            <div class="alerm"> 
                <!--<span v-if="this.title_length !== 0">{{ title_length }}</span>-->
                <div class="alerm_button">   
                    <p><img src="../../static/mypage/bell2.png" alt="reminder"></p>      
                    <button>みんなの投稿</button>        
                </div>
                <div class="reminder_list">
                    <ul v-for="(title_list, index) in title_lists" :key="title_list.title">
                        <li @click="goDetails(index)">
                            {{ title_list.title }}
                            <img src="../../static/mypage/dust_box.png" alt="">
                        </li> 
                    </ul>
                </div>
                <div class="detail_content">
                    <label for="">✕</label>
                    <h1>{{ selected_title }}</h1>
                     <p>{{ detail }}</p>
                     <p>プラマイカウンター運営より</p>
                     <p>{{ selected_date }}</p>
                </div>
            </div>
        </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class reminder extends Vue {
    title_length: number = 0;
    detail: string = "";
    title_lists: {title: string; content: string; updated_at: string | null; }[] = [{ title: '', content: '', updated_at: '' }];
    selected_title: string = "";
    selected_date: string | null = '';

    created() {//リマインダーの表示　データベースから
        
        this.$axios.post("reminder", {

            username: 'hou',
           
        })
        .then((response) => {
            console.log(response);

            const name = response.data.name

            this.title_length = name.length;// 数
            this.title_lists = name;//タイトルをリスト化する

            //console.log(this.title_lists[0]);
             
            
        })

    }

    goDetails(index: number) {

        const list = this.title_lists[index];

        console.log(list.updated_at)

        this.selected_title = list.title;
        this.detail = list.content;
        this.selected_date = list.updated_at;
    }

}
</script>
<style lang="scss">
.right_position {
    //float: right;
    padding: 20px;
   text-align: right;
    

       // position: relative;
        //float: right;
        
        /*span {
            position: absolute;
            color: white;
            background-color: red;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
           // padding: 10px;
        }*/

        .alerm_button {

        
            
             //display: inline;
             p img {
                width: 50px;
             }

             button {
                font-size: 30px;
                margin-right: 20px;
                background-color: rgba(233, 233, 233, 0.7);
                padding: 3px 10px;
             }

            button, p {
                float: right;
                
 
            }
            



            
            


        

        

        

        
    }

    .reminder_list {
            position: fixed;
            margin: 70px 20px;
            right: 0;
            font-size: 20px;
            padding-right: 40px;
            background-color: yellow;
            text-align: center;

        &::before {
            content: '';
            position: absolute;
            //left: 130px; 
            right: 0;
            top: -15px;
            display: block;
            width: 0;
            height: 0;
            border-right: 25px solid transparent;
            border-bottom: 25px solid yellow;
            border-left: 35px solid transparent;
        }

        ul {

             li {

                padding-bottom: 15px;
                border-bottom: 3px solid black;

                img {
                    background-color: white;
                    width: 25px;
                    float: right;
                }
            }

            
        }
           
            
    }

    .detail_content {
        z-index: 10;
        position: fixed;
        width: 40%;
        height: 80%;
        background-color: rgba(206, 206, 255, 0.1);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px 30px;
        overflow-wrap: normal;
        text-align: left;
        

        label {
            font-size: 30px;
            position: fixed;
            right: 30px;
        }

        h1 {
            font-size: 20px;
            float: left;
            padding: 30px;
        }
         
        p {
            &:first-of-type {
            
                border-bottom: 3px solid black;
                padding: 90px 30px;
            }

            &:nth-of-type(2) {
                float: right;
            }
        }
        

    }


    button {
        float: right;
        //display: inline;
    }

}

    

        

</style>