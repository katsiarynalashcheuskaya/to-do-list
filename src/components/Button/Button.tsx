import React from 'react';
import s from './Button.module.css';
import {FilterValuesType} from "../../AppWithReducers";

type ButtonPropsType = {
    name:string;
    callback: () => void
    Filter?: FilterValuesType
}

export const Button = (props:ButtonPropsType) => {
    const {name, callback, Filter} = props
    const onClickHandler=()=>{
        callback()
    }

    return (
        <button
            className={name===Filter? s.activeButton : ''}
            onClick={onClickHandler}>
            {name}
        </button>
    );
};
