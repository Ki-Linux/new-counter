<template>
    <div>
        <p>i</p>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Try extends Vue {
    
    mounted() {
        const name = this.$store.state.username;

        const cookie = document.cookie;

        const only_first = cookie.split('%');


        this.$axios.get('confirm_token', {
            params: {
                username: name,
                divided_back: only_first[0],
            }
            
        })
        .then((response) => {
            console.log(response.data);
            const which_num = response.data;

            if(which_num === 0) {
                console.log('yes');
            }
        })
    }
}

</script>
