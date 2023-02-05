import {TodolistsType} from "../App"
import {v1} from "uuid";

export let todolistID1=v1();
export let todolistID2=v1();

export const initialStateOfTodolists: TodolistsType[] = [
        {id: todolistID1, title: 'What to learn'},
        {id: todolistID2, title: 'What to buy'},
]


export const todolistReducer=(state:TodolistsType[] = initialStateOfTodolists,
                              action:TodolistsActionsType): TodolistsType[]=> {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            /* setTodolists(todolists.filter(el=>el.id!==todolistID))
        delete tasks[todolistID]*/
            return state.filter(el => el.id !== action.payload.todolistID)
        }
        case 'ADD-TODOLIST': {
            /* const todolistID = v1()
       let newTodolist:TodolistsType =
       {id: todolistID, title: title};
       setTodolists([...todolists, newTodolist])
       let newTask: InTasksType ={
           data:[
           {id: todolistID, title: 'nuhuhu', isDone: true},
       ],
           filter: 'All'}

       setTasks({...tasks, [todolistID]:newTask})*/
            const todolistID = v1()
            let newTodolist: TodolistsType =
                {id: todolistID, title: action.payload.title};

            return [...state, newTodolist]
        }
        case 'EDIT-TODOLIST': {
            /*setTodolists(todolists.map(t=>t.id===todolistID ? {...t, title:newTitle} : t))*/
            return state.map(t => t.id === action.payload.todolistID ? {...t, title: action.payload.newTitle} : t)
        }
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
        payload: {title}
    } as const
}
export const editTodolistAC=(todolistID: string, newTitle:string)=>{
    return{
        type:'EDIT-TODOLIST',
        payload: {todolistID, newTitle}
    } as const
}
