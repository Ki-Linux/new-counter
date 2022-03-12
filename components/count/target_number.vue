
  
<template>
    <div id="target_number">
        <div class="target_present">
            <h1>目標 : {{ backTargetData }}</h1>
            <h1>現在 : {{ backPresentData }}</h1>
            <!--<p>{{ $store.state.back_data }}</p>
            <p>{{ backPresentData }}</p>
            <p>{{ backTargetData }}</p>-->
        </div>
    </div> 
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class targetNumber extends Vue {
        get backPresentData() {//現在のデータ　vuexから
            return this.$store.getters.backPresentData;
        };
        get backTargetData() {//目標のデータ　vuexから
            return this.$store.getters.backTargetData;
        }
        /*show_numbers: { item: string; set_number: number; }[] = [
            { item: "目標", set_number: this.backTargetData },
            { item: "現在", set_number: this.backPresentData },
        ];*/
        //created(): void {
   
                /*for(let i=0; i < 2; i++) {*/
                    //this.show_numbers[0].set_number = this.$store.state.back_data[1];
        /*this.$store.state.back_data.watch(
            (state: any, getters: any) => getters.status,
            () => {
                this.show_numbers[1].set_number = state.back_data;
            }
            }
        )*//*("$store.state.back_data[2]") 
        targetNumberChanged(): void {
            this.show_numbers[1].set_number = 5;
        }*/
                
            //console.log(set_number);
       // }
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