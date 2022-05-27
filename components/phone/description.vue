<template>
    <div id="phone_desc">
        <p>スマホをお使いの場合は横向きにしてください</p>
        <img src="../../static/phone/phone_200.png" alt="phone_img">
        <button @click="OkClick">OK</button>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class description extends Vue {

    OkClick() {

        if(this.$store.state.show_phone) {

            this.$store.dispatch("change_phone");

        }
        
        this.$emit('ok_click', false);
    }

}
</script>
<style lang="scss">
#phone_desc {

    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.9);
    position: fixed;
    text-align: center;
    padding: 40px;
    top: 0px;
    z-index: 5;

    p {

        font-size: 20px;
    }

    img {

        margin: 0 auto;
    }

    button {
        
        font-size: 20px;
        padding: 0 10px;
        background-color: azure;
    }

}
</style>