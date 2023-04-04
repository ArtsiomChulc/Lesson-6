import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from './AddItemForm';

// create
// read
// update
// delete
// CRUD operations
// interface => GUI (CLI, VUI, ....)

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
    // tasks: Array<TaskType>
}

type TaskStateType = {
    [todoListId: string]: Array<TaskType>
}

function App(): JSX.Element {
    // BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todoListId_1, title: "What to learn", filter: "all" },
        { id: todoListId_2, title: "What to buy", filter: "all" },
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            { id: v1(), title: "HTML & CSS", isDone: true },
            { id: v1(), title: "CSS & SCSS", isDone: true },
            { id: v1(), title: "ES6/TS", isDone: false },
            { id: v1(), title: "REDUX", isDone: false },
        ],
        [todoListId_2]: [
            { id: v1(), title: "WATER", isDone: true },
            { id: v1(), title: "BREAD", isDone: true },
            { id: v1(), title: "SALT", isDone: false },
            { id: v1(), title: "BEER", isDone: false },
        ],
    })


    const removeTask = (taskId: string, todoListId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const resultOfUpdate: Array<TaskType> = tasksForUpdate.filter((task) => task.id !== taskId)
        const copyTasks = { ...tasks }
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)
        //
        setTasks({ ...tasks, [todoListId]: tasks[todoListId].filter((task) => task.id !== taskId) })
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = { id: v1(), title, isDone: false }
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const resultOfUpdate: Array<TaskType> = [newTask, ...tasksForUpdate]
        const copyTasks = { ...tasks }
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)
        //
        setTasks({ ...tasks, [todoListId]: [newTask, ...tasks[todoListId]] })
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        setTasks({ ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? { ...t, isDone: newIsDone } : t) })
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? { ...tl, filter: filter } : tl))
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        setTasks({ ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? { ...t, title: newTitle } : t) })
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }
    //UI:
    const getFilteredTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasksList.filter(t => !t.isDone)
            case "completed":
                return tasksList.filter(t => t.isDone)
            default:
                return tasksList
        }
    }

    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? { ...tl, title: newTitle } : tl))
    }

    const addTodoList = (title: string) => {
        const newTodo: TodoListType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({ ...tasks, [newTodo.id]: [] })
    }

    const todoListsComponents = todoLists.map(tl => {
        const tasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)
        return (
            <TodoList
                key={tl.id}
                changeTaskTitle={changeTaskTitle}
                todoListId={tl.id}
                title={tl.title}
                tasks={tasksForRender}
                filter={tl.filter}
                changeTodoListTitle={changeTodoListTitle}

                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                changeTodoListFilter={changeTodoListFilter}
            />
        )
    })


    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} recommendedTitleLength={10} maxTitleLength={20} />
            {todoListsComponents}
        </div>
    );
}

export default App;
