import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
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

export type FilterValuesType = "All" | "Active" | "Completed";

function AppWithReducers() {
    const [todolists, todolistsDispatch] = useReducer(todolistsReducer,initialStateOfTodolists)
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
        const action = removeTodolistAC(todolistID)
        todolistsDispatch(action)
    }
    function addNewTodolist(title: string){
        const action = addNewTodolistAC(title)
        todolistsDispatch(action)
        tasksDispatch(action)
    }
    function editTodolist(todolistID: string, newTitle:string){
        todolistsDispatch(editTodolistAC(todolistID, newTitle))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addNewTodolist}/>
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

export default AppWithReducers;
