<template>
    <div id="everyone">
        <everyone_list/>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import everyoneList from '../../../components/mypage/everyone_list.vue';

@Component({
    components: {
        'everyone_list': everyoneList
    }
})
export default class everyone extends Vue {

}
</script>
