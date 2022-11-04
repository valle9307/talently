import api from '../../api'

const storeTask = {
    namespaced: true,
    state: () => ({
        errorTasks: {},
        tasks: []
    }),
    actions:{
        async listTasks({ commit }) {
            try {
                let { data }  =  await api.get('/tasks')
                let { tasks } = data
    
                commit('SET_TASKS', tasks)
            } catch (error) {
                let { errors } = error.response.data

                commit('ERROR_TASKS', errors)
            }
        }
    },
    mutations:{
        ERROR_TASKS(state,errors) {
            state.errorTasks = errors
        },
        SET_TASKS(state, tasks) {
            state.tasks = tasks
        }
    },
    getters:{
        tasksDone(state) {
            return state.tasks.filter(task => (task.task_status.name === 'Done')) 
        },
        tasksTodo(state) {
            return state.tasks.filter(task => (task.task_status.name === 'To do'))
        },
        tasksWorking(state) {
            return state.tasks.filter(task => (task.task_status.name === 'Working'))
        }
    }
}

export default storeTask

