<template>
    <div id="my_album">
        <div class="title">
            <h1>マイアルバム</h1>
        </div>
        <div class="frame">
            <div class="all_box" v-for="(ps, index) in p" :key="ps">
                <div class="album_box" :class="{top_num: index  ===  0 || index  ===  1}">
                    <p>{{ ps }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class my_album extends Vue {
    p: string[] = ['ui', 'po', 'yu'];

}
</script>
<style lang="scss">



    #my_album {
            width: 900px;
            background-color: bisque;
            margin: 20px auto;
            text-align: center;
            padding-bottom: 50px;

        .title h1 {
            padding: 30px 0;
            
        }

        .frame {
            width: 700px;
            //height: 400px;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
        }

        .all_box {
            width: 50%;
            border-left: 1px solid red;
            .album_box {
                
                //border-bottom: 1px solid red;
                width: 350px;
                background-color: aqua;
                height: 400px;
                //border-left: 1px solid red;
                border-bottom: 1px solid red;
                border-right: 1px solid red;
            }

            .top_num {
               border-top: 1px solid red;
            }

        }
        

        

        
    }

</style>