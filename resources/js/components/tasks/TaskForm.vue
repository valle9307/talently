<template>
    <form @submit.prevent="submitTask()">
        <card :footer="true" :header="true">
            <template #header>
                <h4 class="mb-0">{{ tituloCard }}</h4>
            </template>
            <template #body>
                <div class="mb-2">
                    <label>
                        Descripción <span class="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="agregar descripción"
                        v-model="task.description"
                        :disabled="loading"
                    >
                    <errores-formulario
                        v-if="errores.description"
                        :errores="errores.description"
                    />
                </div>
                <div class="mb-2">
                    <label>
                        Fecha <span class="text-danger">*</span>
                    </label>
                    <el-date-picker
                        class="w-100"
                        v-model="task.due_date"
                        type="date"
                        placeholder="agregar fecha"
                        size="large"
                        value-format="YYYY-MM-DD"
                        :disabled="loading"
                    />
                    <errores-formulario
                        v-if="errores.due_date"
                        :errores="errores.due_date"
                    />
                </div>
                <div v-if="task.id" class="mb-2">
                    <label>
                        Status <span class="text-danger">*</span>
                    </label>
                    <select
                        class="form-select"
                        :disabled="loading"
                        v-model="task.task_status_id"
                    >
                        <option :value="null">Seleccionar ...</option>
                        <option
                            v-for="{ id,name } in taskStatuses"
                            :key="id"
                            :value="id"
                        >
                            {{ name }}
                        </option>
                    </select>
                    <errores-formulario
                        v-if="errores.task_status_id"
                        :errores="errores.task_status_id"
                    />
                </div>
            </template>
            <template #footer>
                <div class="text-end">
                    <button
                        type="submit"
                        class="btn btn-success me-1"
                        :disabled="loading"
                    >
                        Guardar
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger"
                        :disabled="loading"
                        @click="$emit('close')"
                    >
                        Cancelar
                    </button>
                </div>
            </template>
        </card>
    </form>
</template>

<script>
import { computed, onMounted,ref } from 'vue'
import { useStore } from 'vuex'

import useFormularios from '../../composables/useFormularios'

import api from '../../api'

export default {
    props:{
        task: {
            type: Object,
            require: true
        }
    },
    emits: ['close'],
    setup (props,{ emit }) {
        onMounted(async () => {
            try {
                let { data } = await api.get('/task-statuses')
                let { task_statuses } = data

                taskStatuses.value = task_statuses
            } catch (error) {
                let { errors } = error.response.data

                console.error(errors)
            }
        })

        //Composables
        const store = useStore()
        const { 
            errores,
            loading,
            manejoErroresApi
         } = useFormularios()

        //Data
        const taskStatuses = ref([])

        const submitTask = async () => {
            loading.value = true
            errores.value = {}

            try {
                let { data } = (props.task.id)
                ? await api.put(`/tasks/${props.task.id}`, props.task)
                : await api.post(`/tasks`, props.task)

                let { message, task_status } = data 

                await store.dispatch('task/listTasks')
                store.commit('alerta/VALORES_ALERTA',{
                    texto: message,
                    tipo: (task_status === 3) ? 'primary' : 'success',
                    ver: true
                })
                emit('close')
            } catch (error) {
                let { erroresApi,valoresAlerta } = manejoErroresApi(error,props.task)
                
                errores.value = erroresApi
                store.commit('alerta/VALORES_ALERTA',valoresAlerta)
            } finally {
                loading.value = false
            }
        }

        return {
            errores,
            loading,
            taskStatuses,
            tituloCard: computed(() => (props.task.id) ? 'Editar tarea' : 'Agregar tarea'),
            submitTask
        }
    }
}
</script>