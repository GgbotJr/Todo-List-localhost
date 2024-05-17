const $ = document

const inputElem = $.getElementById("itemInput")
const addButton = $.getElementById("addButton")
const clearButton = $.getElementById("clearButton")
const todoList = $.getElementById("todoList")

let todosArrya = []

function addToList () {
    let inputValue = inputElem.value

    let todoObj = {
        id: todosArrya.length + 1,
        title: inputValue,
        complete: false
    }

    inputElem.value = ""

    todosArrya.push(todoObj)

    setLocalStorage(todosArrya)
    todosGenerator(todosArrya)

    inputElem.focus()
}

function setLocalStorage (todosList) {
    localStorage.setItem("todos", JSON.stringify(todosList))
}

function todosGenerator (todosList) {
    let newTodoLiElem, newTodoLabelElem, newTodoCompleteBtn,  newTodoDeleteBtn 

    todoList.innerHTML = ""

    todosList.forEach(function (todo) {

        newTodoLiElem = $.createElement("li")
        newTodoLiElem.className = "completed well"

        newTodoLabelElem = $.createElement("label")
        newTodoLabelElem.innerHTML = todo.title

        newTodoCompleteBtn = $.createElement("button")
        newTodoCompleteBtn.innerHTML = "Complete"
        newTodoCompleteBtn.className = "btn btn-success"
        newTodoCompleteBtn.setAttribute("onclick", "completeTodo(" + todo.id + ")")
        
        newTodoDeleteBtn = $.createElement("button")
        newTodoDeleteBtn.innerHTML = "Delete"
        newTodoDeleteBtn.className = "btn btn-danger"
        newTodoDeleteBtn.setAttribute("onclick", "removeTodo(" + todo.id + ")")

        if (todo.complete) {
            newTodoLiElem.className = "uncompleted well"
            newTodoCompleteBtn.innerHTML = "uncompleted"
        }

        newTodoLiElem.append(newTodoLabelElem, newTodoCompleteBtn,  newTodoDeleteBtn)

        todoList.append(newTodoLiElem)
        // console.log(newTodoLiElem)
    })
}

function getloadStorage () {
    let localStorageTodos =  JSON.parse(localStorage.getItem("todos"))

    if (localStorageTodos) {
        todosArrya = localStorageTodos
    } else {
        todosArrya = []
    }

    todosGenerator(todosArrya)
}

function clearTodos () {
    todosArrya = []
    todoList.innerHTML = ""
    localStorage.removeItem("todos")
}

function addToListKeydown (event) {
    // console.log(event)
    if (event.keyCode === 13) {
        addToList()
    }
}

function removeTodo (todoID) {
    let localStorageTodos = JSON.parse(localStorage.getItem("todos"))
    
    todosArrya = localStorageTodos

    let mainTodoIndex = localStorageTodos.findIndex(function (todo) {
        return todo.id === todoID
    })

    todosArrya.splice(mainTodoIndex, 1)

    setLocalStorage(todosArrya)

    todosGenerator(todosArrya)
}

function completeTodo (todoID) {
    let localStorageTodos = JSON.parse(localStorage.getItem("todos"))
    
    todosArrya = localStorageTodos

    todosArrya.forEach(function (todo) {
        if (todo.id === todoID) {
            todo.complete = !todo.complete
        }
    })

    setLocalStorage(todosArrya)

    todosGenerator(todosArrya)
}

addButton.addEventListener("click", addToList)
window.addEventListener("load",  getloadStorage)
clearButton.addEventListener("click", clearTodos)
inputElem.addEventListener("keydown", addToListKeydown)
