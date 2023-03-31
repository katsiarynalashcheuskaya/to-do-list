import React, {useCallback} from 'react';
import './App.css';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import {
    removeTodolistAC,
    addNewTodolistAC,
    editTodolistAC,
} from './reducers/todolistsReducer'
import {
    changeFilterAC
} from './reducers/tasksReducer'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {TodolistWithRedux} from "./TodolistWithRedux";
import {todolistsSelector} from "./reducers/selectors/todolistsSelector";

export type TodolistsType = {
    id: string,
    title: string
}
export type TasksStateType = {
    [key:string]:InTasksType
}
export type InTasksType =  {
    data:DataType[]
    filter: FilterValuesType
}
export type DataType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "All" | "Active" | "Completed";

const AppWithRedux = () => {
    console.log('APPWithRedux')
    /*const todolists = useReducer(todolistsReducer,initialStateOfTodolists)
    const tasks = useReducer(tasksReducer,initialStateOfTasks);*/
    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(todolistsSelector)
    const dispatch = useDispatch();

    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, value))
    }, [dispatch])
    const removeTodolist = useCallback((todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    }, [dispatch])
    const addNewTodolist = useCallback((title: string) => {
        const action = addNewTodolistAC(title)
        dispatch(action)
    }, [dispatch])
    const editTodolist = useCallback((todolistID: string, newTitle:string) => {
        dispatch(editTodolistAC(todolistID, newTitle))
    }, [dispatch])

    return (
        <div className="App">
            <AddItemForm addItem={addNewTodolist}/>
            {todolists.map(mapTodolist => {
                return(
                    <TodolistWithRedux
                        key={mapTodolist.id}
                        todolistID={mapTodolist.id}
                        title={mapTodolist.title}
                        removeTodolist={removeTodolist}
                        changeFilter={changeFilter}
                        editTodolist={editTodolist}
                    />
                )

            })}
        </div>
    );
}

export default AppWithRedux;
