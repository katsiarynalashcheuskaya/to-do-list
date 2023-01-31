import {TodolistsType } from "../App"

export const todolistReducer=(state:TodolistsType[], action:ActionsType)=>{
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state
        }
        case 'ADD-TODOLIST':{
            return state
        }
        case 'EDIT-TODOLIST':{
            return state
        }
        default: return state
    }
}

type ActionsType = ReturnType<typeof removeTodolistAC> |
    ReturnType<typeof addNewTodolistAC> |
    ReturnType<typeof editTodolistAC>

export const removeTodolistAC=()=>{
    return{
        type:'REMOVE-TODOLIST',
         payload: {}
    } as const
}
export const addNewTodolistAC=()=>{
    return{
        type:'ADD-TODOLIST',
        payload: {}
    } as const
}
export const editTodolistAC=()=>{
    return{
        type:'EDIT-TODOLIST',
        payload: {}
    } as const
}
