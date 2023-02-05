import {todolistID1, todolistID2} from "./todolistsReducer";
import {TasksStateType} from "../App";
import {addTaskAC, changeFilterAC, editTaskAC, removeTaskAC, TasksActionsType, tasksReducer} from "./tasksReducer";

test('correct task should be removed', () => {
    const startState: TasksStateType = {
        [todolistID1]: {
            data: [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: false}
            ],
            filter: 'All'
        },
        [todolistID2]: {
            data: [
                {id: '1', title: "ReactJS2", isDone: false},
                {id: '2', title: "Rest API2", isDone: true},
                {id: '3', title: "GraphQL2", isDone: false}
            ],
            filter: 'All'
        }
    }

    const action = removeTaskAC(todolistID2, '2')
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        [todolistID1]: {
            data: [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: false}
            ],
            filter: 'All'
        },
        [todolistID2]: {
            data: [
                {id: '1', title: "ReactJS2", isDone: false},
                {id: '3', title: "GraphQL2", isDone: false}
            ],
            filter: 'All'
        }
    })
    expect(endState[todolistID2].data[1].title).toBe('GraphQL2')
    expect(endState[todolistID2].data.length).toBe(2);

})
test('new task should be added', () => {
    const startState: TasksStateType = {
        [todolistID1]: {
            data: [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: false}
            ],
            filter: 'All'
        },
        [todolistID2]: {
            data: [
                {id: '1', title: "ReactJS2", isDone: false},
                {id: '2', title: "Rest API2", isDone: true},
                {id: '3', title: "GraphQL2", isDone: false}
            ],
            filter: 'All'
        }
    }

    const action = addTaskAC(todolistID1, 'Redux')
    const endState = tasksReducer(startState, action)

    expect(endState[todolistID1].data.length).toBe(3);
    expect(endState[todolistID1].data[0].title).toBe('Redux');
    expect(endState[todolistID2].data.length).toBe(3)
    expect(endState[todolistID2].data[0].id).toBeDefined()
    expect(endState[todolistID1].data[0].isDone).toBe(false)
})
test('task should change status', () => {
    const startState: TasksStateType = {
        [todolistID1]: {
            data: [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: false}
            ],
            filter: 'All'
        },
        [todolistID2]: {
            data: [
                {id: '1', title: "ReactJS2", isDone: true},
                {id: '2', title: "Rest API2", isDone: true},
                {id: '3', title: "GraphQL2", isDone: false}
            ],
            filter: 'All'
        }
    }

    const action: TasksActionsType = {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistID: todolistID2,
            taskId: '2',
            isDone: false
        }
    }
    const endState = tasksReducer(startState, action)

    expect(endState[todolistID2].data[0].isDone).toBe(true);
    expect(endState[todolistID2].data[1].isDone).toBe(false);
    expect(endState[todolistID2].data[2].isDone).toBe(false);
})
test('tasks filter should be changed', () => {
    const startState: TasksStateType = {
        [todolistID1]: {
            data: [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: false}
            ],
            filter: 'All'
        },
        [todolistID2]: {
            data: [
                {id: '1', title: "ReactJS2", isDone: true},
                {id: '2', title: "Rest API2", isDone: true},
                {id: '3', title: "GraphQL2", isDone: false}
            ],
            filter: 'All'
        }
    }

    const action = changeFilterAC(todolistID2, 'Active')
    const endState = tasksReducer(startState, action)

    expect(endState[todolistID2].filter).toBe('Active');
    expect(endState[todolistID1].filter).toBe('All');

})
test('correct task title should be changed', () => {
    const startState: TasksStateType = {
        [todolistID1]: {
            data: [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: false}
            ],
            filter: 'All'
        },
        [todolistID2]: {
            data: [
                {id: '1', title: "ReactJS2", isDone: true},
                {id: '2', title: "Rest API2", isDone: true},
                {id: '3', title: "GraphQL2", isDone: false}
            ],
            filter: 'All'
        }
    }
    const action = editTaskAC(todolistID1, '1', 'Redux')

    const endState = tasksReducer(startState, action)

    expect(startState[todolistID1].data[0].title).toBe('HTML&CSS');
    expect(endState[todolistID1].data[0].title).toBe('Redux');
})