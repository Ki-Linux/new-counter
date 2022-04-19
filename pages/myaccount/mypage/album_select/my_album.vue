<template>
    <div id="my_album">
        <div class="back_data">
            <back_data where_go="account"/>
        </div>
        <div class="title">
            <h1>マイアルバム</h1>
        </div>
        <div class="frame">
            <div class="not_record" v-if="albums_data.length === 0">
                <p>記録はありません</p>
            </div>
            <div class="all_box" v-for="(album_data, index) in albums_data" :key="index">
                <div class="album_box" :class="{top_num: index  ===  0 || index  ===  1}">
                    <!--<p>{{ album_data }}</p>-->
                    <p class="check_batu" @click="deleteData(index)">✕</p>
                    <p class="selector">{{ album_data.selector }}</p>
                    <p class="title">{{ album_data.title }}</p>
                    <div class="img_box">
                        <img :src="'data:image/'+album_data.image" alt="not_image">
                    </div>
                    <div class="target_present">
                        <p><span>{{ album_data.present }}</span>から<span>{{ album_data.target }}</span>達成!!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import backData from '../../../../components/back_button/back.vue';

@Component({
    components: {
        'back_data': backData
    }
})
export default class my_album extends Vue {
    albums_data: { 
        id: number;
        title: string; 
        image: string; 
        selector: string;
        target: string; 
        present: string; 
    }[] = [];

    mounted() {

        const name = this.$store.state.username;

        this.$axios.get('my_album_data_get', {
            params: {
                username: name
            }
        })
        .then((response) => {
            //console.log(response);

            const album_content = response.data.album_content;
            console.log(album_content);

            for(let i=0; i < album_content.length; i++) {

                if(album_content[i].selector === "＞") {//アップかダウンに変える

                    album_content[i].selector = "アップ"

                } else {

                    album_content[i].selector = "ダウン"

                }

               // album_content[i].image = album_content[i].image);

                this.albums_data.splice(i, 0, album_content[i]);

            }

            //console.log(this.albums_data)
            
        })

    }

    deleteData(del_num: number) {

        const delete_id = this.albums_data[del_num].id;
        //console.log(delete_id)

        const can_delete_data = (id: number) => {

            this.$axios.delete('delete_album_data/' + id)
            .then((response) => {
                console.log(response);

                const can_delete = response.data.can_delete;

                if(can_delete) {
                    //console.log('success')
                    location.reload();

                }
            })

        }

        if(confirm('この記録を削除しますか?')) {
            can_delete_data(delete_id);
        }

        

    }

}
</script>
<style lang="scss">



    #my_album {
            width: 900px;
            background-color: bisque;
            margin: 20px auto;
            text-align: center;
            padding-bottom: 50px;

        .back_data {
            float: left;
            padding: 20px 0 0 20px;
        }

        .title h1 {
            padding: 80px 0 30px 0;
            
        }

        .frame {
            width: 700px;
            //height: 400px;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;

            .not_record {
               margin-left: 50%;
               transform: translateX(-50%);
            }
        }

        .all_box {
            width: 50%;
            border-left: 1px solid red;

            .check_batu {
                cursor: default;
                float: left;
                margin: 8px 0 0 13px;
                //background-color: aqua;
            }

            .selector {
                float: right;
                padding:10px 20px 0 0;
            }

            .title {
                padding-top: 40px;
                font-size: 23px;
            }

            .img_box {

                margin:20px 0 0 60%;
                transform: translateX(-55%);
                img {
                    width: 60%;//200px
                    
                    background-color: rgba(0, 0, 0, 0.1);
                }
            }

            .album_box {
                
                //border-bottom: 1px solid red;
                width: 350px;
                background-color: rgba(255, 255, 255, 0.6);
                height: 400px;
                //border-left: 1px solid red;
                border-bottom: 1px solid red;
                border-right: 1px solid red;

                .target_present {
                    padding-top: 40px;
                    p {
                        font-size: 25px;
                        

                        span {
                            font-size: 40px;
                            letter-spacing: 3px;
                        }
                    }
                }
            }

            .top_num {
               border-top: 1px solid red;
            }

        }
        

        

        
    }

</style>