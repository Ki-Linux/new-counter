<template>
    <div id="profile">
        <div class="profile_name_img">
            <!--<p @click="editImgName('img')"><img :src="img_data" alt="nothing img"></p>-->
            <p @click="editImgName('img')"><img :src="img_data" alt="nothing img"></p>
            <p @click="editImgName('name')">{{ send_username }}</p>
        </div>   
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class profile extends Vue {
    img_data = require("../../static/profile/default_img.png");
    send_username: string = "";

    //@Prop()
    //public img_data!: string;

    @Prop()
    public can_click!: boolean;

   

    created() {
        console.log(this.$store.state.username);

        //const 
        this.send_username = this.$store.state.username;
    
    
        
        //setTimeout(() => {


        this.$axios.post("account", {
            accountName: this.send_username,
        })
        .then((response) => {
            console.log(response.data.img_data);

            const pull_img = response.data.img_data;


            if(pull_img[0].icon !== "not") {

                this.img_data = pull_img[0].icon;

            }
            //this.img_data = pull_img[0].icon;
            
            this.$emit('emit_id', pull_img[0]);

        });

        //},500);
        

           // if(pull_img[0].icon !== "not") {



            //}

    }

    editImgName(which_click: string) {

        const send_img_or_name = (which_send: string) => {

            this.$emit('send_data', which_send);

        }

        if(this.can_click) {

            send_img_or_name(which_click);

        }


    }
}
</script>
<style lang="scss">
    #profile {

        margin-left: 40px;
        width: 130px;



        .profile_name_img {

            img {
                background-color: rgb(219, 219, 219);
                border-radius: 50%;
                width: 100%;
                height: 130px;
                line-height: 30px;
            
            //text-align: center;
            }

            p:first-of-type {

                background-color: green;

            }

            p:nth-of-type(2) {
                font-size: 40px;
                text-align: center;
                background-color: red;
            }

        }
        
   
        
    }
</style>