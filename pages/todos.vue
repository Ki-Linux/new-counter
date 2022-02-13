<template>
    <div>
        <ul>
            <li v-for="todo in todos" v-bind:key="todo.text">
                <input type="checkbox" @change="toggle(todo)">
                <span>{{ todo.text }}</span>
            </li>
        </ul>
        <input placeholder="タスクを追加" @keyup.enter="addTodo">
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    computed: {
        todos () {
            return this.$store.state.todos.list
        }
    },
    methods: {
        addTodo(e) {
            this.$store.commit('todos/add', e.target.value)
        },
        ...mapMutations({
            toggle: 'todos/toggle'
        })
    }
}
</script>