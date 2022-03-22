<template>
    <div id="back">
        <button @click="goBack">←戻る</button>
    </div>
</template>
<script lang="ts">
import { Vue,Component } from 'vue-property-decorator';

@Component
export default class backButton extends Vue {

    goBack() {

        const name = this.$store.state.username;
        this.$router.push('/myaccount/mypage/' + name);

    }
}
</script>
<style lang="scss">
#back {
    font-size: 30px;

    button {
        padding: 3px 10px;
        background-color: rgb(230, 230, 230);
    }

}

</style>
