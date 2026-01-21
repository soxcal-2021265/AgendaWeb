function login() {
    const correo = document.getElementById('username').value.trim();
    const contra = document.getElementById('password').value.trim();

    if (correo !== "") {
        if (contra !== "") {
            localStorage.setItem('usuarioLogueado', correo);
            localStorage.setItem('passwordLogueado', contra);
            window.location.href = "Contactos.html";
        } else {
            alert("Si ingresas un correo, debes ingresar también la contraseña.");
        }
    } 
    else {
        localStorage.removeItem('usuarioLogueado');
        localStorage.removeItem('passwordLogueado');
        window.location.href = "Contactos.html";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const spanNombre = document.getElementById('nombre-usuario');
    const spanPass = document.getElementById('pass-usuario');

    const usuario = localStorage.getItem('usuarioLogueado');
    const password = localStorage.getItem('passwordLogueado');

    if (spanNombre) {
        spanNombre.textContent = usuario ? usuario : "Invitado";
    }

    if (spanPass) {
        spanPass.textContent = password ? password : "";
    }
});


let tasks = [];
let editId = null;

function addTask() {
    const input = document.getElementById('taskInput');
    const priority = document.getElementById('priorityInput');
    const btnMain = document.getElementById('btn-main');

    if (input.value.trim() === "") return alert("Escribe una tarea");

    if (editId !== null) {
        tasks = tasks.map(t => (t.id === editId ? { ...t, text: input.value, priority: parseInt(priority.value) } : t));
        editId = null;
        btnMain.innerText = "Añadir";
        btnMain.classList.remove('edit-mode');
    } else {
        tasks.push({
            id: Date.now(),
            text: input.value,
            priority: parseInt(priority.value)
        });
    }

    input.value = "";
    renderTasks();
}

function editTask(id) {
    const input = document.getElementById('taskInput');
    const priority = document.getElementById('priorityInput');
    const btnMain = document.getElementById('btn-main');

    const task = tasks.find(t => t.id === id);
    input.value = task.text;
    priority.value = task.priority;
    input.focus();

    editId = id;
    btnMain.innerText = "Guardar Cambios";
    btnMain.classList.add('edit-mode');
}

function deleteTask(id) {
    if (editId === id) {
        editId = null;
        document.getElementById('taskInput').value = "";
        document.getElementById('btn-main').innerText = "Añadir";
        document.getElementById('btn-main').classList.remove('edit-mode');
    }
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    if (!taskList) return;
    taskList.innerHTML = "";

    tasks.sort((a, b) => a.priority - b.priority);

    tasks.forEach(task => {
        let pClass = task.priority === 1 ? 'p-alta' : (task.priority === 2 ? 'p-media' : 'p-baja');
        let pText = task.priority === 1 ? 'Alta' : (task.priority === 2 ? 'Media' : 'Baja');

        taskList.innerHTML += `
        <tr>
            <td>${task.text}</td>
            <td><span class="${pClass}">${pText}</span></td>
            <td>
                <button class="btn-table btn-edit-task" onclick="editTask(${task.id})">Editar</button>
                <button class="btn-table btn-delete-task" onclick="deleteTask(${task.id})">Eliminar</button>
            </td>
        </tr>
    `;
    });
}