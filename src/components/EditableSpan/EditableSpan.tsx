import React, {ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
    title:string
    callback: (newTitle:string)=>void
}

export const EditableSpan = (props:EditableSpanPropsType) => {
    const {title} = props;
    const [edit, setEdit] = useState(false)
    let [label, setLabel] = useState(title)
    const onClickHandler=()=>{
        setEdit(!edit)
        props.callback(label)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLabel(e.currentTarget.value)
    }

    return (
        edit
        ? <input value={label} onBlur={onClickHandler} autoFocus onChange={onChangeHandler}/>
        : <span onClick={onClickHandler}>{title}</span>
    );
};
