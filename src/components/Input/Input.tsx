import React, {ChangeEvent, useState } from 'react';
import { Button } from '../Button/Button';
import s from './Input.module.css';
import {
    KeyboardEvent
} from "../../../../../../../Applications/WebStorm.app/Contents/plugins/JavaScriptLanguage/jsLanguageServicesImpl/external/react";


type InputPropsType = {
    callback: (title:string) => void
}

export const Input = (props:InputPropsType) => {

    let [label, setLabel] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (label.trim() !== "") {
            props.callback(label.trim());
            setLabel("");
        } else {
            setError("Title is required");
        }}
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLabel(e.currentTarget.value)
    }

    return (
        <div>
            <input value={label}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button name={'+'} callback={addTaskHandler}/>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}
