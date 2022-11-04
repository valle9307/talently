<template>
    <card 
        :clasesCard="`mb-3 ${tipoTask} ${tareaAtrasada} border-0 shadow-sm`"
        @click="$emit('edit-task',task)"
    >
        <template #body>
            {{ task.description }}
        </template>
    </card>
    <modal v-if="verModal">
        <task-form
            :task="task"
            @close="verModal = false"
        />
    </modal>
</template>

<script>
import { computed } from 'vue'

import useFormularios from '../../composables/useFormularios'

import TaskForm from './TaskForm.vue'

export default {
    props:{
        task:{
            type: Object,
            require: true
        }
    },
    components: { TaskForm },
    emits: ['edit-task'],
    setup (props) {
        //Composables
        const { verModal } = useFormularios()

        //Computed
        const tareaAtrasada = computed(() => 
            ((props.task.task_lated) && (props.task.task_status_id !== 3)) ? 'bg-danger text-white' : ''
        )
        const tipoTask = computed(() => {
            let taskStatus = props.task.task_status.id
            let tipos = {
                1: 'bg-warning',
                2: 'bg-success text-white',
                3: 'bg-primary text-white'
            }

            return tipos[taskStatus]
        })

        return { 
            verModal,
            tareaAtrasada,
            tipoTask
        }
    }
}
</script>

<style scoped>
    .card {
        cursor: pointer;
    }    
</style>