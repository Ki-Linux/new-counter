<template>
<div>
<h1>Hello World About</h1>
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { confirm } from '@/components/confirmation/confirm_person';

@Component({
    middleware: 'reject'
})
export default class It extends Vue {

    beforeMount() {
        
        console.log('go mount')
        const username = this.$store.state.username;
        confirm(username);

        //fetchUid(document.cookie, username);
        
    }
}
</script>