
function loadTableData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/todos", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            buildTable(data);
        } else {
            console.error("Error al cargar datos");
        }
    };

    xhr.send();
}


function buildTable(data) {
    var table = document.createElement("table");
    table.classList.add("data-table");

    var headerRow = table.insertRow();
    for (var key in data[0]) {
        var headerCell = document.createElement("th");
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
    }
    var headerCell = document.createElement("th");
    headerCell.textContent = "Acciones";
    headerRow.appendChild(headerCell);

    data.forEach(function (item) {
        var row = table.insertRow();
        for (var key in item) {
            var cell = row.insertCell();
            cell.textContent = item[key];
        }

        var deleteButtonCell = row.insertCell();
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", function () {
            table.deleteRow(row.rowIndex);
        });
        deleteButtonCell.appendChild(deleteButton);
    });


    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(table);
}


document.getElementById("tablaLink").addEventListener("click", function (event) {
    event.preventDefault();
    loadTableData();
});


// Función para crear una nueva columna con tarjetas
function createColumn() {
    var column = document.createElement("div");
    column.classList.add("column");

    var newTaskButton = document.createElement("button");
    newTaskButton.textContent = "Nueva Tarea";

    var taskList = document.createElement("ul");

    newTaskButton.addEventListener("click", function () {
        showNewTaskForm(taskList);
    });

    column.appendChild(newTaskButton);
    column.appendChild(taskList);

    return column;
}

// Función para mostrar el formulario de nueva tarea y agregar tarjeta
function showNewTaskForm(taskList) {
    var textarea = document.createElement("textarea");
    textarea.placeholder = "Escribe una nueva tarea...";

    var confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirmar";

    confirmButton.addEventListener("click", function () {
        addTask(taskList, textarea.value);
        textarea.value = ""; // Limpiar el textarea
    });

    taskList.appendChild(textarea);
    taskList.appendChild(confirmButton);
}

// Función para agregar una nueva tarjeta a la columna
function addTask(taskList, taskText) {
    if (taskText.trim() === "") {
        return; // Evitar tarjetas en blanco
    }

    var taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    taskList.appendChild(taskItem);
}

// Crear tres columnas
var columnsContainer = document.getElementById("columnsContainer");
for (var i = 0; i < 3; i++) {
    var column = createColumn();
    columnsContainer.appendChild(column);
}
