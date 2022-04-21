<template>
    <div id="everyone">
        <div class="set_pop" v-show="show_detail">
            <p @click="closePop">✕</p>
            <div class="profile_detail detail" v-if="detail_contents === 'profile'">
                <ul>
                    <li>{{ detail_profile.username }}</li>
                    <li><img :src="detail_profile.user_icon" alt="img"></li>
                    <li>{{ detail_profile.user_comment }}</li>
                </ul>
            </div>
            <div class="list_detail detail" v-else>
                <ul class="post_contents">
                    <!--<li>{{ details_list.id }}</li>-->
                    <li><img src="../../../static/edit/hatena.png" alt="写真"></li>
                    <li>{{ details_list.my_comment }}</li>
                    <li>{{ details_list.updated_at }}</li>
                    <li><img :src="'data:image/'+icon_point.my_icon" alt="not_img"></li>
                </ul>
                <ul class="good_and_comment">
                    <li @click="changeHeart" :class="{ change_heart_on:heart, change_heart_off:!heart }"><span>{{ icon_point.good_point }}</span></li>
                    <li @click="toCommentList"><span>↓</span>コメント</li>
                </ul>
                <div class="comment">
                    <ul class="comment_contents" v-for="comment_list in comment_lists" :key="comment_list.user_comment">
                        <li><img :src="'data:image/'+comment_list.user_icon" alt="icon_img"></li>
                       <li>{{ comment_list.user_comment }}</li>
                    </ul>
                    <form @submit.prevent="addComment">
                        <!--<input type="text" v-model="comment_add">-->
                        <textarea name="comment" id="" cols="30" rows="2" v-model="comment_add"></textarea>
                        <input type="submit">
                    </form>
                </div>
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
    detail_profile: { username: string, user_icon: string, user_comment: string }= { username: '', user_icon: '', user_comment: '' };
    details_list: { id: number, picture: string, my_comment: string, username: string, updated_at: string } = { id: 0, picture: '', my_comment: '', username: '', updated_at: '' };
    username: string = "";
    show_detail: boolean = false;
    detail_contents: string = "";
    icon_point: { my_icon: string, good_point: number } = { my_icon: '', good_point: 0 };
    heart: boolean = false;
    comment_lists: { user_icon: string, user_comment: string }[] = [];
    comment_add: string = "";

    mounted() {
        this.username = this.$store.state.username;
    }

    closePop() {
        this.show_detail = false;

        this.detail_profile.user_comment = "";

    }

    contentsImg(value: string) {
        console.log(value)
        console.log('es')

        
        this.detail_profile.username = this.username;
        this.detail_profile.user_icon = value;
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
            this.detail_profile.user_comment = my_comment;

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

    toCommentList() {
        //this.comment_lists.push({ user_icon:'ui', user_comment: 'io' });

        this.$axios.get('get_comment_data', {
            params: {
                id_data: 22,//どのデータか識別するため
            }
        })
        .then((response) => {
            console.log(response.data);

            const res = response.data;

            console.log(res.name_comment[1].other_comment);

            /*for(let j=0; j < res.name_icon.length; j++) {

                res.name_icon[j].username = res.name_icon[j].icon;
            
            }*/

            let img_get = "";

            for(let i=0; i < res.name_comment.length; i++) {     

                for(let j=0; j < res.name_icon.length; j++) {

                    if(res.name_comment[i].username === res.name_icon[j].username) {
                        img_get = res.name_icon[j].icon;
                    }

                    //res.name_icon[j].username = res.name_icon[j].icon;

                    //console.log(res.name_icon[j].username)
                }
                                                    /*this.detail_profile.user_icon*/
                this.comment_lists.push({ user_icon: img_get, user_comment: res.name_comment[i].other_comment });

                
            }

            

            

            console.log(this.comment_lists);
        })
    }

    addComment() {

        //UIに表示
        this.comment_lists.push({ user_icon: this.detail_profile.user_icon, user_comment: this.comment_add });

        

        this.$axios.post('add_comment_data', {

            id_data: 22,//どのデータか識別するため
            username: this.username,
            comment: this.comment_add,
            

        })
        .then((response) => {
            console.log(response.data);
  
            
        })

        this.comment_add = "";
    }

}
</script>
<style lang="scss">
    #everyone {
        padding: 20px 0;
        .set_pop {
            //position: fixed;
            
            margin-left: 50%;
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
                margin-right: 30px;

                ul {
                    font-size: 20px;

                    li {
                        padding: 30px 0;

                        &:first-of-type {
                            font-size: 30px;
                        }

                        &:nth-of-type(2) {
                            background-color: rgba(78, 78, 78, 0.3);
                            display: inline-block;
                            padding: 20px;
                        }

                        &:nth-of-type(3) {
                            margin-top: 20px;
                            background-color: azure;
                        }
                    }
                    
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

                .comment {
                    background-color: rgb(193, 255, 234);
                    padding: 30px 0;

                    .comment_contents {
                        
                        
                            
                            //@each $var in list {
                                
                            //}text-align: center;
                            /*&:first-of-type {
                                padding-top: 40px;
                            }*/
                            margin-right: 50%;
                            

                            li {
                                
                                //transform: translateX(-50%);
                               
                                &:first-of-type {
                                    
                                    background-color: aqua;
                                    //padding-left: 80px;

                                    
                                    img {
                                    float: left;
                                    //margin-top: 80px;
                                    width: 70px;
                                    height: 70px;
                                    border-radius: 50%;
                                    z-index: 5;
                                    background-color: rgba(0, 0, 0, 0.4);
                                
                                    }
                                
                                }

                                &:nth-of-type(2) {
                                    font-size: 20px;
                                    margin: 50px 0;
                                    margin-left: 230px;
                                    width: 320px;
                                    background-color: azure;
                                    padding: 20px 10px;
                                    word-break: break-all;
                                    
                                }
                            }

          
                        
                    }

                    form {
                        margin-bottom: 30px;
                        margin-left: 20px;

                        textarea {
                            padding: 5px;
                            font-size: 20px;
                            
                        }

                        input[type="submit"]{
                            position: absolute;
                            margin-top: 15px;
                            margin-left: 5px;
                            width: 60px;
                            padding: 3px;
                            font-size: 20px;
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