import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './AppWithReducers';
import { Button } from './components/Button/Button';
import { EditableSpan } from './components/EditableSpan/EditableSpan';
import { AddItemForm } from './components/AddItemForm/AddItemForm';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID:string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    editTask: (todolistID: string, taskId: string, newTitle:string)=>void
    editTodolist: (todolistID: string, newTitle:string)=>void
    removeTodolist: (todolistID: string)=>void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    let {todolistID, title, removeTodolist, filter, removeTask, tasks, addTask, changeTaskStatus, changeFilter, editTask, editTodolist} = props;

    const addTaskHandler=(newTitle:string)=>addTask(todolistID, newTitle)
    const removeTodolistHandler=()=>removeTodolist(todolistID)
    const editTodolistHandler = (newTitle:string) => editTodolist(todolistID, newTitle)
    const editTaskHandler = (tID:string, newTitle:string) => editTask(todolistID, tID, newTitle)

    return <div>
        <h3>
            <EditableSpan title={title} callback={editTodolistHandler}/>
            <Button name={'x'} callback={removeTodolistHandler}/>
        </h3>
        <div>
            <AddItemForm addItem={addTaskHandler}/>
        </div>
        <ul>
            {
                tasks.map(t => {
                    const removeButtonHandler = () => removeTask(todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(todolistID, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} callback={(newTitle)=>editTaskHandler(t.id, newTitle)}/>
                        <Button name={'x'} callback={removeButtonHandler}/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button name={'All'} callback={()=>changeFilter(todolistID,'All')} Filter={filter}/>
            <Button name={'Active'} callback={()=>changeFilter(todolistID,'Active')} Filter={filter}/>
            <Button name={'Completed'} callback={()=>changeFilter(todolistID,'Completed')} Filter={filter}/>
        </div>
    </div>
}
