// Save các task vào localStorage
function saveTasksToLocalStorage() {
    const taskLists = document.querySelectorAll('.object-div');
    const tasks = [];

    taskLists.forEach(taskList => {
        const listItems = taskList.querySelectorAll('li');
        const taskListItems = [];
        
        listItems.forEach(task => {
            const taskTitle = task.querySelector('.input__title')?.value || '';
            const taskText = task.querySelector('.text')?.textContent || '';
            const isChecked = task.querySelector('input[type="checkbox"]')?.checked || false;
            taskListItems.push({ title: taskTitle, text: taskText, checked: isChecked });
        });

        const dateInput = taskList.querySelector('input[type="date"]').value;
        const titleInput = taskList.querySelector('.input__title').value.trim();

        tasks.push({ taskListItems, dateInput, titleInput });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}


// Load lại các div và task từ LocalStorage //
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((taskData, index) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('object-div');
        newDiv.id = `object-${index + 1}`;

        const taskList = document.createElement('ul');
        taskList.classList.add('list__task');

        taskData.taskListItems.forEach(task => {
            const newTask = document.createElement('li');
            newTask.innerHTML = `
                <label class="list__checkbox">
                    <input type="checkbox" ${task.checked ? 'checked' : ''} onclick="toggleStrikethrough(this)">
                    <span class="text ${task.checked ? 'strikethrough' : ''}">${task.text}</span>
                    <button class="list__trashh"><img src="./img/trash-2.svg" alt=""></button>
                </label>
            `;
            taskList.appendChild(newTask);
        });

        newDiv.innerHTML = `
            <div class="list__title">
                <span class="title">${taskData.titleInput}</span>
                <button class="list__trash"><img src="./img/trash-2.svg" alt=""></button>
            </div>
            <div class="list__p">
                <img src="./img/calendar.svg" alt="">
                <input type="date" id="birthday" name="birthday" value="${taskData.dateInput}">
            </div>
        `;
        
        newDiv.appendChild(taskList);

        const form = document.createElement('form');
        form.classList.add('form__action');
        form.innerHTML = `
            <div class="linear">
                <input type="text" class="input__add" placeholder="+ Add a task">
            </div>
            <button class="button__add" type="submit"></button>
        `;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox__task');
        form.insertBefore(checkbox, form.childNodes[0]); 

        newDiv.appendChild(form);

        const outputDiv = document.querySelector('.listjob');
        outputDiv.appendChild(newDiv);
        newDiv.style.display = 'block';

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const text = form.querySelector('.input__add').value;
            if (text) {
                const newTask = document.createElement('li');
                newTask.innerHTML = `
                    <label class="list__checkbox">
                        <input type="checkbox" onclick="toggleStrikethrough(this)">
                        <span class="text">${text}</span>
                        <button class="list__trashh"><img src="./img/trash-2.svg" alt=""></button>
                    </label>
                `;
                taskList.appendChild(newTask);
                form.querySelector('.input__add').value = '';
                saveTasksToLocalStorage();
            }
        });

        const trashButton = newDiv.querySelector('.list__trash');
        trashButton.addEventListener('click', function() {
            newDiv.remove();
            saveTasksToLocalStorage();
        });
        
        taskList.addEventListener('click', function(event) {
            if (event.target.closest('.list__trashh')) {
                const taskItem = event.target.closest('li');
                const checkbox = taskItem.querySelector('input[type="checkbox"]');
                if (checkbox.checked) {
                    taskItem.remove();
                    saveTasksToLocalStorage();
                }
            }
        });

        const dateInput = newDiv.querySelector('input[type="date"]');
        dateInput.addEventListener('change', saveTasksToLocalStorage);

        const titleInput = newDiv.querySelector('.input__title');
        titleInput.addEventListener('input', function() {
            taskData.titleInput = titleInput.value;
            saveTasksToLocalStorage();
        });

        titleInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                taskData.titleInput = titleInput.value.trim();
                saveTasksToLocalStorage();
                titleInput.blur();
            }
        });
    });
}

function toggleStrikethrough(checkbox) {
    var text = checkbox.nextElementSibling;

    if (checkbox.checked) {
        text.classList.add("strikethrough");
    } else {
        text.classList.remove("strikethrough");
    }
}

const addDiv = document.querySelector('.list__add');
addDiv.addEventListener('click', function() {
    const object = `
        <form action="" class="form__action">
            <div class="linear">
                <input type="text" class="input__add" placeholder="+ Add a task">
            </div>
            <button class="button__add" type="submit"></button>
        </form>
    `;
    let idCounter = document.querySelectorAll('.object-div').length + 1;

    const newObject = { 
        titleInput: '', 
        dateInput: new Date().toISOString().split('T')[0], 
        form: object 
    };

    const newDiv = document.createElement('div');
    newDiv.id = `object-${idCounter}`;
    newDiv.classList.add('object-div');
    newDiv.innerHTML = `
        <div class="list__title">
            <input type="text" class="input__title" placeholder="+ Add a title">
            <button class="list__trash"><img src="./img/trash-2.svg" alt=""></button>
        </div>
        <div class="list__p">
            <img src="./img/calendar.svg" alt="">
            <input type="date" id="birthday" name="birthday" value="${newObject.dateInput}">
        </div>
        <ul class="list__task"></ul>
        ${newObject.form}
    `;
    saveTasksToLocalStorage();

    const form = newDiv.querySelector('.form__action');
    const titleInput = newDiv.querySelector('.input__title');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox__task');
    form.insertBefore(checkbox, form.childNodes[0]); 

    const outputDiv = document.querySelector('.listjob');
    outputDiv.appendChild(newDiv);
    newDiv.style.display = 'block';

    const taskList = newDiv.querySelector('.list__task');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const text = form.querySelector('.input__add').value;
        if (text) {
            const newTask = document.createElement('li');
            newTask.innerHTML = `
                <label class="list__checkbox">
                    <input type="checkbox" onclick="toggleStrikethrough(this)">
                    <span class="text">${text}</span>
                    <button class="list__trashh"><img src="./img/trash-2.svg" alt=""></button>
                </label>
            `;
            taskList.appendChild(newTask);
            form.querySelector('.input__add').value = ''; 
            saveTasksToLocalStorage();
        }
    });

    taskList.addEventListener('click', function(event) {
        if (event.target.closest('.list__trashh')) {
            const taskItem = event.target.closest('li');
            const checkbox = taskItem.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                taskItem.remove();
                saveTasksToLocalStorage();
            }
        }
    });

    const dateInput = newDiv.querySelector('input[type="date"]');
    dateInput.addEventListener('change', saveTasksToLocalStorage);

    titleInput.addEventListener('input', function(event) {
        newObject.titleInput = titleInput.value;
        saveTasksToLocalStorage();
    });

    titleInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            newObject.titleInput = titleInput.value.trim();
            const titleSpan = document.createElement('span');
            titleSpan.classList.add('title');
            titleSpan.textContent = newObject.titleInput;
            titleInput.replaceWith(titleSpan);
            saveTasksToLocalStorage();
            titleInput.blur();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage();
});
