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
        img {
            background-color: red;
            border-radius: 50%;
            width: 130px;
            height: 130px;
            line-height: 30px;
            text-align: center;
        }
    }
</style>