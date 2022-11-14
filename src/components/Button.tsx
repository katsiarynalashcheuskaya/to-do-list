import React from 'react';
import s from './Button.module.css';
import {FilterValuesType} from "../App";



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

    /*const finalClassName = `${(props.filter==='All' ? s.activeButton : props.filter==='Active' ? s.activeButton : props.filter==='Completed' ? s.activeButton : '')}`*/
    return (
        <button
            className={name===Filter? s.activeButton : ''}
            onClick={onClickHandler}>
            {name}
        </button>
    );
};
