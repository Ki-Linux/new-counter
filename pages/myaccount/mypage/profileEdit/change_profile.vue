<template>
    <div id="change_profile">
        <form class="edit_profile" v-if="edit_contents" @submit.prevent="goChange">
            <div class="edit_image center" v-if="show_image">
                <img :src="edit_img" alt="change_img">
                <input type="file" name="change_image" ref="preview" @change="changeIcon">
            </div>
            <div v-if="show_text" class="center">
                <input type="text">
            </div>
            <div class="center" v-if="show_textarea">
                <textarea name="message" id="message_add"></textarea>
            </div>
            <input class="send_change" type="submit" value="変更">
        </form>
        <div class="my_data">
            <profile_data :can_click="clickCan" @send_data="sendData" />
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
    show_image: boolean = false;
    show_text: boolean = false;
    show_textarea: boolean = false;
    edit_img: string = require("../../../../static/profile/default_img.png");

    sendData(value: string) {
        console.log(value);
        this.edit_contents = true;
        this.show_textarea = false;

       // this.edit_img = require(value);
       if(value === "img") {

            this.show_image = true;
            this.show_text = false;
            
            return;
       }

        this.show_text = true;
        this.show_image = false;



        
    }

    changeIcon(e: Event) {
        const  file = (<HTMLInputElement>e.target).files![0];
        const file_url = URL.createObjectURL(file);
        this.edit_img = file_url;

    }

    changeComment() {

        this.edit_contents = true;
        this.show_textarea = true;
        this.show_image = false;
        this.show_text = false;
        
    }

    goChange() {



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
