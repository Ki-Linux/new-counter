<template>
    <div id="pop_up_one" v-if="!$store.state.canClick">
        <pop_up_free v-if="$store.state.select_plan === 'free' && $store.state.username === ''"/>
        <pop_up_name v-else/>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import popUpFree from '../pop_up/complete_pop/pop_up_free.vue';
import popUpName from '../pop_up/complete_pop/pop_up_name.vue';

@Component({
    components: {
        'pop_up_free': popUpFree,
        'pop_up_name': popUpName,
    }
})
export default class popUp extends Vue {
    // v-if="$store.state.canClick === false"
    //v-if="$store.state.select_plan === 'free'"

    
}
</script>
<style lang="scss">
#pop_up_one {
 width: 80%;
 position: fixed;
background-color: rgb(255, 195, 223);
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
padding: 30px;
 
}
    

    

    
</style>