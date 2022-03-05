<template>
    <div id="remove">
        <button @click="removing">削除</button>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class remove extends Vue {

    removing() {
        console.log('remove');

    }

}
</script>
