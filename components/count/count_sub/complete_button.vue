
<template>
    <div id="complete_button">
        <button :class="{ Light_up: backPresentData }" @click="complete">完成</button>
    </div> 
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class completeOption extends Vue {
    it: string = "r";
    //light: boolean = false;
    get backTargetData() {//目標のデータ　vuexから
        return this.$store.getters.backTargetData;
    }
    get backPresentData() {//現在のデータ　vuexから
        if(this.$store.getters.backPresentData == this.backTargetData) {
            const light = true;
            return light
        };
    };
    complete() {
        if(this.$store.state.back_data[1] == this.$store.state.back_data[2]) {
            console.log('complete!');
        }
    }
}
</script>
<style lang="scss">
    #complete_button {
        margin-top: 80px;
        font-size: 50px;
        text-align: center;
        button {
            width: 50%;
            background-color: rgba(245, 245, 245, 0.7);
        }
        .Light_up {
            background-color: white;
        }
    }
</style>