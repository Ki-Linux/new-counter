<template>
    <div id="contents">
        <form v-for="(picture_data, index) in pictureData" :key="picture_data.picture">
            <p>i</p>
            <img :src="picture_data.picture" alt="picture">
            <button @click.prevent="removing(index)">削除</button>
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import removeData from '../../../../components/mypage/remove.vue';

@Component({
    components: {
        'remove_data': removeData
    }
})
export default class contents extends Vue {

    pictureData: { id: number; my_comment: string; picture: string; updated_at: string }[] = [{ id: 0, my_comment: '', picture: '', updated_at: '' }];

    created() {//データを表示する
        this.$axios.post("edit_show", {
            username: 'h',
        })
        .then((response) => {
            console.log(response.data);
            this.pictureData = response.data;
        })
    
    }

    removing(index: number) {//削除したいものを削除する
        const send_id: number = this.pictureData[index].id;

        this.$axios.delete("edit_del/" + send_id)
        .then((response) => {
            console.log(response);
            //this.pictureData = response.data
        })

    }

}
</script>
