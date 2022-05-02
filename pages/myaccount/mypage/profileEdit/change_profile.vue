<template>
    <div id="change_profile"> 
        <form class="edit_profile" v-if="edit_contents" @submit="goChange">
            <div class="edit_image center" v-if="change_data[0].show_data">
                <img :src="change_data[0].img_name_comment" alt="change_img">
                <input type="file" name="change_image" ref="preview" @change="changeIcon">
            </div>
            <div v-if="change_data[1].show_data" class="center">
                <input type="text" v-model="change_data[1].img_name_comment">
                <p>{{ cannot_name }}</p>
            </div>
            <div class="center" v-if="change_data[2].show_data">
                <textarea name="message" id="message_add" v-model="change_data[2].img_name_comment"></textarea>
            </div>
            <input class="send_change" type="submit" value="変更">
        </form>
        <div class="my_data_edit">
            <div class="title">
                <h1>プロフィール編集</h1>
            </div>
            <div class="my_data">
                <profile_data :can_click="clickCan" @send_data="sendData" @emit_id="emitId"/>
                <div class="comment" @click="changeComment">
                    <p>{{ change_data[2].img_name_comment }}</p>
                </div>
            </div>
            <div class="back_button">
                <back_button where_go="account"/>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import profileData from '../../../../components/mypage/profile.vue';
import backButton from '../../../../components/back_button/back.vue';
import imageCompression from 'browser-image-compression';

@Component({
    components: {
        'profile_data': profileData,
        'back_button': backButton,
    }
})
export default class change_profile extends Vue {
    clickCan: boolean = true;
    edit_contents: boolean = false;
    send_userId: number = 0;
    cannot_name: string = "";
    change_data = [
        { 
            show_data: false,//img
            img_name_comment: require("../../../../static/profile/default_img.png"),  
            judge_number: 1
        },
        {
            show_data: false,//name
            img_name_comment: this.$store.state.username,  
            judge_number: 2
        },
        {
            show_data: false,//comment
            img_name_comment: "",  
            judge_number: 3
        },
    ];
 

    sendData(value: string) {
        console.log(value);
        this.edit_contents = true;
        this.change_data[2].show_data = false;

       if(value === "img") {

            this.change_data[0].show_data = true;
            this.change_data[1].show_data = false;
            
            return;
       }

        this.change_data[1].show_data = true;
        this.change_data[0].show_data = false;



        
    }

    emitId(value:{ id: number, icon: string, comment: string }) {
        console.log(value.id);
        console.log(value.icon)
        this.send_userId = value.id;

        if(value.icon !== "not") {

            this.change_data[0].img_name_comment = value.icon;

        }
        
        this.change_data[2].img_name_comment = value.comment;
    }

    async changeIcon(e: Event) {
        //const  file = (<HTMLInputElement>e.target).files![0];
        //const file_url = URL.createObjectURL(file);
        //this.change_data[0].img_name_comment = file_url;

        const  file = (<HTMLInputElement>e.target).files![0];

        const options = {
            //MAXSIZEMB: 10,
            maxWidthOrHeight: 120, //OrHeight
            //maxHeight: 500
        }
        const compression_file = await imageCompression(file, options);


        const reader = new FileReader();

        reader.addEventListener('load', () => {

            
            this.change_data[0].img_name_comment = 'data:image/'+reader.result
            console.log(this.change_data[0])
        })

        
        reader.readAsDataURL(compression_file);

    }

    changeComment() {

        this.edit_contents = true;

        for(let i=0; i < 3; i++) {

            if(i === 2) {

                this.change_data[i].show_data = true;
                return;

            }

            this.change_data[i].show_data = false;

        }
        
    }

    goChange() {


        let change_content: string = "";//送るデータ
        let judge_number: number = 3;//送る番号


        for(let i=0; i < 3; i++) {

            if(this.change_data[i].show_data) {//送るデータを決める

                change_content = this.change_data[i].img_name_comment
                judge_number = i

            }


            if(change_content === "") {//空欄のとき

                if(judge_number === 1) {

                    this.cannot_name = "名前が空欄です。";
                    return;
                }
                if (judge_number === 2) {

                    change_content = "コメントはありません。";

                }

            }
            
            

        }


        console.log(change_content)


        this.$axios.put('account_update/' + this.send_userId, {
            changeContent: change_content, 
            judgeNumber: judge_number,
        })
        .then((response) => {
            console.log(response.data.judge_success);

            const judge_data = response.data.judge_success;

            if(judge_data) {

                if(judge_number === 1) {

                    this.$store.dispatch("loginName", change_content);//ユーザーネームはvuex
                    

                }
                return;

            } 

            this.cannot_name = "この名前はすでにあります。";
            

        })

        



    }
}
</script>
<style lang="scss">
#change_profile {

    .title {
        text-align: center;
        padding: 30px 0;
    }

    .edit_profile {



        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 5;
        background-color: rgba(66, 66, 66, 0.8);
        padding: 50px;
        //width: 40vw;
        //height: 40vh;
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
                    font-size: 20px;
                }


            

            

            

        }

        .send_change {

            font-size: 20px;
            margin-top: 20px;
            padding: 5px 12px;
            background-color: whitesmoke;

        }

        

    }

    .my_data_edit {
        

        .my_data {

        display: inline-block;
        margin-left: 50%;
        transform: translateX(-50%);
        background-color: rgb(255, 244, 206);
        padding: 20px;
        

        



        
        

        .comment {

            margin: 60px auto;
            width: 300px;
            height: 200px;
            background-color: white;
            overflow-Y: scroll;
            
            

            p {
                word-break: break-all;
                font-size: 20px;
                float: left;
                padding: 10px;
                
                
            }


        } 

        
    }

    .back_button {
        margin: 40px;
        text-align: center;
    }

    }


    
    

    #profile {

        margin-left: 50%;
        transform: translateX(-50%);
        padding-top: 30px;

        


    }

    

    
    
}

</style>
