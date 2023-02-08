import {v1} from "uuid";
import {TodolistsType} from "../AppWithRedux";
import {todolistsReducer, TodolistsActionsType} from "./todolistsReducer";

let todolistID1:string
let todolistID2:string
let startState: Array<TodolistsType>

beforeEach(()=>{
    todolistID1 = v1();
    todolistID2 = v1();

    startState = [
        {id: todolistID1, title: 'What to learn'},
        {id: todolistID2, title: 'What to buy'},
    ]
})

test('correct todolist should be removed', () => {

    const action: TodolistsActionsType = {
        type: "REMOVE-TODOLIST",
        payload: {todolistID: todolistID1}
    }
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
})
test('correct todolist should be added', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const newTodolistTitle = 'New Todolist';

    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn'},
        {id: todolistID2, title: 'What to buy'},
    ]

    const action: TodolistsActionsType = {
        type: "ADD-TODOLIST",
        payload: {title: newTodolistTitle, todolistID: todolistID1}
    }
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
})
test('correct todolist should be edited', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const newTodolistTitle = 'New Todolist';

    const startState: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn'},
        {id: todolistID2, title: 'What to buy'},
    ]

    const action: TodolistsActionsType = {
        type: "EDIT-TODOLIST",
        payload: {todolistID: todolistID1, newTitle: newTodolistTitle}
    }
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(newTodolistTitle);
})
