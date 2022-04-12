<template>
    <div id="everyone">
        <div class="set_pop" v-show="show_detail">
            <p @click="closePop">✕</p>
            <div class="profile_detail" v-if="detail_contents === 'profile'">
                <ul v-for="(detail_profile, index) in details_profile" :key="index">
                    <li v-if="index === 1"><img :src="detail_profile" alt="img"></li>
                    <li v-else>{{ detail_profile }}</li>
                </ul>
            </div>
            <div class="list_detail" v-else>
                <ul>
                    <li><img :src="details_list.picture" alt="写真"></li>
                    <li>{{ details_list.my_comment }}</li>
                    <li><img :src="my_icon" alt="not_img"></li>
                </ul>
            </div>
        </div>
        <div class="everyone_list_my_name"  v-show="!show_detail">
            <div class="profile_list my_profile">
                <profile_data :can_click="true" :from_contents="true" @send_data="detailData" @to_contents_img="contentsImg"/>
            </div>
            <div class="profile_list everyone">
                <everyone_list @detail_data_show="listDetail"/>
            </div>
        </div>        
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import everyoneList from '../../../components/mypage/everyone_list.vue';
import profileData from '../../../components/mypage/profile.vue';

@Component({
    components: {
        'everyone_list': everyoneList,
        'profile_data': profileData
    }
})
export default class everyone extends Vue {
    details_profile: string[] = [];
    details_list: { picture: string, my_comment: string, username: string } = { picture: '', my_comment: '', username: '' };
    username: string = "";
    show_detail: boolean = false;
    detail_contents: string = "";
    my_icon: string = "";

    mounted() {
        this.username = this.$store.state.username;
    }

    closePop() {
        this.show_detail = false;

        this.details_profile.splice(2, 1);

    }

    contentsImg(value: string) {
        console.log(value)
        console.log('es')

        

       this.details_profile.splice(0, 0, this.username, value);
    }


    detailData() {
        console.log('ui')
        this.detail_contents = "profile";

        this.show_detail = true;

        this.$axios.get('get_comment', {
            params: {
                username: this.username,
            }
        })
        .then((response) => {
            console.log(response.data);

            const my_comment = response.data.my_comment.comment;
            this.details_profile.splice(2, 0, my_comment);

        })

    }

    listDetail(value: [boolean, { picture:string, my_comment: string, username: string }]) {

        this.detail_contents = "list";

        this.show_detail = value[0];

        this.details_list = value[1];


        this.$axios.get('get_img_good_comment', {
            params: {
                name_data: this.details_list.username
            }
        })
        .then((response) => {
            console.log(response.data.icon_data);

            const icon = response.data.icon_data;

            this.my_icon = icon[0].icon;
        })
    }

    

}
</script>
<style lang="scss">
    #everyone {

        .set_pop {
            position: fixed;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgb(193, 255, 234);
            width: 700px;
            height: 800px;

            p {
                display: inline-block;
                font-size: 30px;
                margin: 20px 30px;
                
            }

            .profile_detail {
                text-align: center;
                
                

                ul {
                    font-size: 20px;
                    list-style: none;
                    //text-align: center;
                    
                    li {
                        img {
                            //width: 30%;
                            //background-color: rgb(160, 255, 255);
                            margin-left: 50%;
                            transform: translateX(-50%);
                        }
                    }
                }
            }
        }

        .everyone_list_my_name {
            display: flex;
            padding-top: 100px;
            margin-left: 50%;
            transform: translateX(-50%);
            

            .profile_list {
                //float: left;
                //background-color: blue;
                margin-right: 30px;
            }

            .my_profile {
               margin-top: 40px;
            }
        }
    }
</style>