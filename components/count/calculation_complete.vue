<template>
    <div id="calculation_complete">
        <div class="count">
            <button @click="up_down('up')">▲</button>
            <button @click="up_down('down')">▼</button>
            <button v-if="$store.state.first_data != $store.state.back_data[2]" @click="addCount('back_first')">
                数字を初期値にする
            </button>
        </div>
        <div class="complete">
            <complete_button/>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import complete_buttons from './count_sub/complete_button.vue';

    @Component({
        components: {
            'complete_button': complete_buttons
        }
    })
    export default class calculationComplete extends Vue {

        up_down(selection: string) {//increase number

            const countUpDown = (select: string) => {

                this.$store.dispatch("UpDownNumber", [select, true]);//+-1 　freeプラン以外のときに+-1ではなく選択肢表示

            }

            const state_data = this.$store.state;

            const data_zero = state_data.back_data[0];
            const data_one = state_data.back_data[1];
            const data_two = state_data.show_data[0];


            if(data_zero ===  "＞" && data_one > data_two) {//UP

                countUpDown(selection);
                    
            } 
            
            if(data_zero ===  "＜" && data_one < data_two){//DOWN

                countUpDown(selection);
                
            }

        }

        addCount(selection: string) {//data reset with vuex

            if(this.$store.state.canClick && confirm("数字をリセットしますか？")) {

                this.$store.dispatch("UpDownNumber", selection);
                
            }

        }
    }
</script>
<style lang="scss">
    #calculation_complete {
        
        width: 30vw;
        background-color: rgba(255, 0, 0, 0.253);
        padding-top: 50px;
        
        input {

            display: block;
            margin: 0 auto;
            width: 50%;

            &:first-of-type {
                font-size: 50px;
            }

            &:nth-of-type(2) {
                font-size: 16px;
            }
            
        }
        
    }
</style>