<template>
    <div id="profile">
        <div class="profile_name_img">
            <p @click="editImgName(img_data)"><img :src="img_data" alt=""></p>
            <p @click="editImgName('name')">name</p>
        </div>   
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class profile extends Vue {
    img_data: string = require("../../static/profile/default_img.png");

    

    @Prop()
    public can_click!: boolean;

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