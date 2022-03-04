<template>
    <div id="edit">
        <form>
            <input type="file" name="picture" ref="preview" @change="editPicture" required>
            <img :src="url" alt="">
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class edit extends Vue {
    url = "";
    
    editPicture(e: Event) {

        const  file = (<HTMLInputElement>e.target).files![0];
        this.url = URL.createObjectURL(file);

    }

}
</script>
