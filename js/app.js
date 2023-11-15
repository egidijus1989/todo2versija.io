let savePriority = document.querySelector('#savePriority');
let pasirinktasPrioritetas;
savePriority.addEventListener('click', ()=>{
    let select1 = document.querySelector('.form-select-1');
    pasirinktasPrioritetas.textContent = select1.value;
    pasirinktasPrioritetas.classList.add('Low');
    console.log(pasirinktasPrioritetas.textContent);
    if (pasirinktasPrioritetas.textContent == "Low"){
        pasirinktasPrioritetas.classList = "Low";
    }
    else if (pasirinktasPrioritetas.textContent == "Normal"){
        pasirinktasPrioritetas.classList = "Normal";
    }
    else if (pasirinktasPrioritetas.textContent == "High"){
        pasirinktasPrioritetas.classList = "High";
    }
    
})

// Function to retrieve tasks from localStorage and display them
function displayTasks() {
  var taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Clear previous table rows

  // Retrieve tasks from localStorage or initialize an empty array
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Display tasks in the table
  let table = document.querySelector('.tbody');
  tasks.forEach(function(task, index) {
    var row = taskList.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    table.appendChild(row);

    
    //cell1 aprasymas//////////////////////////////////////////////////////
    let checkDiv = document.createElement('div');
    checkDiv.classList = "form-check";
    let checkInput = document.createElement('input');
    checkInput.classList = "form-check-input";
    checkInput.type = "checkbox";
    checkInput.setAttribute = ('id', "flexCheckDefault");
    let checklabel = document.createElement('label');
    checklabel.classList = "form-check-label";
    checklabel.setAttribute = ('for', "flexCheckDefault");
    checkDiv.appendChild(checkInput);
    checkDiv.appendChild(checklabel);
    const handleChange = (e) => {
      e.target.checked 
         ? cell2.classList.add('checked')
         : cell2.classList.remove('checked');
    }
    cell1.addEventListener('change', handleChange);
    cell1.appendChild(checkDiv);

    //cell2 aprasymas//////////////////////////////////////////////////////
    cell2.textContent = task.name;

    //cell3 aprasymas//////////////////////////////////////////////////////
    cell3.textContent = task.priority;
    if (cell3.textContent == "Low"){
      cell3.classList = "Low";
    }
    else if (cell3.textContent == "Normal"){
      cell3.classList = "Normal";
    }
    else if (cell3.textContent == "High"){
      cell3.classList = "High";
    }
    cell3.ondblclick = function() {
      updatePriority();
    }
    cell3.addEventListener('dblclick', ()=>{
      pasirinktasPrioritetas = cell3
      const myModal = new bootstrap.Modal('#exampleModal');
      myModal.show();
      saveData();/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  })
    //cell4 aprasymas//////////////////////////////////////////////////////
    cell4.textContent = task.dueDate;

    //cell5 aprasymas//////////////////////////////////////////////////////
      cell5.ondblclick = insertStatus;
  function insertStatus(){
    status1 = parseInt(prompt("Progress of work in percents", "0"), 10);
    if (status1 >= 0 && status1 <= 100) {
        if (status1 == 0) {
            cell5.textContent = `New`;
            progressBar.style.width = `${status1}%`;
            progressBar.textContent = `${status1} %`;
        }
        else if (status1 >=100){
            cell5.textContent = `Complete`;
            progressBar.style.width = `${status1}%`;
            progressBar.textContent = `${status1} %`;
        }
        else {
            cell5.textContent = `In Progress`;
            progressBar.style.width = `${status1}%`;
            progressBar.textContent = `${status1} %`;
        }   
    }
    else {
        alert('Progress value need to be between 0 and 100 %')
    }
  }
    //cell6 aprasymas//////////////////////////////////////////////////////
    let progress = document.createElement('div');
    progress.classList = 'progress';
    progress.role = "progressbar";
    progress.setAttribute('aria-label', "Success example");
    progress.setAttribute('aria-valuenow', "25");
    progress.setAttribute('aria-valuemin', "0");
    progress.setAttribute('aria-valuemax', "100");
    let progressBar = document.createElement('div');
    progressBar.classList = "progress-bar bg-success";
    progressBar.style.width = `${0}%`;
    progressBar.textContent = `${0} %`;
    progress.appendChild(progressBar);
    cell6.appendChild(progress);


    //cell7 aprasymas////////////////////////////////////////////////////////////////////////////////
    cell7.textContent = '';
    cell3.addEventListener('dblclick', ()=>{
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      let hour = date.getHours();
      let minyte = date.getMinutes();
      cell7.textContent = `${day}/${month +1}/${year} ${hour}:${minyte}`;
    });
  cell5.addEventListener('dblclick', ()=>{
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      let hour = date.getHours();
      let minyte = date.getMinutes();
      cell7.textContent = `${day}/${month +1}/${year} ${hour}:${minyte}`;
    });

    //cell8 aprasymas//////////////////////////////////////////////////////
    let del = document.createElement('button');
    del.classList = "btn-close";
    del.type = "button";
    del.setAttribute('aria-label', "Close");
    cell8.addEventListener('click', ()=>{
      row.remove();
    })
    cell8.appendChild(del);
    

    //updatines funkcijos//////////////////////////////////////////////////////
  });
}

// Function to add a new task to the list
function addTask() {
  //cell2 inputas//////////////////////////////////////////////////////
  var taskInput = document.getElementById('inputBox1').value.trim();
  //cell3 inputas//////////////////////////////////////////////////////
  function getPriority() {
  selectElement = document.querySelector('.form-select');
  output = selectElement.value;
  return output;
  }
  var priorityInput = getPriority();
  //cell4 inputas//////////////////////////////////////////////////////
  var dateInput = document.getElementById('inputBox3').value;
  
  if (taskInput !== '') {
    // Retrieve existing tasks or initialize an empty array
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Add new task object to tasks array
    var newTask = {
      name: taskInput,
      priority: priorityInput,
      dueDate: dateInput,
      status: '',
      progress: '',
      modify: ''
    };
    tasks.push(newTask);

    // Save updated tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Display the updated list of tasks
    displayTasks();

    // Clear input fields after adding a task
    document.getElementById('inputBox1').value = '';
    document.querySelector('.form-select').value = '';
    document.getElementById('inputBox3').value = '';
  }
}

// Function to update a task in the list
function updateTask(index) {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  var newName = prompt('Enter new task name:');
  var newPriority = prompt('Enter new priority:');
  var newDueDate = prompt('Enter new due date:');

  if (newName !== null && newName !== '') {
    tasks[index].name = newName;
    tasks[index].priority = newPriority;
    tasks[index].dueDate = newDueDate;

    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
  }
}

// Display tasks when the page loads
displayTasks();