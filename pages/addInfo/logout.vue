<template>
    <div id="logout">
        <form @submit="actionLogout">
            <button type="submit">ログアウトする</button>
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class logout extends Vue {

    actionLogout() {
        console.log('do logout');
    }

}
</script>
<style lang="scss">
#logout {

    text-align: center;
    padding-top: 40px;
    font-size: 20px;

    form button {
        background-color: white;
    }

    
}
</style>