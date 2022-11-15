import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type EditableSpanPropsType = {
    title:string
    callback: (newTitle:string)=>void
}

export const EditableSpan = (props:EditableSpanPropsType) => {
    const {title, callback} = props;

    const [edit, setEdit] = useState(false)
    let [label, setLabel] = useState(title)

    const onDoubleClickHandler=()=>{
        setEdit(!edit)
        callback(label)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLabel(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        /*setError(null);*/
        if (e.key === 'Enter') {
            onDoubleClickHandler();
        }
    }

    return (
        edit
        ? <input value={label}
                 onBlur={onDoubleClickHandler}
                 onChange={onChangeHandler}
                 onKeyDown={onKeyPressHandler}
                 autoFocus
            />
        : <span onDoubleClick={onDoubleClickHandler}>{title}</span>
    );
};
