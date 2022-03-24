<template>
    <div id="pop_up_two">
        <div class="desc_and_close">
            <p @click="closed">✕</p>
            <p>ログインモードでは、カウントするごとに<br>画像を選択することもできます。</p>   
        </div>
        <div class="select_button">
            <button @click="sameGo">毎回同じ画像</button>
            <button @click="differenceGo">カウントする<br>ごとに画像を<br>選択</button>
        </div>  
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class popUpTwo extends Vue {

    closed() {

        this.$emit('pop_up_show', false);

    }

    sameGo() {

        const name = this.$store.state.username
        this.$router.push('/counterDo/optionData/' + name);
    }
    
}
</script>
<style lang="scss">
#pop_up_two {
    position: fixed;
    background-color: rgb(177, 255, 167);
    font-size: 25px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    padding: 20px 30px 30px 30px;

    .desc_and_close {
        p {
            &:first-of-type {
                float: right;
                margin-left: 10px;
                
            }

            &:nth-of-type(2) {
                padding-top: 40px;
            }
        }
    }

    .select_button {
        margin-top: 30px;
        button {
            padding: 10px 40px;
            vertical-align: middle;
            
            &:first-of-type {
                background-color: rgb(255, 185, 185);
                margin-right: 10px;
            }

            &:nth-of-type(2) {
                background-color: rgb(185, 198, 255);
                margin-right: 10px;
            }
            
        }
    }
}

</style>
