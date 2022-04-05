<template>
    <div id="all_select_img">
        <div class="name">
            <input type="text">
        </div>
        <div class="img_box">
            <div class="show_img">
                <img :src="img_data[img_num]" alt="select_img">
            </div>
            <div class="select_img" v-for="(next_img, index_num) in next_imgs" :key="index_num">
                <button>{{ next_img }}</button>
            </div>
            <div class="img_button">
                <input type="file" name="picture" ref="preview" @change="editImg" multiple="multiple">
            </div>
            <div class="no_img">
                <button>画像なし</button>
            </div>
        </div>
        <div class="submit_button">
            <button>アルバムに追加</button>
            <nuxt-link to="">アルバムを作成しない</nuxt-link>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class chooseAlbum extends Vue {
    img_data: string[] = [require('../../../../static/edit/hatena.png')];
    img_num: number = 0;
    next_imgs: string[] = ["◀", "▶"];

    mounted() {

        const store = this.$store.state;

        const back_data = store.back_data;

        if(back_data[4] === "img") {

            if(store.select_plan === "free"){

                this.img_data.splice(0, 1, back_data[3]);

            } else {

                for(let i=0; i < store.back_select_data.length; i++) {
                    this.img_data.splice(i, 1, store.back_select_data[i]);
                }
                
            }
        } 
    
    }

}
</script>
