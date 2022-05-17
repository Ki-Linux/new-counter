<template> 
<div>
<h1>Hello World About</h1>
<p><input type="file" name="hoge" @change="upload"></p>
<button @click="sending">fileUpload</button>
<img src="http://127.0.0.1:8000/storage/account/heart_no_color.png" alt="">
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import imageCompression from 'browser-image-compression';

@Component
export default class It extends Vue {
    in_data: any;

    beforeMount() {
        
        console.log('go mount')
        const username = this.$store.state.username;

        //fetchUid(document.cookie, username);
        
    }

    async upload(e: Event) {
       
        const  file = (<HTMLInputElement>e.target).files![0];

        console.log(file)


        this.in_data = file;

        //console.log(in_data);

        /*const options = {
            //MAXSIZEMB: 10,
            maxWidthOrHeight: 420, //OrHeight
            //maxHeight: 500
        }
        const compression_file = await imageCompression(file, options);*/


       /* const reader = new FileReader();

        reader.addEventListener('load', () => {

           
            console.log()
        })

        
        reader.readAsDataURL(file);*/
        
    }

    sending() {
        const formData = new FormData();

        formData.append('file', this.in_data);

        console.log(formData)

        
        this.$axios.post('try_send', formData)
        .then((response)=> {
            console.log(response);
        })
    }
}
</script>