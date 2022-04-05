<template>
    <div id="all_select_img">
        <div class="show_img" v-for="img_data in imgs_data" :key="img_data">
            <img :src="img_data" alt="select_img">
        </div>
        <div class="select_img">

        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class chooseAlbum extends Vue {
    imgs_data: string[] = [require('../../static/edit/hatena.png')];

    mounted() {

        const store = this.$store.state;

        const back_data = store.back_data;

        if(back_data[4] === "img") {

            if(store.select_plan === "free"){

                this.imgs_data.splice(0, 1, back_data[3]);

            } else {

                for(let i=0; i < store.back_select_data.length; i++) {
                    this.imgs_data.splice(i, 1, store.back_select_data[i]);
                }
                
            }
        } 
    
    }

}
</script>