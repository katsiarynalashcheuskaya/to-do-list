import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { Input } from './components/Input/Input';
import {useReducer} from "react";
import {
    removeTodolistAC,
    todolistReducer,
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

function App() {
    const [todolists, todolistsDispatch] = useReducer(todolistReducer,initialStateOfTodolists)
    const [tasks, tasksDispatch] = useReducer(tasksReducer,initialStateOfTasks);

    function removeTask(todolistID: string, id: string) {
        tasksDispatch(removeTaskAC(todolistID, id))
    }
    function addTask(todolistID: string, title: string) {
        tasksDispatch(addTaskAC(todolistID, title))
        }
    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        tasksDispatch(changeStatusAC(todolistID, taskId, isDone))
         }
    function changeFilter(todolistID: string, value: FilterValuesType) {
        tasksDispatch(changeFilterAC(todolistID, value))

    }
    function editTask(todolistID: string, taskId: string, newTitle:string){
        tasksDispatch(editTaskAC(todolistID,taskId,  newTitle))
    }
    function removeTodolist(todolistID: string){
        todolistsDispatch(removeTodolistAC(todolistID))
    }
    function addNewTodolist(title: string){
        todolistsDispatch(addNewTodolistAC(title))
        /*tasksDispatch(addTaskAC(todolistID, title))*/
    }
    function editTodolist(todolistID: string, newTitle:string){
        todolistsDispatch(editTodolistAC(todolistID, newTitle))
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

export default App;
