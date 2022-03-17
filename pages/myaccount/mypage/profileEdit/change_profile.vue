<template>
    <div id="change_profile">
        <profile_data/>
        <p>r</p>
        <form class="edit">
            <input type="file">
            <input type="text">
            <textarea name="" id="" cols="30" rows="10"></textarea>
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import profileData from '../../../../components/mypage/profile.vue';

@Component({
    components: {
        'profile_data': profileData
    }
})
export default class change_profile extends Vue {

}
</script>
<style lang="scss">
#change_profile {

    padding-top: 50px;
    

    #profile {

        margin-left: 50%;
        transform: translateX(-50%);
        padding-top: 30px;

        


    }

    
    
}

</style>
