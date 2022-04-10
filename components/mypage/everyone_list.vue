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
        <p>↓</p>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class everyone_list extends Vue {
    contents_array: { picture:string, my_comment: string, username: string }[]
                     = [{ picture: '', my_comment: '', username: '' }];

    contents_num: number = 1;

    created() {


        this.$axios.get('pull_all', {
            params: {
                contents_num: 0,
            }
        })
        .then((response) => {
            console.log(response);
            const all_data = response.data.allData;

            for(let i=0; i < all_data.length; i++) {

                let push_item = { picture: all_data[i].picture,  my_comment: all_data[i].my_comment,  username: all_data[i].username};

                this.contents_array.push(push_item);

            }

            this.contents_array.splice(0, 1);

            
        })
        .catch((error) => {
            console.log(error);
        })

        console.log('in')

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