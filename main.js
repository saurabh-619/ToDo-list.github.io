//Define UI Vars
var form = document.querySelector("#task-form"); //for submit
var taskList = document.querySelector(".collection");//ul for appending the content
var taskInput = document.querySelector("#task");//input from user
var filter = document.querySelector("#filter");//filtering the tasks
var clearBtn = document.querySelector(".clear-tasks");//clear btn


//call all eventListeners
loadEventListeners();
 
function loadEventListeners()
{


  //DOM event loader(For LocalStorage)
  document.addEventListener("DOMContentLoaded", getTask);



  //Add task Event
  form.addEventListener("submit",addTask);
  //Remove Event
  taskList.addEventListener("click",removeTask);//event is triggered on clicking anywhere on ul

  //Clear Button Event
  clearBtn.addEventListener("click",clearAllTasks);

  //Filter the Tasks Event
  filter.addEventListener("keyup",filterTasks);


}











//Get Tasks from LocalStorage
function getTask() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (iterator) {
    //create li-tag
    var newLi = document.createElement("li");
    //add class
    newLi.classList = 'collection-item';
    //create  and add text-node
    var userTextNode = document.createTextNode(iterator);
    newLi.appendChild(userTextNode);

    //add  anchor tag
    var userAnchor = document.createElement("a");
    userAnchor.classList = "delete-item secondary-content";
    userAnchor.setAttribute("href", "#");
    userAnchor.innerHTML = '<i class="fa fa-remove"></i>'
    newLi.appendChild(userAnchor);
    //Add newLi to ul
    taskList.appendChild(newLi);

  });
}

//Add task

function addTask(event) {
  if (taskInput.value === '') { alert("Add the Task First!!! "); }

  //else create li-element to add task
  //create li-tag
  var newLi = document.createElement("li");
  //add class
  newLi.classList = 'collection-item';
  //create  and add text-node
  var userTextNode = document.createTextNode(taskInput.value);
  newLi.appendChild(userTextNode);

  //add  anchor tag
  var userAnchor = document.createElement("a");
  userAnchor.classList = "delete-item secondary-content";
  userAnchor.setAttribute("href", "#");
  userAnchor.innerHTML = '<i class="fa fa-remove"></i>'
  newLi.appendChild(userAnchor);
  //Add newLi to ul
  taskList.appendChild(newLi);


  //Store in LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  //clear input after submitted from user
  taskInput.value = '';

  event.preventDefault();
}

//Store to Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);// pushes task from user into tasks array

  //set it to localstorage in the form of string 
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


//Remove task
function removeTask(event) {
  //triger the event only on clicking on remove-icon
  if (event.target.classList.contains("fa"))
  {
    //remove the li which is parent of parent of the icon  
    if (confirm("Are you SURE ?")) 
    {
      var liRemove = event.target.parentElement.parentElement;
      liRemove.remove();

      //Remove from LocalStorage
      removeTaskFromLocalStorage(liRemove);
    }
    event.preventDefault();
  }
}


//Remove From localStorage
function removeTaskFromLocalStorage(itemToRemoved)
{
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(iterator,iteratorIndex){
    if(itemToRemoved.textContent === iterator)
    {
      tasks.splice(iteratorIndex,1);
    }
    localStorage.setItem("tasks",JSON.stringify(tasks)); 
  });
  event.preventDefault();
}



//Clear All Tasks
function clearAllTasks(event)
{
  if (confirm("Are you SURE ?")){
  // Clear entire ul


  //method-1  (Dont use)
  // taskList.remove();
  // event.preventDefault(); by this we will not be able to Add Tasks again

  //method-2
  // taskList.innerHTML = '';

  //method-3 we will remove li from ul till there is no firstChild to ul(Faster)
  while(taskList.firstChild)
  {
    taskList.removeChild(taskList.firstChild);
  }

  //clear from LocalStorage
  localStorage.clear();
  event.preventDefault();
 }
}


//Filter the Tasks
function filterTasks(event)
{
  const filterInput = event.target.value.toLowerCase();

  var liItems = document.querySelectorAll(".collection-item");

  liItems.forEach(function(iterator){
  const liItemText = iterator.firstChild.textContent.toLowerCase();
  if (liItemText.indexOf(filterInput) != -1)
  {
    iterator.style.display = "block";
  }
  else
  {
    iterator.style.display = "none"; 
  }

  });
 
}
