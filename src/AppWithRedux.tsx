import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { Input } from './components/Input/Input';
import {useReducer} from "react";
import {
    removeTodolistAC,
    todolistsReducer,
    addNewTodolistAC,
    editTodolistAC,
    initialStateOfTodolists
} from './reducers/todolistsReducer'
import {
    initialStateOfTasks,
    tasksReducer,
    removeTaskAC,
    addTaskAC,
    changeStatusAC,
    editTaskAC,
    changeFilterAC
} from './reducers/tasksReducer'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";

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
type DataType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "All" | "Active" | "Completed";

function AppWithRedux() {
    /*const todolists = useReducer(todolistsReducer,initialStateOfTodolists)
    const tasks = useReducer(tasksReducer,initialStateOfTasks);*/
    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state=>state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state=>state.tasks)
    const dispatch = useDispatch();

    function removeTask(todolistID: string, id: string) {
        dispatch(removeTaskAC(todolistID, id))
    }
    function addTask(todolistID: string, title: string) {
        dispatch(addTaskAC(todolistID, title))
    }
    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        dispatch(changeStatusAC(todolistID, taskId, isDone))
    }
    function changeFilter(todolistID: string, value: FilterValuesType) {
        dispatch(changeFilterAC(todolistID, value))

    }
    function editTask(todolistID: string, taskId: string, newTitle:string){
        dispatch(editTaskAC(todolistID,taskId,  newTitle))
    }
    function removeTodolist(todolistID: string){
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    }
    function addNewTodolist(title: string){
        const action = addNewTodolistAC(title)
        dispatch(action)
    }
    function editTodolist(todolistID: string, newTitle:string){
        dispatch(editTodolistAC(todolistID, newTitle))
    }

    return (
        <div className="App">
            <Input callback={addNewTodolist}/>
            {todolists.map(mapTodolist => {
                let tasksForTodolist = tasks[mapTodolist.id].data;
                if (tasks[mapTodolist.id].filter === "Active") {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                }
                if (tasks[mapTodolist.id].filter === "Completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                }
                return(
                    <Todolist
                        key={mapTodolist.id}
                        todolistID={mapTodolist.id}
                        title={mapTodolist.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        removeTodolist={removeTodolist}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        editTask={editTask}
                        editTodolist={editTodolist}
                        filter={tasks[mapTodolist.id].filter}
                    />
                )

            })}
        </div>
    );
}

export default AppWithRedux;
