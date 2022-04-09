<template>
    <div id="everyone">
        <div class="set_pop">
            <div class="profile_detail">
                <ul v-for="(detail_profile, index) in details_profile" :key="index">
                    <li v-if="index === 1"><img :src="detail_profile" alt="img"></li>
                    <li v-else>{{ detail_profile }}</li>
                </ul>
            </div>
        </div>
        <div class="my_profile">
            <profile_data :can_click="true" :from_contents="true" @send_data="detailData" @to_contents_img="contentsImg"/>
        </div>
        
        <everyone_list/>
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

    mounted() {
        this.username = this.$store.state.username;
    }

    contentsImg(value: string) {
        console.log(value)
        console.log('es')

       this.details_profile.splice(0, 0, this.username, value);
    }


    detailData() {
        console.log('ui')

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
        }
    }
</style>