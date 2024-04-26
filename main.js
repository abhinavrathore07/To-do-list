document.addEventListener('DOMContentLoaded', () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');
    const todoList = document.querySelector('#todo-list');

    nameInput.value = localStorage.getItem('username') || '';

    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value);
    });

    newTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        };

        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();
        displayTodos();
    });

    displayTodos();

    function displayTodos() {
        todoList.innerHTML = "";

        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = todo.done;

            const span = document.createElement('span');
            span.classList.add('bubble');
            span.classList.add(todo.category === 'personal' ? 'personal' : 'business');

            const content = document.createElement('div');
            content.classList.add('todo-content');
            content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;

            const actions = document.createElement('div');
            actions.classList.add('actions');

            const edit = document.createElement('button');
            edit.classList.add('edit');
            edit.innerHTML = 'Edit';

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.innerHTML = 'Delete';

            todoItem.appendChild(input);
            todoItem.appendChild(span);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);
            actions.appendChild(edit);
            actions.appendChild(deleteButton);

            if (todo.done) {
                todoItem.classList.add('done');
            }

            input.addEventListener('change', () => {
                todo.done = input.checked;
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTodos();
            });

            edit.addEventListener('click', () => {
                const inputField = content.querySelector('input');
                inputField.removeAttribute('readonly');
                inputField.focus();
                inputField.addEventListener('blur', () => {
                    inputField.setAttribute('readonly', true);
                    todo.content = inputField.value;
                    localStorage.setItem('todos', JSON.stringify(todos));
                    displayTodos();
                });
            });

            deleteButton.addEventListener('click', () => {
                todos.splice(todos.indexOf(todo), 1);
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTodos();
            });

            todoList.appendChild(todoItem);
        });
    }
});

var app = angular.module('todoApp', []);

app.controller('TodoController', function($scope) {
    $scope.todos = [
        { task: 'Buy groceries', category: 'personal' },
        { task: 'Finish project', category: 'business' },
        { task: 'Call ashray', category: 'personal' },
		{ task: 'Prepare presentation', category: 'business' },
        { task: 'Pay bills', category: 'personal' },
        { task: 'Go to the gym', category: 'personal' },
        { task: 'Read book', category: 'personal' },
        { task: 'Attend meeting', category: 'business' },
        { task: 'Write report', category: 'business' }
    ];
});