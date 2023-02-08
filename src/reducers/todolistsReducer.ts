import {TodolistsType} from "../AppWithRedux"
import {v1} from "uuid";

export let todolistID1=v1();
export let todolistID2=v1();

export const initialStateOfTodolists: TodolistsType[] = [
        {id: todolistID1, title: 'What to learn'},
        {id: todolistID2, title: 'What to buy'},
]

export const todolistsReducer=(state:TodolistsType[] = initialStateOfTodolists,
                              action:TodolistsActionsType): TodolistsType[]=> {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistID)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.payload.todolistID, title: action.payload.title}]
        }
        case 'EDIT-TODOLIST':
            return state.map(t => (t.id === action.payload.todolistID) ?
                {...t, title: action.payload.newTitle} : t)
        default:
            return state
    }
}

export type TodolistsActionsType = ReturnType<typeof removeTodolistAC> |
    ReturnType<typeof addNewTodolistAC> |
    ReturnType<typeof editTodolistAC>

export const removeTodolistAC=(todolistID: string)=>{
    return{
        type:'REMOVE-TODOLIST',
        payload: {todolistID}
    } as const
}
export const addNewTodolistAC=(title: string)=>{
    return{
        type:'ADD-TODOLIST',
        payload: {title, todolistID: v1()}
    } as const
}
export const editTodolistAC=(todolistID: string, newTitle:string)=>{
    return{
        type:'EDIT-TODOLIST',
        payload: {todolistID, newTitle}
    } as const
}
