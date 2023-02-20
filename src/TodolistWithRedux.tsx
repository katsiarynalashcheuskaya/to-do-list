import React, {ChangeEvent, memo, useCallback} from 'react';
import {DataType, FilterValuesType} from './AppWithRedux';
import { Button } from './components/Button/Button';
import { EditableSpan } from './components/EditableSpan/EditableSpan';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {addTaskAC, changeStatusAC, editTaskAC, removeTaskAC} from "./reducers/tasksReducer";
import {Task} from "./Task";

type PropsType = {
    todolistID: string
    title: string
    changeFilter: (todolistID:string, value: FilterValuesType) => void
    editTodolist: (todolistID: string, newTitle:string)=>void
    removeTodolist: (todolistID: string)=>void
}

export const TodolistWithRedux = memo((props: PropsType) => {
    console.log('Todolist')
    let {todolistID, title, removeTodolist, changeFilter, editTodolist} = props;
    const tasks = useSelector<AppRootStateType, Array<DataType>>(state=>state.tasks[todolistID].data)
    const filter = useSelector<AppRootStateType, FilterValuesType>(state=>state.tasks[todolistID].filter)
    const dispatch = useDispatch();

    const addTaskHandler=useCallback((newTitle:string)=>dispatch(addTaskAC(todolistID, newTitle)), [todolistID, dispatch])
    const removeTodolistHandler=useCallback(()=>removeTodolist(todolistID), [todolistID, removeTodolist])
    const editTodolistHandler =useCallback( (newTitle:string) => editTodolist(todolistID, newTitle), [todolistID, editTodolist])
    const editTaskHandler = useCallback((taskId:string, newTitle:string) => dispatch(editTaskAC(todolistID, taskId, newTitle)), [todolistID, dispatch])


    let allTodolistTasks  = tasks;
    let tasksForTodolist = allTodolistTasks;
    if (filter === "Active") {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    }
    if (filter === "Completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    }


    const onAllClickHandler = useCallback(()=>changeFilter(todolistID,'All'), [todolistID, changeFilter])
    const onActiveClickHandler = useCallback(()=>changeFilter(todolistID,'Active'), [todolistID, changeFilter])
    const onCompletedClickHandler = useCallback(()=>changeFilter(todolistID,'Completed'), [todolistID, changeFilter])

    return <div>
        <h3>
            <EditableSpan title={title} callback={editTodolistHandler}/>
            <Button name={'x'} callback={removeTodolistHandler}/>
        </h3>
        <div>
            <AddItemForm addItem={addTaskHandler}/>
        </div>
        <div>
            {
                tasksForTodolist.map(t => <Task
                    todolistID={todolistID}
                    editTaskHandler={editTaskHandler}
                    task={t}
                    key={t.id}/>)
            }
        </div>

        <div>
            <Button name={'All'} callback={onAllClickHandler} Filter={filter}/>
            <Button name={'Active'} callback={onActiveClickHandler} Filter={filter}/>
            <Button name={'Completed'} callback={onCompletedClickHandler} Filter={filter}/>
        </div>
    </div>
})

