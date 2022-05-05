<template>
    <div id="everyone">
        <div class="delete_tell_pop" v-if="show_select_del_or_tell">
                <p @click="closeSelect">✕閉じる</p>
                <button @click="deleteReport('delete')" v-if="deleteMyComment">削除する</button>
                <button @click="deleteReport('report')">報告する</button>
            </div>
        <div class="set_pop" v-show="show_detail">
            <p @click="closePop">✕</p>
            <div class="see_and_edit" v-if="username === details_list.username">
                <p v-if="details_list.can_see === 1">
                   閲覧数:{{ view_point }}
                </p>
                <p v-else>no views</p>
                <div class="edit_delate">
                    <button @click="EditDelete('edit')">編集する</button>
                    <button @click="EditDelete('delete')">削除する</button>
                </div>
            </div>
            <div class="profile_detail detail" v-if="detail_contents === 'profile'">
                <ul>
                    <li>{{ detail_profile.username }}</li>
                    <li><img :src="detail_profile.user_icon" alt="img"></li>
                    <li v-if="detail_profile.user_comment !== 'コメントはありません。'">{{ detail_profile.user_comment }}</li>
                    <li @click="toOneAccountListPage(detail_profile.username)"><button>投稿</button></li>
                </ul>
            </div>
            <div class="list_detail detail" v-else>
                <p @click="deleteOrTell('post_report')" v-if="$route.params.contents === 'everyone'">…</p>
                <ul class="post_contents">
                    <li v-if="details_list.picture === 'data:image/notImg'">写真はありません</li>
                    <li v-else><img :src="details_list.picture" alt="写真"></li>
                    <li>{{ details_list.my_comment }}</li>
                    <li>{{ details_list.updated_at }}</li>
                    <li @click="detailData('other')" v-if="$route.params.contents === 'everyone'"><img :src="icon_point.my_icon" alt="not_img"></li>
                    <li @click="detailData('other')" v-if="$route.params.contents === 'everyone'">{{ icon_point.my_icon }}</li>
                </ul>
                <ul class="good_and_comment">
                    <li v-show="show_heart" @click="changeHeart" :class="{ change_heart_on:heart, change_heart_off:!heart }"><span>{{ icon_point.good_point }}</span></li>
                    <li v-show="show_comment" @click="toCommentList"><span>↓</span>コメント</li>
                </ul>
                <div class="comment" v-if="show_comment_list">
                    <ul class="comment_contents" v-for="(comment_list, index) in comment_lists" :key="index">
                        <li @click="detailData('other_with_comment', index)"><img :src="comment_list.user_icon" alt="icon_img"></li>
                        <li @click="deleteOrTell(index)">…</li>
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
        <div class="everyone_list_my_name"  v-show="!show_detail" v-if="$route.params.contents === 'everyone'">
            <div class="profile_list my_profile">
                <profile_data :can_click="true" :from_contents="true" @send_data="detailData('me')" @to_contents_img="contentsImg"/>
                <button @click="toOneAccountListPage(username)">マイ投稿</button>
                <back_account where_go="account"/>
            </div>
            <div class="profile_list everyone">
                <everyone_list @detail_data_show="listDetail"/>
            </div>
        </div>        
        <div v-else  v-show="!show_detail">
            <my_list :list_username="$route.params.contents" @detail_data_show="listDetail"/>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import everyoneList from '../../../components/mypage/everyone_list.vue';
import myList from '../../../components/mypage/my_list.vue';
import profileData from '../../../components/mypage/profile.vue';
import backAccount from '../../../components/back_button/back.vue';
import { AxiosRequestConfig } from 'axios';

@Component({
    components: {
        'everyone_list': everyoneList,
        'profile_data': profileData,
        'my_list': myList,
        'back_account': backAccount,
    }
})
export default class everyone extends Vue {
    detail_profile: { username: string, user_icon: string|ArrayBuffer|null, user_comment: string }= { username: '', user_icon: '', user_comment: '' };
    details_list: { id: number, picture: string|ArrayBuffer|null, my_comment: string, username: string, updated_at: string, can_see: number } = { id: 0, picture: '', my_comment: '', username: '', updated_at: '', can_see: 0 };
    my_icon: string|ArrayBuffer|null = "";//自分のアイコン画像
    username: string = "";
    show_detail: boolean = false;
    detail_contents: string = "";
    icon_point: { my_icon: string, good_point: number } = { my_icon: '', good_point: 0 };
    view_point: number = 0;
    show_heart: boolean = true;//ハートを表示するかしないか
    heart: boolean = false;//ハートを色つける
    comment_lists: { username: string, user_icon: string|ArrayBuffer|null, user_comment: string, date: string }[] = [];
    comment_add: string = "";
    show_comment: boolean  = false;//そもそもコメントを表示するかしないか
    show_comment_list: boolean  = false;//コメントリストを表示する
    show_select_del_or_tell: boolean = false;
    deleteMyComment: boolean = false;//自分の名前と違ったときはfalse
    get_click_num_delete_report: number = 0;//クリックしているコメント番号を取得する
    post_report: boolean = false;//trueのとき投稿を通報する
    

    mounted() {
        this.username = this.$store.state.username;
    }

    deleteReport(which_contents: string) {

        const num = this.get_click_num_delete_report;//クリックしているコメント番号を取得する

        const list = this.comment_lists[num];

        const delete_report = (delete_or_report: string) => {

            const edit_id = this.details_list.id;

            let data_set

            if(delete_or_report === "delete") {

                data_set = {//消すとき
                    username: list.username,
                    user_comment: list.user_comment
                }

            }

                //console.log(this.array_check);
            let method_url: AxiosRequestConfig = { //delete
                method: 'delete',
                url: 'comment_delete/' + edit_id,
                params: data_set
            }

            if(delete_or_report === "report") {//通報

                let post_or_comment;
                let username;//通報される名前
                let comment;//通報するコメント

                if(this.post_report) {//投稿の通報

                    post_or_comment = '投稿';
                    username = this.details_list.username;//通報される名前
                    comment = "";//投稿なため、コメントはない
                    this.post_report = false;

                } else {//コメントの通報

                    post_or_comment = 'コメント'
                    comment = list.user_comment;
                    username = list.username;

                }

                const reported_data = {//投稿のの通報
                        id: edit_id,
                        reported_name: username,
                        user_comment: comment,
                        from_name: this.username,
                        post_or_comment: post_or_comment,
                }

                method_url = { 
                    method: 'post',
                    url: 'comment_report',
                    params: reported_data
                }

                
            }

       /*if(editNum === 'new_post') {//paramsがこの文字のときは編集ではなく投稿

            method_url = {
                method: 'post',
                url: 'edit',
                params: set_data
            }
            

        } */

            this.$axios(method_url)
            .then((response) => {
                console.log(response);

                const res_data = response.data.can_delete_or_report;

                console.log(res_data)

                if(res_data === "can_delete") {//UI上で削除
                    this.comment_lists.splice(num, 1);
                }

                

        
            })

        }

     
            delete_report(which_contents);
            this.show_select_del_or_tell = false;
        //}

    }

    closeSelect() {

        this.show_select_del_or_tell = false;//ボタンリスト初期化
        this.deleteMyComment = false;//削除ボタン初期化

    }

    closePop() {
        this.show_detail = false;

        this.detail_profile.user_comment = "";

        this.comment_lists = [];
        this.show_heart = true;
        this.heart = false;
        this.show_comment = false;//そもそもコメントを表示するかしないか
        this.show_comment_list = false;//コメントリストを表示する
        this.detail_profile.username = this.username;//name自分
        this.detail_profile.user_icon = this.my_icon;//icon自分

        //location.reload();

    }

    contentsImg(value: string) {
        console.log(value)
        console.log('es')

        
        this.detail_profile.username = this.username;
        this.detail_profile.user_icon = value;//表示される自分のアイコン
        this.my_icon = value;//保存される不変のアイコン(closeのとき用)
    }

    


    detailData(who_icon: string, icon_num: number) {
        console.log('ui')
        this.detail_contents = "profile";

        this.show_detail = true;

        let name = this.username;

        if(who_icon === "other") {
            name = this.details_list.username;
            this.detail_profile.username = name;
            this.detail_profile.user_icon = this.icon_point.my_icon;
            
        } else if(who_icon === "other_with_comment") {
            name = this.comment_lists[icon_num].username;
            this.detail_profile.username = name;
            this.detail_profile.user_icon = this.comment_lists[icon_num].user_icon;
        }

        this.$axios.get('get_comment', {
            params: {
                username: name,
            }
        })
        .then((response) => {
            console.log(response.data);

            let my_comment = response.data.my_comment.comment;

            if(my_comment === "") {
                my_comment = "コメントはありません。";
            }

            console.log(my_comment)

            this.detail_profile.user_comment = my_comment;

        })

    }

    listDetail(value: [boolean, { id: number, picture:string|ArrayBuffer|null, my_comment: string, username: string, updated_at: string, can_see: number }]) {

        this.detail_contents = "list";

        this.show_detail = value[0];

        this.details_list = value[1];


        this.$axios.get('get_img_good_comment', {
            params: {
                id_data: this.details_list.id,//this.details_list.id,
                name_data: this.details_list.username,
                my_name: this.username,
            }
        })
        .then((response) => {
            console.log(response.data);

            const icon_good_comment = response.data;

            this.icon_point.my_icon = icon_good_comment.icon_data[0].icon;
            console.log(this.icon_point.my_icon)

            this.view_point = icon_good_comment.view_data;

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

            this.$axios.put('details_good_more/' + id, {
                username: this.username,
            })
            .then ((response) => {
                console.log(response);
            })

        }


        if(this.username !== this.details_list.username && this.heart === false) {//nameが同じ時はいいねできない
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

                this.comment_lists.splice(i, 1, { username: comment_name_icon[i].username, user_icon: 'data:image/'+comment_name_icon[i].icon, user_comment: comment_name_icon[i].other_comment, date: written_date[0] + " " + hour + ":" + minute});
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
        this.comment_lists.push({ username: this.username, user_icon: this.detail_profile.user_icon, user_comment: this.comment_add, date: time });

        

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

    deleteOrTell(num_str: string|number) {

        

        if(this.show_select_del_or_tell === false) {

            this.show_select_del_or_tell = true;

            if(num_str === "post_report") {//投稿の通報
                this.post_report = true;
                return;
            }

            if(this.comment_lists[Number(num_str)].username === this.username) {//自分の番号だけ
                
                this.deleteMyComment = true;//ボタンを表示する
                this.get_click_num_delete_report = Number(num_str);

            }

        }
        
    }

    toOneAccountListPage(one_list_name: string) {//その人のアカウントの投稿ページへ

        this.$router.push("/myaccount/everyone_page/" + one_list_name);

    }

    EditDelete(project: string) {

        const id = this.details_list.id;

        if(project === "edit") {

            this.$router.push("/myaccount/mypage/edit/" + id);

        } else if(project === "delete") {

            const go_delete = (delete_id: number) => {

                this.$axios.delete("edit_del/" + delete_id)
                .then((response) => {

                    
                    //this.pictureData = response.data
                    const can_delete = response.data.can_delete
                    console.log(can_delete);

                    if(can_delete) {
                        console.log('success');

                        location.reload();

                    }
                    
                })
                .catch((response) => {
                    
                    console.log(response);

                })

                

            }

            if(confirm('削除しますか?')) {
                go_delete(id);
            }

        }
        
    }

}
</script>
<style lang="scss">
    #everyone {
        padding: 20px 0;

        .delete_tell_pop {

            position: fixed;
            margin-top: 20%;
            margin-left: 50%;
            transform: translate(-50%);
            width: 200px;
            height: 100px;
            background-color: white;
            z-index:10;
            text-align: center;

            p {
                position: fixed;
                padding: 3px;
            }

            button {
                margin: 50px 5px;

            }
        }

        .set_pop {
            //position: fixed;
 
            margin-left: 50%;
            transform: translateX(-50%);
            background-color: rgb(193, 255, 234);
            width: 700px;
            //height: 500px;

            p {

                display: inline-block;
                margin: 20px 30px;
                font-size: 30px;

            } 

            .see_and_edit {

                .edit_delate {
                    float: right;
                    margin-top: -70px;

                    button {
                        display: block;
                        font-size: 25px;
                        padding: 10px 20px;
                        margin: 10px 0;
                        margin-right: 20px;
                        background-color: rgba(255, 255, 255, 0.8);
                    }

                }
                
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

                        &:nth-of-type(4) button {
                            margin-top: 70px;
                            background-color: aliceblue;
                        }
                    }
                    
                }

                
            }

            .list_detail {

                p {
                    position: fixed;
                    font-size: 30px;
                    right: 20px;
                    padding: 0 10px;
                }


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
                            display: inline-block;
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
                                    
                                    //background-color: aqua;
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

                                &:nth-of-type(4) {
                                    font-size: 20px;
                                    margin: 50px 0;
                                    margin-left: 230px;
                                    width: 320px;
                                    background-color: azure;
                                    padding: 20px 10px;
                                    word-break: break-all;
                                    
                                }

                                &:nth-of-type(2), &:nth-of-type(3) {
                                    position: fixed;
                                    right: 110px;
                                    font-size: 10px;
                                }

                                &:nth-of-type(2) {
                                   
                                    cursor: default;
                                    font-size: 15px;
                                    padding: 0 10px;
                                    background-color: rgba(185, 185, 185, 0.7);
   
                                }

                                &:nth-of-type(3) {
                                
                                    margin-top: 3px;
                                    margin-right: 40px;
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
            

            .my_profile {
                margin-top: 20px;
                background-color: rgba(255, 213, 158, 0.4);
                padding: 30px 40px 0 0;

                button {
                    font-size: 20px;
                    margin: 20px 0 0 40px;
                    padding: 10px 22.5px;
                    background-color: rgb(255, 251, 241);
                }
            }
        }
    }
</style>