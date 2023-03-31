import React, {ChangeEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";
import s from "../components/AddItemForm/AddItemForm.module.css";
import {Button} from "../components/Button/Button";

export default {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: 'Button inside form was clicked'
        },
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
AddItemFormStory.args = {
    addItem: action('Button inside form was clicked')
};

const Template1: ComponentStory<typeof AddItemForm> = (args) => {
    let [label, setLabel] = useState("")
    let [error, setError] = useState<string | null>("Title is required")

    const addTaskHandler = () => {
        if (label.trim() !== "") {
            args.addItem(label.trim());
            setLabel("");
        } else {
            setError("Title is required");
        }
    }
    /* const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
         if (error !== null) {
             setError(null);
         }
         if (e.key === 'Enter') {
             addTaskHandler();
         }
     }*/
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLabel(e.currentTarget.value)
    }

    return (
        <div className={s.addBlock}>
            <input value={label}
                   onChange={onChangeHandler}
                /*onKeyDown={onKeyPressHandler}*/
                   className={error ? "error" : ""}
            />
            <Button name={'+'} callback={addTaskHandler}/>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}
export const AddItemFormErrorStory = Template1.bind({});
AddItemFormErrorStory.args = {
    addItem: action('Button inside form was clicked')
};