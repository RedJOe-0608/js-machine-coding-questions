
/**
 * schema for todo
{
    text: string
    completed: boolean
} 
 
  */

const todoForm = document.getElementById("todo-form");
const todo = document.getElementById("todo-input");

const todos = document.getElementById("todos");

//check if we have todos in localStorage.
function fetchFromLocalStorage(){
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    todos.forEach((todo)=>{
        createTodo(todo.text,todo.completed);
    })
    
}

fetchFromLocalStorage()

function createTodo(todoText,completed=false){
    const newTodoContainer = document.createElement("div");
    newTodoContainer.className = 'new-todo-container'

    //creating the update button
    const updateButton = document.createElement("button");
    updateButton.textContent = 'Update';
    updateButton.className = 'update-button';

    //creating the delete button.
    const deleteButton = document.createElement("button");
    deleteButton.textContent = 'Delete';
    deleteButton.classList = 'delete-button';

    //creating the mark-as-complete button.
    const markAsCompleteButton = document.createElement("button");
    markAsCompleteButton.textContent = 'Mark As Complete';
    markAsCompleteButton.classList = 'mark-as-complete-button';

    const newTodo = document.createElement("h2");
    if(completed){
        newTodo.classList.add('new-todo','completed');
    }else{
        newTodo.className = 'new-todo';
    }
    newTodo.textContent = todoText;

    //appending the new todo and the update button to newTodoContainer
    newTodoContainer.appendChild(newTodo);
    newTodoContainer.appendChild(updateButton);
    newTodoContainer.appendChild(deleteButton);
    newTodoContainer.appendChild(markAsCompleteButton);

    todos.appendChild(newTodoContainer)
}

todoForm.addEventListener("submit",function(e) {
    e.preventDefault();

    createTodo(todo.value);

    const newTodo = {
        text: todo.value,
        completed: false
    }

    const existingTodos = JSON.parse(localStorage.getItem('todos')) || []
    existingTodos.push(newTodo);
    localStorage.setItem('todos',JSON.stringify(existingTodos));

    todo.value = '';
})

todos.addEventListener('click',function(e){
    // this tells if the click was on update button or delete button.
    // console.log(e.target.classList.contains('delete-button'));
    
    const todoContainer = e.target.closest('.new-todo-container');

    //delete
    if(e.target.classList.contains('delete-button')){
        console.log(e.target.parentElement); //this is the todo that we want to delete.

        const todoText = todoContainer.querySelector('.new-todo').textContent;

        let todosFromLocalStorage = JSON.parse(localStorage.getItem('todos')) || [];

        todosFromLocalStorage = todosFromLocalStorage.filter((todo) => todo.text !== todoText)

        localStorage.setItem('todos',JSON.stringify(todosFromLocalStorage))

        todoContainer.remove();
    }
    else if(e.target.classList.contains('update-button')){
        //get the <h2> text i.e. todo
        const todoText = todoContainer.querySelector('.new-todo').textContent;

        //create the new input
        const input = document.createElement('input');
        input.type = 'text';
        input.value = todoText;
        input.className = 'update-input';
        input.dataset.oldText = todoText;

        //replace the h2 with input
        todoContainer.querySelector('.new-todo').replaceWith(input);

        //remove the update and delete buttons
        todoContainer.querySelector('.delete-button').remove();
        todoContainer.querySelector('.update-button').remove();
        todoContainer.querySelector('.mark-as-complete-button').remove();

        //add the save button
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.className = 'save-button';

        todoContainer.appendChild(saveButton);
    }
    else if(e.target.classList.contains('save-button')){
        //replace the input with h2
        const input = todoContainer.querySelector('.update-input');
        const inputText = input.value;
        const oldText = input.dataset.oldText

        let todosFromLocalStorage = JSON.parse(localStorage.getItem('todos')) || [];

        todosFromLocalStorage = todosFromLocalStorage.map((todo) => {
            if(todo.text === oldText){
                return {
                    ...todo,
                    text: inputText
                }
            }
            return todo
        })

        localStorage.setItem('todos',JSON.stringify(todosFromLocalStorage))

        const newH2 = document.createElement('h2');
        newH2.textContent = inputText;
        newH2.className = 'new-todo';

        //replace
        todoContainer.querySelector('.update-input').replaceWith(newH2);

        //remove the save button
        e.target.remove();

        // add update and delete buttons back

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.className = 'update-button';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';

        todoContainer.appendChild(updateButton);
        todoContainer.appendChild(deleteButton);

    } else if(e.target.classList.contains('mark-as-complete-button')){
        const todoText = todoContainer.querySelector('.new-todo').textContent;
       const todoElement = todoContainer.querySelector('.new-todo');
todoElement.classList.toggle('completed');

        let todosFromLocalStorage = JSON.parse(localStorage.getItem('todos'))

        todosFromLocalStorage = todosFromLocalStorage.map((todo) => {
            if(todo.text === todoText){
                return {
                    ...todo,
                    completed: !todo.completed
                }
            }
            return todo
        })

        localStorage.setItem('todos',JSON.stringify(todosFromLocalStorage))

        if(todoElement.classList.contains('completed')){
            e.target.textContent = 'Mark As Incomplete';    
        }else{
            e.target.textContent = 'Mark As Complete';    
        }
    }
    
})

