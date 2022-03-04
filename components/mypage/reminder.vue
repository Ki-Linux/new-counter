<template>
    <div class="right_position"> 
            <div class="alerm">
                <span v-if="this.title_length !== 0">{{ title_length }}</span>
                <img src="../../static/mypage/bell2.png" alt="reminder">
                <div class="reminder_list">
                    <ul v-for="(title_list, index) in title_lists" :key="title_list.title">
                        <li @click="goDetails(index)">{{ title_list.title }}</li>
                    </ul>
                    <p>{{ detail }}</p>
                </div>
            </div>
            <button>みんなの投稿</button>
        </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class reminder extends Vue {
    title_length: number = 0;
    detail: string = "";
    title_lists: {title: string; content: string; }[] = [{ title: '', content: '' }];

    created() {//リマインダーの表示　データベースから
        
        this.$axios.post("reminder", {

            username: 'hou',
           
        })
        .then((response) => {
            console.log(response);

            const name = response.data.name

            this.title_length = name.length;// 数
            this.title_lists = name;//タイトルをリスト化する
            //console.log(name.title);
        })

    }

    goDetails(index: number) {

        this.detail = this.title_lists[index].content;

    }

}
</script>
<style lang="scss">
.right_position {
    float: right;
    
    .alerm {
        position: relative;
        float: right;
        span {
            position: absolute;
            color: white;
            background-color: red;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
           // padding: 10px;
        }
        
    }
}
</style>