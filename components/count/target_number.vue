<template>
    <div id="target_number">
        <div class="target_present">
            <h1>目標 : {{ backTargetData }}</h1>
            <h1>現在 : {{ showData }}</h1>
        </div>
    </div> 
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class targetNumber extends Vue {
        
    get showData() {//現在のデータ　vuexから
        return this.$store.getters.showData;
    }

    get backTargetData() {//目標のデータ　vuexから
        return this.$store.getters.backTargetData;
    }
}
</script>
<style lang="scss">
#target_number {

    padding: 20px 0;
    width: 70vw;

    .target_present {
            
        margin-left: 20px;

        &:nth-of-type(2) {
            font-size: 25px;
            text-align: center;
        }
    }
}
</style>