<template>
    <div id="free_login">
        <div class="label">
            <top_label/>           
        </div>
        <div class="pop_up">
            <pop_up/>
        </div>
        <div class="contents">
            <div class="over">
                <target_number/>
            </div>
            
            <div class="under">
                <bord_up/>
                <calculation/>
            </div>    
        </div>
        
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import topLabel from '@/components/count/top_label.vue';
    import targetNumber from '@/components/count/target_number.vue';
    import BordUp from '@/components/count/bord_up.vue';
    import calculations from '@/components/count/calculation_complete.vue';
    import popUp from '../../../components/pop_up/pop_up_one.vue';

    @Component({
        components: {
            'top_label': topLabel,
            'target_number': targetNumber,
            'bord_up': BordUp,
            'calculation': calculations, 
            'pop_up': popUp,
        }
    })
    export default class free_up extends Vue {
        up_home: string[] = ["free"];//to prop "free"はフリープランかログインプランかの判定
        setting: [string, number, number, string] = ["", 0, 0, ""];
        only_number: number[] = [0, 0];

        
        /*mounted(): void {
            this.setting = JSON.parse(localStorage.getItem('set_JSON') || '');
  
            //console.log("json call");
            this.only_number.splice(0, 2, this.setting[1], this.setting[2]);
        }*/
        /*mounted() {
            const so = JSON.parse(localStorage.getItem('set_JSON') || '');
            //this.$store.dispatch("born_JSON", so);
            console.log('it');
        }*/
    }
</script>
<style lang="scss">
    html {
        background-color: white;
    }

    #free_login .pop_up {

        padding-top: 5px;

    }

    .contents .over,.under {
        display: flex;
    }
</style>