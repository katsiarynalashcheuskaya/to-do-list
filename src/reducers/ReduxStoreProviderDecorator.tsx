import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "./store";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todolistsReducer} from "./todolistsReducer";

export const ReduxStoreProviderDecorator = (storyFn: ()=>React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistID1", title: 'What to learn'},
        {id: "todolistID2", title: 'What to buy'},
    ],
    tasks: {
        ["todolistID1"]: {
            data: [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: false}
            ],
            filter: 'All'
        },
        ["todolistID2"]: {
            data: [
                {id: '1', title: "ReactJS2", isDone: false},
                {id: '2', title: "Rest API2", isDone: true},
                {id: '3', title: "GraphQL2", isDone: false}
            ],
            filter: 'All'
        }
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)