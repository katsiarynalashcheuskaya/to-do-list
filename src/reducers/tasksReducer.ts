import {FilterValuesType, TasksStateType} from "../AppWithRedux"
import {v1} from "uuid";
import {addNewTodolistAC, removeTodolistAC} from "./todolistsReducer";

export const initialStateOfTasks: TasksStateType = {
    /*[todolistID1]: {
        data: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        filter: 'All'
    },
    [todolistID2]: {
        data: [
            id: v1(), title: "ReactJS2", isDone: false}
        ],
        filter: 'All'
    }*/
}

export const tasksReducer = (state: TasksStateType = initialStateOfTasks,
                             action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
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
            return {
                ...state, [action.payload.todolistID]: {
                    ...state[action.payload.todolistID],
                    data: state[action.payload.todolistID].data
                        .map(c => c.id === action.payload.taskId ? {...c, isDone: action.payload.isDone} : c)
                }
            }
        }
        case 'CHANGE-FILTER': {
            return {
                ...state,
                [action.payload.todolistID]: {...state[action.payload.todolistID], filter: action.payload.value}
            }
        }
        case 'EDIT-TASK': {
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
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.todolistID]: {data: [],
                    filter: 'All'}
            }
    }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.payload.todolistID]
            return copyState
        }
        default:
            return state
    }
}

export type TasksActionsType = ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeStatusAC> |
    ReturnType<typeof changeFilterAC> |
    ReturnType<typeof editTaskAC> |
    ReturnType<typeof addNewTodolistAC> |
    ReturnType<typeof removeTodolistAC>

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
