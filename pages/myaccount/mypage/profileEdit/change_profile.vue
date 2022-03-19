<template>
    <div id="change_profile">
        <form class="edit_profile" v-if="edit_contents">
            <div class="edit_image center">
                <img src="edit_img" alt="">
                <input type="file">
            </div>
            <div v-if="!show_text" class="center">
                <input type="text">
            </div>
            <div class="center" v-if="!show_textarea">
                <textarea name="" id="" cols="30" rows="10"></textarea>
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
    show_text: boolean = true;
    show_textarea: boolean = true;
   // edit_img: string = require("");

    sendData(value: string) {
        console.log(value);

        //this.edit_img = value;

        this.edit_contents = true;
    }

    changeComment() {
        console.log('uiddd');
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

        .center {
            
            margin-top: 20px;

            

        }

        .send_change {

            font-size: 20px;
            margin-top: 10px;
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
