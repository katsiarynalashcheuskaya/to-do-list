import {DataType} from "./AppWithRedux";
import {useDispatch} from "react-redux";
import {changeStatusAC, editTaskAC, removeTaskAC} from "./reducers/tasksReducer";
import React, {ChangeEvent, memo, useCallback} from "react";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {Button} from "./components/Button/Button";

type TaskPropsType = {
    todolistID: string
    task: DataType
}

export const Task = memo((props: TaskPropsType) => {
    let dispatch = useDispatch();

    const removeButtonHandler = () =>  dispatch(removeTaskAC(props.todolistID, props.task.id))

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusAC(props.todolistID, props.task.id, e.currentTarget.checked))
    }, [props.todolistID, props.task.id, dispatch])


    const editTaskHandler = useCallback((newTitle: string)=>dispatch(editTaskAC(props.todolistID,props.task.id, newTitle)), [props.task.id])

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <input type="checkbox"
               onChange={onChangeHandler}
               checked={props.task.isDone}/>
        <EditableSpan title={props.task.title} callback={editTaskHandler}/>
        <Button name={'x'} callback={removeButtonHandler}/>
    </div>
})