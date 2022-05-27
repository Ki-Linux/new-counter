<template>
    <div id="pop_up_one" v-if="!$store.state.canClick">
        <pop_up_free class="free" v-if="store.select_plan === 'free' && store.username === ''"/>
        <pop_up_name class="name" v-else/>
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

    store: string = "";

    mounted() {

        this.store = this.$store.state;

    }

    
}
</script>
<style lang="scss">
#pop_up_one {

    width: 80%;
    position: absolute;
    background-color: rgb(255, 195, 223);
    margin: 350px 0;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
 
}
</style>