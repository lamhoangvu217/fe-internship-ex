function toggleStrikethrough(checkbox) {
    var text = checkbox.nextElementSibling;

    if (checkbox.checked) {
        text.classList.add("strikethrough");
    } else {
        text.classList.remove("strikethrough");
    }
}


const object = `
    <form action="" class="form__action">
        <input type="text" class="input__add" placeholder="+ Add a task">
        <button class="button__add" type="submit"></button>
    </form>
`;

let idCounter = 1; 
const addDiv = document.querySelector('.list__add');
const outputDiv = document.querySelector('.listjob');

addDiv.addEventListener('click', function() {
    const newObject = { 
        work: "Work", 
        date: new Date().toLocaleDateString(), 
        form: object 
    };

    const newDiv = document.createElement('div');
    newDiv.id = `object-${idCounter++}`;
    newDiv.classList.add('object-div');
    newDiv.innerHTML = `
        <div class="list__title">
            <h3>${newObject.work}</h3>
            <button class="list__trash"><img src="./img/trash-2.svg" alt=""></button>
        </div>
        <div class="list__p">
            <img src="./img/calendar.svg" alt="">
            <p class="date">${newObject.date}</p>
        </div>
        <ul class="list__task"></ul>
        ${newObject.form}
    `;

    const form = newDiv.querySelector('.form__action');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox__task');
    form.insertBefore(checkbox, form.childNodes[0]); 

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
                    <input type="checkbox" id="checkbox" onclick="toggleStrikethrough(this)">
                    <span class="text">${text}</span>
                </label>
            `;
            taskList.appendChild(newTask);
            form.querySelector('.input__add').value = ''; 
        }
    });

    const trashButton = newDiv.querySelector('.list__trash');
    trashButton.addEventListener('click', function() {
        const checkedTasks = newDiv.querySelectorAll('#checkbox:checked');
        checkedTasks.forEach(taskCheckbox => {
            taskCheckbox.closest('li').remove();
        });
    });
});


