import {FilterValuesType, TasksStateType} from "../App"
import {v1} from "uuid";
import {todolistID1, todolistID2} from "./todolistsReducer";

export const initialStateOfTasks: TasksStateType = {
    [todolistID1]: {
        data: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        filter: 'All'
    },
    [todolistID2]: {
        data: [
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: true},
            {id: v1(), title: "GraphQL2", isDone: false}
        ],
        filter: 'All'
    }
}

export const tasksReducer = (state: TasksStateType = initialStateOfTasks, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            /*setTasks({...tasks,[todolistID]:{...tasks[todolistID], data:tasks[todolistID].data.filter(f=>f.id!= id)}})*/
            return {
                ...state,
                [action.payload.todolistID]: {
                    ...state[action.payload.todolistID],
                    data: state[action.payload.todolistID].data
                        .filter(f => f.id !== action.payload.id)
                }
            }
        }
        case 'ADD-TASK': {
            /*setTasks({...tasks, [todolistID]:{...tasks[todolistID], data: [newTask, ...tasks[todolistID].data]}})*/
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {
                ...state,
                [action.payload.todolistID]: {
                    ...state[action.payload.todolistID],
                    data: [newTask, ...state[action.payload.todolistID].data]
                }
            }
        }
        case 'CHANGE-TASK-STATUS': {
            /*setTasks({...tasks,[todolistID]:{...tasks[todolistID], data:tasks[todolistID].data.map(c=>c.id===taskId ? {...c, isDone} : c)}})}*/
            return {
                ...state, [action.payload.todolistID]: {
                    ...state[action.payload.todolistID],
                    data: state[action.payload.todolistID].data
                        .map(c => c.id === action.payload.taskId ? {...c, isDone: action.payload.isDone} : c)
                }
            }
        }
        case 'CHANGE-FILTER': {
            /* setTasks({...tasks, [todolistID]: {...tasks[todolistID], filter:value}})*/
            return {
                ...state,
                [action.payload.todolistID]: {...state[action.payload.todolistID], filter: action.payload.value}
            }
        }
        case 'EDIT-TASK': {
            /*setTasks({...tasks, [todolistID]:{...tasks[todolistID], data:tasks[todolistID].data.map(t=>t.id===taskId ? {...t, title:newTitle} : t)}})*/
            return {
                ...state,
                [action.payload.todolistID]: {
                    ...state[action.payload.todolistID],
                    data: state[action.payload.todolistID].data.map(t => t.id === action.payload.taskId ? {
                        ...t,
                        title: action.payload.newTitle
                    } : t)
                }
            }
        }
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeStatusAC> |
    ReturnType<typeof changeFilterAC> |
    ReturnType<typeof editTaskAC>

export const removeTaskAC = (todolistID: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistID, id}
    } as const
}
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todolistID, title}
    } as const
}
export const changeStatusAC = (todolistID: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {todolistID, taskId, isDone}
    } as const
}
export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {todolistID, value}
    } as const
}
export const editTaskAC = (todolistID: string, taskId: string, newTitle: string) => {
    return {
        type: 'EDIT-TASK',
        payload: {todolistID, taskId, newTitle}
    } as const
}
