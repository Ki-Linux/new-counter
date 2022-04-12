<template>
    <div id="everyone">
        <div class="set_pop" v-show="show_detail">
            <p @click="closePop">✕</p>
            <div class="profile_detail detail" v-if="detail_contents === 'profile'">
                <ul v-for="(detail_profile, index) in details_profile" :key="index">
                    <li v-if="index === 1"><img :src="detail_profile" alt="img"></li>
                    <li v-else>{{ detail_profile }}</li>
                </ul>
            </div>
            <div class="list_detail detail" v-else>
                <ul class="post_contents">
                    <!--<li>{{ details_list.id }}</li>-->
                    <li><img src="../../../static/edit/hatena.png" alt="写真"></li>
                    <li>{{ details_list.my_comment }}</li>
                    <li>{{ details_list.updated_at }}</li>
                    <li><img :src="icon_point.my_icon" alt="not_img"></li>
                </ul>
                <ul class="good_and_comment">
                    <li @click="changeHeart" :class="{ change_heart_on:heart, change_heart_off:!heart }"><span>{{ icon_point.good_point }}</span></li>
                    <li><span>↓</span>コメント</li>
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
    details_list: { id: number, picture: string, my_comment: string, username: string, updated_at: string } = { id: 0, picture: '', my_comment: '', username: '', updated_at: '' };
    username: string = "";
    show_detail: boolean = false;
    detail_contents: string = "";
    icon_point: { my_icon: string, good_point: number } = { my_icon: '', good_point: 0 };
    heart: boolean = false;

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

    listDetail(value: [boolean, { id: number, picture:string, my_comment: string, username: string, updated_at: string }]) {

        this.detail_contents = "list";

        this.show_detail = value[0];

        this.details_list = value[1];


        this.$axios.get('get_img_good_comment', {
            params: {
                id_data: 22,//this.details_list.id,
                name_data: this.details_list.username,
                
            }
        })
        .then((response) => {
            console.log(response.data);

            const icon_good = response.data;

            this.icon_point.my_icon = icon_good.icon_data[0].icon;

            this.icon_point.good_point = icon_good.point_data[0].good_point;
        })
    }

    changeHeart() {
        this.heart = true;

        this.$axios.put('details_good_more/' + this.details_list.id)
        .then ((response) => {
            console.log(response);
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

            .detail {
                text-align: center;

                ul {
                    list-style: none;
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

            .profile_detail {

                ul {
                    font-size: 20px;
                    
                }
            }

            .list_detail {

                .post_contents {
                    font-size: 30px;
                    background-color: bisque;
                    padding: 40px 0;
                    margin: 0 20px;
                    li {
                        padding: 0 20px;

                        &:first-of-type {
                            
                            img {
                                width: 290px;
                            }
                        }

                        &:nth-of-type(2), &:nth-of-type(3) {
                            margin: 0 100px;
                            background-color: white;
                        }

                        &:nth-of-type(2) {
                            margin-top: 30px;
                            padding-top: 20px;
                            
                        }

                        &:nth-of-type(3) {
                            font-size: 15px;
                            padding-top: 10px;
                            padding-left: 55%;
                        }

                        &:nth-of-type(4) {

                            margin: 40px 0 0 55%;
                            
                            img {
                                width: 70px;
                                height: 70px;
                                border-radius: 50%;
                                z-index: 5;
                                background-color: rgba(0, 0, 0, 0.4);
                            }
                        }
                        
                    }
                }

                .good_and_comment {
                    .change_heart_on {
                        background: url("../../../static/list_detail/heart_color.png") left center no-repeat;
                    }

                    .change_heart_off {
                        background: url("../../../static/list_detail/heart_no_color.png") left center no-repeat;
                    }

                    li {
                        &:first-of-type {
                            
                            //background: url("../../../static/list_detail/heart_no_color.png") left center no-repeat;
                            float: left;
                            margin-left: 100px;
                            span {
                                font-size: 22px;
                                margin-left: 35px;
                                
                            }
                        }

                        

                        &:last-of-type {
                            display: inline-block;
                            font-size: 25px;
                            margin: 80px 50px 0 0;
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