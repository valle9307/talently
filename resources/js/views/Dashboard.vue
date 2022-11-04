<template>
    <alerta
        v-if="alertaGlobal.ver"
        :cerrar="alertaGlobal.cerrar"
        :texto="alertaGlobal.texto"
        :tipo="alertaGlobal.tipo"
        @cerrar-alerta="cerrarAlertaGlobal()"
    />
    <div class="card-group">
        <card
            clasesBody="px-3 py-2"
            clasesHeader="bg-white p-3"
            :header="true"
        >
            <template #header>
                <h4 class="mb-0 text-center">
                    <b>Agregar subtareas al kanban ({{ tasksTodo.length }})</b>
                </h4>
            </template>
            <template #body>
                <div v-if="loading" class="text-center">
                    <spinner tipo="dark" />
                </div>
                <div v-else>
                    <button
                        type="button"
                        class="btn text-success w-100 text-end mb-2 p-0"
                        @click="abrirModal()"
                    >
                        <iconos :icon="['fas','plus']" /> add task
                    </button>
                    <task
                        v-for="taskTodo in tasksTodo"
                        :key="taskTodo.id"
                        :task="taskTodo"
                        @edit-task="abrirModal"
                    />
                </div>
            </template>
        </card>
        <card clasesHeader="bg-white p-3" :header="true">
            <template #header>
                <h4 class="mb-0 text-center">
                    <b>Testing kanban ({{ tasksWorking.length }})</b>
                </h4>
            </template>
            <template #body>
                <div v-if="loading" class="text-center">
                    <spinner tipo="dark" />
                </div>
                <div v-else>
                    <task
                        v-for="taskWorking in tasksWorking"
                        :key="taskWorking.id"
                        :task="taskWorking"
                        @edit-task="abrirModal"
                    />
                </div>
            </template>
        </card>
        <card clasesHeader="bg-white p-3" :header="true">
            <template #header>
                <h4 class="mb-0 text-center">
                    <b>Terminadas ({{ tasksDone.length }})</b>
                </h4>
            </template>
            <template #body>
                <div v-if="loading" class="text-center">
                    <spinner tipo="dark" />
                </div>
                <div v-else>
                    <task
                        v-for="taskDone in tasksDone"
                        :key="taskDone.id"
                        :task="taskDone"
                        @edit-task="abrirModal"
                    />
                </div>
            </template>
        </card>
    </div>
    <modal v-if="verModal">
        <task-form :task="task" @close="cerrarModal()"/>
    </modal>
</template>

<script>
import { computed, onMounted,ref } from 'vue'
import { useStore } from 'vuex'

import useFormularios from '../composables/useFormularios'

import api from '../api'

import Task from '../components/tasks/Task.vue'
import TaskForm from '../components/tasks/TaskForm.vue'

export default {
    components:{ Task,TaskForm },
    setup () {
        onMounted(async () => {
            loading.value = true
            await store.dispatch('task/listTasks')
            loading.value = false
        })

         //Composables
        const store = useStore()
        const { loading,verModal } = useFormularios()

        //Data
        const alerta = ref({
            cerrar: true,
            texto: null,
            tipo: null,
            ver: false
        })
        const task = ref({
            id: null,
            description: null,
            due_date: null,
            task_status_id: 1
        })

        //Methods
        const abrirModal = (taskEdit = null) => {
            if (taskEdit) {
                task.value = taskEdit
            }
            
            verModal.value = true
        }

        const cerrarModal = () => {
            if (task.value.id) {
                store.dispatch('task/listTasks')
            }

            task.value = {
                id: null,
                description: null,
                due_date: null,
                task_status_id: 1
            }
            verModal.value = false
        }

        return {
            loading,
            verModal,
            alerta,
            task,
            abrirModal,
            cerrarModal,
            cerrarAlertaGlobal: () => store.commit('alerta/RESETEAR_ALERTA'),
            alertaGlobal: computed(() => store.state.alerta.alertaGlobal),
            tasksDone: computed(() => store.getters['task/tasksDone']),
            tasksTodo: computed(() => store.getters['task/tasksTodo']),
            tasksWorking: computed(() => store.getters['task/tasksWorking'])
        }
    }
}
</script>