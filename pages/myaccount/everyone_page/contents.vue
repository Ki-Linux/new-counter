<template>
    <div id="everyone">
        <div class="set_pop" v-show="show_detail">
            <p @click="closePop">✕</p>
            <div class="profile_detail detail" v-if="detail_contents === 'profile'">
                <ul>
                    <li>{{ detail_profile.username }}</li>
                    <li><img :src="detail_profile.user_icon" alt="img"></li>
                    <li v-if="detail_profile.user_comment !== 'コメントはありません。'">{{ detail_profile.user_comment }}</li>
                </ul>
            </div>
            <div class="list_detail detail" v-else>
                <ul class="post_contents">
                    <!--<li>{{ details_list.id }}</li>'data:image/'+-->
                    <li><img :src="details_list.picture" alt="写真"></li>
                    <li>{{ details_list.my_comment }}</li>
                    <li>{{ details_list.updated_at }}</li>
                    <li><img :src="icon_point.my_icon" alt="not_img"></li>
                </ul>
                <ul class="good_and_comment">
                    <li v-show="show_heart" @click="changeHeart" :class="{ change_heart_on:heart, change_heart_off:!heart }"><span>{{ icon_point.good_point }}</span></li>
                    <li v-show="show_comment" @click="toCommentList"><span>↓</span>コメント</li>
                </ul>
                <div class="comment" v-if="show_comment_list">
                    <ul class="comment_contents" v-for="comment_list in comment_lists" :key="comment_list.user_comment">
                        <li><img :src="comment_list.user_icon" alt="icon_img"></li>
                        <li>{{ comment_list.date }}</li>
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
    detail_profile: { username: string, user_icon: string|ArrayBuffer|null, user_comment: string }= { username: '', user_icon: '', user_comment: '' };
    details_list: { id: number, picture: string|ArrayBuffer|null, my_comment: string, username: string, updated_at: string } = { id: 0, picture: '', my_comment: '', username: '', updated_at: '' };
    username: string = "";
    show_detail: boolean = false;
    detail_contents: string = "";
    icon_point: { my_icon: string, good_point: number } = { my_icon: '', good_point: 0 };
    show_heart: boolean = true;//ハートを表示するかしないか
    heart: boolean = false;//ハートを色つける
    comment_lists: { user_icon: string|ArrayBuffer|null, user_comment: string, date: string }[] = [];
    comment_add: string = "";
    show_comment: boolean  = false;//そもそもコメントを表示するかしないか
    show_comment_list: boolean  = false;//コメントリストを表示する
    

    mounted() {
        this.username = this.$store.state.username;
    }

    closePop() {
        this.show_detail = false;

        this.detail_profile.user_comment = "";

        this.comment_lists = [];
        this.show_heart = true;
        this.heart = false;
        this.show_comment = false;//そもそもコメントを表示するかしないか
        this.show_comment_list = false;//コメントリストを表示する

        //location.reload();

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

            let my_comment = response.data.my_comment.comment;

            if(my_comment === "") {
                my_comment = "コメントはありません。";
            }

            this.detail_profile.user_comment = my_comment;

        })

    }

    listDetail(value: [boolean, { id: number, picture:string|ArrayBuffer|null, my_comment: string, username: string, updated_at: string }]) {

        this.detail_contents = "list";

        this.show_detail = value[0];

        this.details_list = value[1];


        this.$axios.get('get_img_good_comment', {
            params: {
                id_data: this.details_list.id,//this.details_list.id,
                name_data: this.details_list.username,
                
            }
        })
        .then((response) => {
            console.log(response.data);

            const icon_good_comment = response.data;

            this.icon_point.my_icon = icon_good_comment.icon_data[0].icon;

            if(icon_good_comment.point_data.length === 0) {
                this.show_heart = false;
                return;
            }

            this.icon_point.good_point = icon_good_comment.point_data[0].good_point;

            const which_comment = icon_good_comment.which_comment[0].can_comment;

            if(which_comment === 1) {
                this.show_comment = true;
            }
        })
    }

    changeHeart() {

        const plus_one = (id: number) => {
            this.$axios.put('details_good_more/' + id)
            .then ((response) => {
                console.log(response);
            })
        }


        if(this.heart === false) {
            this.heart = true;
            plus_one(this.details_list.id)
        }
        

        


        

    }

    toCommentList() {
        //this.comment_lists.push({ user_icon:'ui', user_comment: 'io' });

        /*if(this.show_comment_list === true) {
            return;
        } */
        
        const listShow = (id: number) => {

            this.$axios.get('get_comment_data', {
            params: {
                id_data: id,//どのデータか識別するため
            }
        })
        .then((response) => {
            console.log(response.data);

            const res = response.data;

            if(res.name_comment.length === 0) {
                return;
            }

            console.log(res);

            /*for(let j=0; j < res.name_icon.length; j++) {

                res.name_icon[j].username = res.name_icon[j].icon;
            
            }*/

            let comment_name_icon = [{other_comment: '', username: '', icon: '', updated_at: '' }]

            for(let i=0; i < res.name_icon.length; i++) {
            
                for(let j=0; j < res.name_comment.length; j++) {  
                    
                    comment_name_icon.splice(j, 1, res.name_comment[j]);
                    
                    if(comment_name_icon[j].username === res.name_icon[i].username) {
                        comment_name_icon[j].icon = res.name_icon[i].icon;
                        
                    }

                
                    
                    /*if(res.name_comment[i].username === res.name_icon[j].username) {
                        img_get = res.name_icon[j].icon;
                    }*/

                    //res.name_icon[j].username = res.name_icon[j].icon;

                    //console.log(res.name_icon[j].username)
                }
                                                    /*this.detail_profile.user_icon*/
               // this.comment_lists.push({ user_icon: img_get, user_comment: res.name_comment[i].other_comment });

                
            }

            let written_date
            let written_time
            let hour_split
            let hour
            let minute


            for(let i=0; i < comment_name_icon.length; i++) {

                let T_split = comment_name_icon[i].updated_at.split(/T/)
                
                //日付
                written_date = T_split.splice(0, 1);

                //時間
                written_time = comment_name_icon[i].updated_at.split(/T/).splice(1, 1);

                hour_split = written_time[0].split(/:/)

                hour = hour_split.splice(0, 1);//時
                minute = written_time[0].split(/:/).splice(1, 1);//分

                this.comment_lists.splice(i, 1, { user_icon: 'data:image/'+comment_name_icon[i].icon, user_comment: comment_name_icon[i].other_comment, date: written_date[0] + " " + hour + ":" + minute});
            }

            
            console.log(this.comment_lists);
            

           // console.log(this.comment_lists);
        })

        }
        

        

        if(this.show_comment_list === false) {

            this.show_comment_list = true;
            listShow(this.details_list.id);

        }
    }

    addComment() {
        const now = new Date();

        const Year = now.getFullYear();
        let Month = now.getMonth() + 1;
        let Day = now.getDate();
        let Hour = now.getHours();
        let Min = now.getMinutes();

        const array_day = [String(Month), String(Day), String(Hour), String(Min)];

        for(let i=0; i < 4; i++) {

            if(array_day[i].length === 1) {
                array_day[i] = "0" + array_day[i];
            }
            
        }

        const time = Year + "-" + array_day[0] + "-" + array_day[1] + " " + array_day[2] + ":" + array_day[3];


        //UIに表示
        this.comment_lists.push({ user_icon: this.detail_profile.user_icon, user_comment: this.comment_add, date: time });

        

        this.$axios.post('add_comment_data', {

            id_data: this.details_list.id,//どのデータか識別するため
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
                                width:250px;//290px;
                                max-height: 27vh;
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

                                &:nth-of-type(3) {
                                    font-size: 20px;
                                    margin: 50px 0;
                                    margin-left: 230px;
                                    width: 320px;
                                    background-color: azure;
                                    padding: 20px 10px;
                                    word-break: break-all;
                                    
                                }

                                &:nth-of-type(2) {
                                    
                                    position: absolute;
                                    width: 50%;
                                    margin-left: 200px;
                                    padding-left: 250px;
                                    font-size: 10px;
   
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