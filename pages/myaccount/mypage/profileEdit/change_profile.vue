<template>
    <div id="change_profile">
        <form class="edit_profile" v-if="edit_contents" @submit.prevent="goChange">
            <div class="edit_image center" v-if="change_data[0].show_data">
                <img :src="change_data[0].img_name_comment" alt="change_img">
                <input type="file" name="change_image" ref="preview" @change="changeIcon">
            </div>
            <div v-if="change_data[1].show_data" class="center">
                <input type="text" v-model="change_data[1].img_name_comment">
            </div>
            <div class="center" v-if="change_data[2].show_data">
                <textarea name="message" id="message_add" v-model="change_data[2].img_name_comment"></textarea>
            </div>
            <input class="send_change" type="submit" value="変更">
        </form>
        <div class="my_data">
            <profile_data :can_click="clickCan" @send_data="sendData" @emit_id="emitId"/>
            <div class="comment" @click="changeComment">
                <p>roppcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccp</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import profileData from '../../../../components/mypage/profile.vue';

@Component({
    components: {
        'profile_data': profileData
    }
})
export default class change_profile extends Vue {
    clickCan: boolean = true;
    edit_contents: boolean = false;
    //show_image: boolean = false;
    //show_text: boolean = false;
    //show_textarea: boolean = false;
    //edit_img: string = require("../../../../static/profile/default_img.png");
    send_userId: number = 0;
    change_data = [
        { 
            show_data: false,//img
            img_name_comment: require("../../../../static/profile/default_img.png"),  
            judge_number: 1
        },
        {
            show_data: false,//name
            img_name_comment: "",  
            judge_number: 2
        },
        {
            show_data: false,//comment
            img_name_comment: "",  
            judge_number: 3
        },
    ];
    //change_url = require("");

    /*mounted() {

        const url = this.change_data[0].img_name_comment;

        this.change_url = require(url);

    }*/

    sendData(value: string) {
        console.log(value);
        this.edit_contents = true;
        this.change_data[2].show_data = false;

       // this.edit_img = require(value);
       if(value === "img") {

            this.change_data[0].show_data = true;
            this.change_data[1].show_data = false;
            
            return;
       }

        this.change_data[1].show_data = true;
        this.change_data[0].show_data = false;



        
    }

    emitId(value: number) {
        console.log(value);
        this.send_userId = value;
    }

    changeIcon(e: Event) {
        const  file = (<HTMLInputElement>e.target).files![0];
        const file_url = URL.createObjectURL(file);
        this.change_data[0].img_name_comment = file_url;

    }

    changeComment() {

        this.edit_contents = true;
        //this.change_data[1].show_textarea = true;
       // this.show_image = false;
        //this.show_text = false;

        for(let i=0; i < 3; i++) {

            if(i === 2) {

                this.change_data[i].show_data = true;
                return;

            }

            this.change_data[i].show_data = false;

        }
        
    }

    goChange() {
        console.log('iu')


        let change_content: string = "";
        let judge_number: number = 0;

        /*if(this.show_image) {
            change_content = this.change_name;
            judge_number = 1

        } else if(this.show_text) {

        }*/

        for(let i=0; i < 3; i++) {
            if(this.change_data[i].show_data) {
                change_content = this.change_data[i].img_name_comment
                judge_number = this.change_data[i].judge_number
            }
            //return;
        }

        console.log(change_content)

        this.$axios.put('account_update/' + this.send_userId, {
            changeContent: change_content, 
            judgeNumber: judge_number,
        })
        .then((response) => {
            console.log(response);
        })


    }
}
</script>
<style lang="scss">
#change_profile {

    .edit_profile {



        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 5;
        background-color: rgba(66, 66, 66, 0.281);
        width: 40vw;
        height: 40vh;
        text-align: center;

        img {
            background-color: rgb(219, 219, 219);
            width: 130px;
            height: 130px;
            border-radius: 50%;
             
            margin: 30px auto;
        }

        .center {
            
            margin-top: 20px;

                input[type="text"] {
                    padding: 5px;
                    font-size: 30px;
                }

            
                #message_add {
                    padding: 5px;
                    height: 7rem;
                    font-size: 25px;
                }


            

            

            

        }

        .send_change {

            font-size: 20px;
            margin-top: 20px;
            padding: 5px 12px;
            background-color: whitesmoke;

        }

        

    }


    .my_data {

       
       // &:last-of-type {

        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        background-color: blue;
        padding: 20px;
        display: inline-block;

        //}
        



        
        

        .comment {

            margin: 60px auto;
            width: 300px;
            height: 20vh;
            background-color: red;
            overflow-Y: scroll;
            
            

            p {
                word-break: break-all;
                font-size: 30px;
                float: left;
                padding: 10px;
                
                
            }


        } 
    }
    

    #profile {

        margin-left: 50%;
        transform: translateX(-50%);
        padding-top: 30px;

        


    }

    
    
}

</style>
