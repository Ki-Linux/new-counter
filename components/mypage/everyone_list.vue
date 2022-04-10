<template>
    <div id="everyone_list">
        <p>閲覧リスト</p>
        <div id="show_list" v-for="content_array in contents_array" :key="content_array.picture">
            <ul>
                <li><img :src="content_array.picture" alt="写真"></li>
                <li>{{ content_array.my_comment }}</li>
                <li>{{ content_array.username }}</li>
            </ul>          
        </div>
        <p @click="nextContents">↓</p>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class everyone_list extends Vue {
    contents_array: { picture:string, my_comment: string, username: string }[]
                     = [];

    contents_num: number = 1;

    public getContents = (num: number) => {

        this.$axios.get('pull_all', {
            params: {
                contents_num: num,
            }
        })
        .then((response) => {
            console.log(response);
            const all_data = response.data.allData;

            for(let i=0; i < all_data.length; i++) {

                let push_item = { picture: all_data[i].picture,  my_comment: all_data[i].my_comment,  username: all_data[i].username};

                this.contents_array.push(push_item);

            }

  
        })
        .catch((error) => {
            console.log(error);
        })

    }

    created() {

        this.getContents(1);


        

        console.log('in')

    }

    nextContents() {

        this.contents_array.splice(0, 4);

        const multiplication_num = this.contents_num * 4;

        this.getContents(multiplication_num);


        this.contents_num++;



    }
}
</script>
<style lang="scss">
    #everyone_list {
        p {
            font-size: 30px;
            margin: 20px 0 0 70px;
        }

        #show_list {

            ul {

                list-style: none;

                li:first-of-type {

                    
                    
                }


            }

        }
    }
</style>