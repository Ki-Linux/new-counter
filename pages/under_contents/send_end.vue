<template>
    <div id="send_end">
        <div class="top_word">
            <p v-for="word in words" :key="word">{{ word }}</p>
        </div>
        <div class="back">
            <back_button/>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import backButton from '../../components/back_button/back.vue';

@Component({
    components: {
        'back_button': backButton
    }
})
export default class sendEnd extends Vue {
    words: string[] = ['お問い合わせが完了しました。', 'ありがとうございました。'];

}
</script>
<style lang="scss">
#send_end {
    text-align: center;
    font-size: 20px;

    .top_word {
        padding: 20px 0;
    }

    .back button{
        font-size: 20px;
    }
}

</style>