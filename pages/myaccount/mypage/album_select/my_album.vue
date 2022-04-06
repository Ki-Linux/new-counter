<template>
    <div id="my_album">
        <div class="all_box" v-for="(ps, index) in p" :key="ps">
             <div class="album_box" :class="{top_num: index  ===  0 || index  ===  1}">
                 <p>{{ ps }}</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class my_album extends Vue {
    p: string[] = ['ui'];

}
</script>
<style lang="scss">

    #my_album {
        width: 700px;
        background-color: aqua;
        border-left: 1px solid red;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;

        .all_box {
            width: 50%;
            

            .album_box {
                
                //border-bottom: 1px solid red;
                
                height: 400px;
                border-bottom: 1px solid red;
                border-right: 1px solid red;
            }

            .top_num {
               border-top: 1px solid red;
            }

        }
        

        

        
    }

</style>