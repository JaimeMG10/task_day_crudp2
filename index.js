const tasks = getLocalStorage();
updateDOM();

document
  .getElementById("taskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir que la página se recargue

    // Aquí puedes agregar el código para manejar el envío del formulario
    createTask();
  });

//Esta función obtiene el valor del input y lo guarda en el array
function createTask() {
  //obtener el elemento del input text
  const inputTxt = document.getElementById("task-name");

  //acá guardamos el valor que hay dentro del input en la variable task_name
  let task_name = inputTxt.value;

  //acá se agrega la tarea al array
  tasks.push({
    name: task_name,
    status: false,
  });

  updateLocalStorage();
  window.alert("Tarea guardada exitosamente");
  inputTxt.value = "";
  clearDOM();
  updateDOM();
}

//esta función toma el array y lo guarda en el localstorage
function updateLocalStorage() {
  //Acá convertimos el arreglo en un string
  const tasksParsed = JSON.stringify(tasks);

  //acá guardamos el string convertido en el localstorage
  localStorage.setItem("tasks", tasksParsed);
}

function getLocalStorage() {
  //obtiene la información del localstorage y la guarda en la variable tasksLocalstorage
  const tasksLocalstorage = localStorage.getItem("tasks");
  // en caso que no encuentre nada en el local storage devuelve un array vacio
  // en caso que si encuentre devuelve el array convertido
  if (tasksLocalstorage === null) {
    return [];
  } else {
    const tasksParsed = JSON.parse(tasksLocalstorage);
    return tasksParsed;
  }
}

function updateDOM() {
  const taskList = document.getElementById("task-list");

  tasks.forEach((task) => {
    // Por cada elemento del array, crear un <li> y sus elementos internos
    let li = document.createElement("li");
    li.className = "task-item";

    let pName = document.createElement("p");
    pName.className = "task-item-name";
    pName.textContent = task.name;

    let btnStatus = document.createElement("button");
    btnStatus.className = "btn-status";
    if (task.status === true) {
      btnStatus.textContent = "✅";
    } else {
      btnStatus.textContent = "☑️";
    }
    btnStatus.addEventListener("click", function () {
      updateStatus(task);
    });

    let btnDelete = document.createElement("button");
    btnDelete.textContent = "🗑️";
    btnDelete.className = "btn-delete";

    btnDelete.addEventListener("click", function () {
      deleteTask(task);
    });

    li.appendChild(btnStatus);
    li.appendChild(pName);
    li.appendChild(btnDelete);

    taskList.appendChild(li); // Agregar el <li> al <ul>
  });
}

function clearDOM() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
}

function deleteTask(task) {
  const indexFound = tasks.findIndex((element) => element.name === task.name);
  if (indexFound === -1) {
    window.alert("Error: No se encontró la tarea a borrar");
  } else {
    tasks.splice(indexFound, 1);
    clearDOM();
    updateDOM();
    updateLocalStorage();
    window.alert("Tarea borrada exitosamente");
  }
}

function updateStatus(task) {
  const indexFound = tasks.findIndex((element) => element.name === task.name);
  if (indexFound === -1) {
    window.alert("Error: No se encontró la tarea a actualizar status");
  } else {
    tasks[indexFound].status = !tasks[indexFound].status;
    clearDOM();
    updateDOM();
    updateLocalStorage();
    window.alert("Estado cambiado exitosamente");
  }
}
