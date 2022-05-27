<template>
    <div id="my_list">
        <div class="toeveryone">
            <nuxt-link class="everyone_page" to="/myaccount/everyone_page/everyone">
                ←みんなの投稿へ
            </nuxt-link>
        </div>
        <div class="list">
            <ul @click="detailShow(index)" v-for="(picture_data, index) in picturesData" :key="index">
                <li v-if="picture_data.picture === post_url+'notImg'"></li>
                <li v-else><img :src="picture_data.picture" alt="写真"></li>
                <li>{{ picture_data.my_comment }}</li>
                <li>{{ picture_data.created_at }}</li>
            </ul>  
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class myList extends Vue {
    picturesData: { id: number; my_comment: string; picture: string|number|ArrayBuffer; can_see: number; created_at: string }[] = [];
    post_url: string = "";

    @Prop()
    public list_username!: string;

    mounted() {//データを表示する

        const base_url = process.env.SERVER_URL;
        this.post_url = base_url + 'storage/post/'; 

        this.$axios.get("edit_show", {
            params: {
                username: this.list_username,
                target: 'list',
            }
        })
        .then((response) => {
            console.log(response.data);

            let data = response.data.contents;

            for(let i=0; i < data.length; i++) {

                const new_date = data[i].created_at.split('T').splice(0, 1);//日にちだけの表示
                data[i].created_at = new_date[0];

                const base_url = process.env.SERVER_URL;
                const url = base_url + 'storage/post/';

                data[i].picture = url + data[i].picture;

                this.picturesData.splice(i, 1, data[i]);
            }
            
        })
        .catch((err) => {
            console.log(err);
        });
    
    }

    detailShow(show_num: number) {

        let send_data: { id: number; picture: string|number|ArrayBuffer; my_comment: string; username: string;  updated_at: string; can_see: number; };

        const content = this.picturesData[show_num];

        const send_id = content.id;
        const send_picture = content.picture;
        const send_comment = content.my_comment;
        const send_day = content.created_at;
        const send_see = content.can_see;

        send_data = { id: send_id, picture: send_picture, my_comment: send_comment, username: this.list_username, updated_at: send_day, can_see: send_see};

        this.$emit('detail_data_show', [true, send_data]);

    }
}
</script>
<style lang="scss">
#my_list {
    width: 900px;
    background-color: bisque;
    margin: 20px auto;
    text-align: center;
    padding-bottom: 50px;

    .toeveryone {
        position: absolute;
        padding: 20px;

        .everyone_page {
            text-decoration: none;
            font-size: 20px;
        }
    }
}

.list {

    padding-top: 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
            
    ul {

        width: 350px;
        background-color: rgba(255, 255, 255, 0.6);
        padding-bottom: 30px;
        border: 1px solid red;
        margin-left: 20px;
        list-style: none;
                
                
        li {
            width: 80%;
            margin-left: 15px;
            
            &:first-of-type {
                margin-top: 30px;
                  
                img {
                    width: 50%;
                    max-height: 150px;
                    background-color: rgba(0, 0, 0, 0.1);
                    padding: 5px;
                    transform: translateX(50%);
                    
                }
                
            }

            &:nth-of-type(2) {
                
                margin-top: 30px;
                padding: 10px;
                background-color: white;
                word-break: break-all;
            }

        }
    }
                
}
</style>