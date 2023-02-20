import React, {ChangeEvent, memo, useState} from 'react';
import { Button } from '../Button/Button';
import s from './AddItemForm.module.css';
import {
    KeyboardEvent
} from "../../../../../../../Applications/WebStorm.app/Contents/plugins/JavaScriptLanguage/jsLanguageServicesImpl/external/react";


type InputPropsType = {
    addItem: (title:string) => void
}

export const AddItemForm = memo((props:InputPropsType) => {
    let [label, setLabel] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (label.trim() !== "") {
            props.addItem(label.trim());
            setLabel("");
        } else {
            setError("Title is required");
        }}
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLabel(e.currentTarget.value)
    }

    return (
        <div className={s.addBlock}>
            <input value={label}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button name={'+'} callback={addTaskHandler}/>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
})
