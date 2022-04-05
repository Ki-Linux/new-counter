<template>
    <div id="choose_album">
        <all_img/>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import allSelectImg from '../../../../components/select_img/all_select_img.vue';

@Component({
    components: {
        'all_img':allSelectImg
    }
})
export default class chooseAlbum extends Vue {

}
</script>
