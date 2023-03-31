import React, {useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from "../Task";
import {ReduxStoreProviderDecorator} from "../reducers/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../reducers/store";
import {DataType} from "../AppWithRedux";
import {todolistID1} from "../reducers/todolistsReducer";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TODOLISTS/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
    args: {
        todolistID: '564566',
        task: {id: '1', title: 'esest', isDone: false},
        changeTaskStatus: action('changeTaskStatus')
    }
} as ComponentMeta<typeof Task>;

const TaskCopy = () => {
    const task = useSelector<AppRootStateType, DataType>(state=>state.tasks["todolistID1"].data[0])
    return <Task todolistID={todolistID1} task={task} />
}

const Template1: ComponentStory<typeof Task> = (args) => <TaskCopy />
const Template2: ComponentStory<typeof Task> = (args) => {
    return <Task {...args} />}

export const TaskStory = Template1.bind({});

export const TaskDoneStory = Template2.bind({});
TaskDoneStory.args = {
    task: {id: '1', title: 'esest', isDone: true},
};

export const TaskIsNotDoneStory = Template2.bind({});




