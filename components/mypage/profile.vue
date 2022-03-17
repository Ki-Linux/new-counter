<template>
    <div id="profile">
        <img src="../../static/mypage/bell2.png" alt="">
        <p>name</p>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class profile extends Vue {
    it: string = "";
}
</script>
<style lang="scss">
    #profile {

        margin-left: 40px;
        width: 130px;
        
   
        img {
            background-color: rgb(219, 219, 219);
            border-radius: 50%;
            width: 100%;
            height: 130px;
            line-height: 30px;
            
            //text-align: center;
        }

        p {
            font-size: 30px;
            text-align: center;
            
            

        }
    }
</style>