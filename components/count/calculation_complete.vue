<template>
    <div id="calculation_complete">
        <div class="count">
            <button @click="up_down('up')">▲</button>
            <button @click="up_down('down')">▼</button>
           <!-- <input type="number" @change="changeNumber($store.state.back_data[2])" :value="$store.state.back_data[2]" min="0" max="10" step="1">-->
            <button v-if="$store.state.first_data != $store.state.back_data[2]" @click="addCount('back_first')">数字を初期値にする</button>
        </div>
        <div class="complete">
            <complete_button/>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import complete_buttons from './count_sub/complete_button.vue';
    import { mapState } from 'vuex';
    @Component({
        components: {
            'complete_button': complete_buttons
        }
    })
    export default class calculationComplete extends Vue {

        up_down(selection: string) {//increase number
            if(this.$store.state.back_data[0] ==  "＞" && this.$store.state.back_data[1] > this.$store.state.back_data[2]) {//UP
                    this.$store.dispatch("UpDownNumber", selection);
            } 
            
            if(this.$store.state.back_data[0] ==  "＜" && this.$store.state.back_data[1] < this.$store.state.back_data[2]){//DOWN
                this.$store.dispatch("UpDownNumber", selection);
            }
            
            /*this.$store.dispatch("UpDownNumber", selection);*/
            //console.log('t');
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