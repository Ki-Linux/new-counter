<template>
    <div id="everyone">
        <div class="set_pop" v-show="show_detail">
            <p @click="closePop">✕</p>
            <div class="profile_detail">
                <ul v-for="(detail_profile, index) in details_profile" :key="index">
                    <li v-if="index === 1"><img :src="detail_profile" alt="img"></li>
                    <li v-else>{{ detail_profile }}</li>
                </ul>
            </div>
        </div>
        <div class="everyone_list_my_name"  v-show="!show_detail">
            <div class="profile_list my_profile">
                <profile_data :can_click="true" :from_contents="true" @send_data="detailData" @to_contents_img="contentsImg"/>
            </div>
            <div class="profile_list everyone">
                <everyone_list/>
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
    username: string = "";
    show_detail: boolean = false;

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

    

}
</script>
<style lang="scss">
    #everyone {

        .set_pop {
            position: fixed;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            background-color: aquamarine;
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
                            width: 30%;
                            background-color: aqua;
                            margin-left: 50%;
                            transform: translateX(-50%);
                        }
                    }
                }
            }
        }

        .everyone_list_my_name {
            .profile_list {
                float: left;
            }

            .everyone {
                
            }
        }
    }
</style>