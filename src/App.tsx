import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import { Input } from './components/Input/Input';
import {useReducer} from "react";

import {todolistReducer} from './reducers/todolistsReducer'
import {initialState, tasksReducer, removeTaskAC, addTaskAC, changeStatusAC, editTaskAC, changeFilterAC} from './reducers/tasksReducer'

export type TodolistsType = {
    id: string,
    title: string
}
export type TasksStateType = {
    [key:string]:InTasksType
}
type InTasksType =  {
    data:DataType[]
    filter: FilterValuesType
}
type DataType = {
    id: string,
    title: string,
    isDone: boolean
}
export let todolistID1=v1();
export let todolistID2=v1();
export type FilterValuesType = "All" | "Active" | "Completed";

function App() {

    const [todolists, todolistsDispatch] = useReducer(todolistReducer,
        [
        {id: todolistID1, title: 'What to learn'},
        {id: todolistID2, title: 'What to buy'},
    ]
    )

    const [tasks, tasksDispatch] = useReducer(tasksReducer,initialState);

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
    function removeTodolist(todolistID: string){
       /* setTodolists(todolists.filter(el=>el.id!==todolistID))
        delete tasks[todolistID]*/
    }
    function addNewTodolist(title: string){
       /* const todolistID = v1()
        let newTodolist:TodolistsType = {id: todolistID, title: title};
        setTodolists([...todolists, newTodolist])
        let newTask: InTasksType ={
            data:[
            {id: todolistID, title: 'nuhuhu', isDone: true},
        ],
            filter: 'All'}

        setTasks({...tasks, [todolistID]:newTask})*/

    }
    function editTask(todolistID: string, taskId: string, newTitle:string){
        tasksDispatch(editTaskAC(todolistID,taskId,  newTitle))
           }
    function editTodolist(todolistID: string, newTitle:string){
        /*setTodolists(todolists.map(t=>t.id===todolistID ? {...t, title:newTitle} : t))*/
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
