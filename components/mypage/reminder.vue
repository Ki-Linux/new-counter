<template>
    <div class="right_position"> 
            <div class="alerm"> 
                <div class="alerm_button">   
                    <p @click="showYellowList"><img src="../../static/mypage/bell2.png" alt="reminder"></p>  
                    <p v-if="this.title_length !== 0">{{ title_length }}</p>    
                    <button @click="toEveryonePostPage">みんなの投稿</button>     
                </div>
                <div class="reminder_list" v-if="show_yellow">
                    <ul v-for="(title_list, index) in title_lists" :key="index">
                        <li :class="{ light_word: title_list.watched === 1 }">
                            <span @click="goDetails(index)">{{ title_list.title }}</span>  
                            <form @submit.prevent="deleteReminder(index)">
                                <button type="submit" v-if="show_dust_box"><img src="../../static/mypage/dust_box.png" alt=""></button>
                            </form>    
                        </li>    
                    </ul>
                </div>
                <div class="detail_content" v-if="show_detail">
                    <label @click="doClosed" for="">✕</label>
                    <h1>{{ selected_title }}</h1>
                    <ul>
                        <li>{{ detail }}</li>
                        <li>{{ selected_date }}</li>
                    </ul>
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
    title_lists: {id: number; title: string; content: string; watched: number; updated_at: string | null; }[] = [{ id: 0, title: '', content: '', watched: 0, updated_at: '' }];
    selected_title: string = "";
    selected_date: string | null = '';
    show_yellow: boolean = false;
    show_detail: boolean = false;
    show_dust_box: boolean = true;

    mounted() {//リマインダーの表示　データベースから

        const decide_name = this.$store.state.username;
        
        this.$axios.post("reminder", {

            username: decide_name,
           
        })
        .then((response) => {
            console.log(response);

            const name = response.data.name

            if(name.length === 0) {
                this.title_lists = [{ id: 0, title: 'お知らせはありません。', content: '', watched: 0, updated_at:''}];
                this.show_dust_box = false;
                return;
            }

            for(let i=0; i < name.length; i++) {

                if(name[i].watched === 0) {

                    this.title_length++;// 数

                }
            }

            this.title_lists = name;//タイトルをリスト化する

            //console.log(this.title_lists[1].watched);
             
            
        })

    }

    toEveryonePostPage() {
        this.$router.push('/myaccount/everyone_page/everyone');
    }

    showYellowList() {

        if(this.show_yellow === false) {

            this.show_yellow = true;
            return;

        }

         this.show_yellow = false;
        
    }

    deleteReminder(delete_num: number) {
        
        const delete_data = this.title_lists[delete_num].id;

        const can_delete_data = () => {//ゴミ箱をクリックしたときに削除する

            this.$axios.delete('delete_reminder/' + delete_data)
            .then((response) => {
                console.log(response);
            })

            location.reload();



        }

        if(confirm('削除しますか?')) {
            can_delete_data();
        }

        

    }

    goDetails(index: number) {

        const can_showed = () => {

            const list = this.title_lists[index];
            const update_id = list.id;

            console.log(list.updated_at);

            this.selected_title = list.title;
            this.detail = list.content;

            const date_list = list.updated_at;

            if(date_list !== null) {

                //日にちだけの表示
                const new_date = date_list.split('T').splice(0, 1);

                this.selected_date = new_date[0];

            } else {

                this.selected_date = date_list

            }

            //detailを表示
            this.show_detail = true;


            //既読にする
            this.$axios.put('update_reminder/' + update_id, {change_watched: 1})
            .then((response) => {
                console.log(response);
            })


        }

        if(!this.show_detail) {//詳細を開いていないときに実行できるようにする

            can_showed();

        }

        

        
    }

    doClosed() {
        this.show_detail = false;
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
             p {

                &:nth-of-type(2) {
                    
                    position: absolute;
                    color: white;
                    background-color: red;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    right: 50px;
                    margin-top: -5px;

                }

                img {
                    width: 50px;
                }
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
            //border-bottom: 3px solid rgba(82, 82, 82, 0.5);

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
            //padding: 15px 0;
            //padding: 30px;
           // margin-top: 30px;
           // border-bottom: 3px solid rgba(82, 82, 82, 0.5);
            //width: 100%;
                //border-bottom: 3px solid rgba(82, 82, 82, 0.5);

            li {

                float: left;
                padding: 15px 5px;
                width: 100%;
                border-top: 3px solid rgba(77, 77, 77, 0.8);
                border-bottom: 3px solid rgba(77, 77, 77, 0.8);
                margin-bottom: 20px;
                background-color: rgba(255, 208, 0, 0.7);
               
                //background-color: red;
                
                
                //border-bottom: 3px solid rgba(82, 82, 82, 0.5);

                //&:first-of-type {

                    //padding: 15px 0;
                    //border-bottom: 3px solid rgba(82, 82, 82, 0.5);
                    //background-color: red;

                //}
                form {
                    float: right;
                    button{
                        margin:0 10px;
                        background-color: white;

                    img {
                        //background-color: white;
                        width: 25px;
                    
                    } 
                    }
                }
                
            }
            


            .light_word {

                color: rgba(32, 32, 32, 0.5);

            }

            
        }
           
            
    }

    .detail_content {
        z-index: 10;
        position: fixed;
        width: 40%;
        height: 80%;
        background-color: rgb(206, 206, 255);
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
            padding: 40px;
        }
         
        ul li {
            margin-right: 3rem;
            &:first-of-type {
                border-bottom: 3px solid black;
                padding: 100px 0px;
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