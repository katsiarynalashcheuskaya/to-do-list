import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type TodolistsType = {
    id: string,
    title: string
}
type TasksStateType = {
    [key:string]:InTasksType
}
type InTasksType = {
    data:DataType[]
    filter: FilterValuesType
}
type DataType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed";

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1=v1();
    let todolistID2=v1();

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn'},
        {id: todolistID2, title: 'What to buy'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]:{
            data:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
            filter: 'all'
        },
        [todolistID2]:{
            data:[
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: true},
            {id: v1(), title: "GraphQL2", isDone: false}
        ],
            filter: 'all'
    }
    });

    function removeTask(todolistID: string, id: string) {
       /* let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);*/
        /*setTasks({...tasks,[todolistID]:tasks[todolistID].filter(f=>f.id!= id)})*/
        setTasks({...tasks,[todolistID]:{...tasks[todolistID], data:tasks[todolistID].data.filter(f=>f.id!= id)}})
    }
    function addTask(todolistID: string, title: string) {
        /*let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);*/
        let newTask = {id: v1(), title: title, isDone: false};
        /* setTasks({...tasks,[todolistID]:[newTask, ...tasks[todolistID] ]})*/
        setTasks({...tasks, [todolistID]:{...tasks[todolistID], data: [newTask, ...tasks[todolistID].data]}})
    }
    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        /*let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }*/
       /* setTasks({...tasks,[todolistID]:tasks[todolistID].map(c=>c.id===taskId ? {...c, isDone:isDone} : c)})*/
        setTasks({...tasks,[todolistID]:{...tasks[todolistID], data:tasks[todolistID].data.map(c=>c.id===taskId ? {...c, isDone} : c)}})
    }
    function changeFilter(todolistID: string, value: FilterValuesType) {
       /* setFilter(value);*/
        /*setTodolists(todolists.map(f=>f.id===todolistID ? {...f, filter:value} : f))*/
        setTasks({...tasks, [todolistID]: {...tasks[todolistID], filter:value}})
    }
    function removeTodolist(todolistID: string){
        setTodolists(todolists.filter(el=>el.id!==todolistID))
        delete tasks[todolistID]
    }

    return (
        <div className="App">
            {todolists.map(mapTodolist => {
                let tasksForTodolist = tasks[mapTodolist.id].data;

                if (tasks[mapTodolist.id].filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                }
                if (tasks[mapTodolist.id].filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                }
                return(
                    <Todolist
                        key={mapTodolist.id}
                        todolistID={mapTodolist.id}
                        title={mapTodolist.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        removeTodolist={removeTodolist}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tasks[mapTodolist.id].filter}
                    />
                )
            })}
        </div>
    );
}

export default App;
