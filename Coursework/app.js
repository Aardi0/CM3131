//Home constants
const homeNav = document.getElementById('home-nav');
const homePage = document.getElementById('home-page');
homeNav.root = homePage;

//Plant constants
const plantsNav = document.getElementById('plants-nav');
const plantsPage = document.getElementById('plants-page');
plantsNav.root = plantsPage;

const categoryLabel = document.getElementById('lbl-category');
const climateLabel = document.getElementById('lbl-climate');
const commonLabel = document.getElementById('lbl-common');
const familyLabel = document.getElementById('lbl-family');
const idealLightLabel = document.getElementById('lbl-ideallight');
const latinLabel = document.getElementById('lbl-latin');
const originLabel = document.getElementById('lbl-origin');
const maxTempLabel = document.getElementById('lbl-maxtemp');
const minTempLabel = document.getElementById('lbl-mintemp');
const tolLightLabel = document.getElementById('lbl-tollight');
const useLabel = document.getElementById('lbl-use');
const wateringLabel = document.getElementById('lbl-watering');

let plantImage = document.getElementById('plantImage');

//Tasks constants
const taskNav = document.getElementById('task-nav');
const taskPage = document.getElementById('task-page'); 
taskNav.root = taskPage;

//Search feature
const searchbar = document.querySelector('ion-searchbar');
let debounceTimer;

searchbar.addEventListener('ionInput', function(event) {
    clearTimeout(debounceTimer);
    const userInput = event.target.value;
    //Timer to limit api requests
    debounceTimer = setTimeout(function () {
        fetchPlantData(userInput);
    }, 1000)
});


//Get plant info and image
function fetchPlantData(commonName) { 
    let apiUrl = 'https://house-plants.p.rapidapi.com/common/' + commonName;
    const plantApi = {
        async: true,
        crossDomain: true,
        //url: 'https://house-plants.p.rapidapi.com/all',
        url: apiUrl,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '176ddedfa6msha896b2074447550p165777jsnea5abcda3a4c',
            'X-RapidAPI-Host': 'house-plants.p.rapidapi.com'
        }
    };

    try {
    //Get plant data
    $.ajax(plantApi).done(function (response) {

        let plantData = response[0];

        //Append plant data to labels
        categoryLabel.textContent = plantData.category;
        climateLabel.textContent = plantData.climate;
        commonLabel.textContent = plantData.common;
        familyLabel.textContent = plantData.family;
        idealLightLabel.textContent = plantData.ideallight;
        latinLabel.textContent = plantData.latin;
        originLabel.textContent = plantData.origin;
        maxTempLabel.textContent = plantData.tempmax.celsius + '°C';
        minTempLabel.textContent = plantData.tempmin.celsius + '°C';
        tolLightLabel.textContent = plantData.toleratedlight;
        useLabel.textContent = plantData.use;
        wateringLabel.textContent = plantData.watering;

        console.log(response);

        //Getting common names for data
        // const common = response.map(response => response.common);
        // console.log(common);

    });
    } catch (error) {
        reportError(error);
    }
    //Get plant image 
    // const imgApi = {
    //     async: true,
    //     crossDomain: true,
    //     url: 'https://duckduckgo-image-search.p.rapidapi.com/search/image?q=' + commonName + " plant",
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': '176ddedfa6msha896b2074447550p165777jsnea5abcda3a4c',
    //         'X-RapidAPI-Host': 'duckduckgo-image-search.p.rapidapi.com'
    //     }
    // };

    // $.ajax(imgApi).done(function (response) {

    //     plantImage = response.results[0].image;
    //     console.log(plantImage);

    // });
}

async function reportError(anError) {
    console.log(anError);

    categoryLabel.textContent = " ";
    climateLabel.textContent = " ";
    commonLabel.textContent = " ";
    familyLabel.textContent = " ";
    idealLightLabel.textContent = " ";
    latinLabel.textContent = " ";
    originLabel.textContent = " ";
    maxTempLabel.textContent = "Not known";
    minTempLabel.textContent = "Not known";
    tolLightLabel.textContent = " ";
    useLabel.textContent = " ";
    wateringLabel.textContent = " ";

}

//------------------------My Garden---------------------------
//console.log(photoGallery);

document.addEventListener('DOMContentLoaded', function() {
    displayPhotos();
  });
//Function to display photos
function displayPhotos() {
    const gallery = document.querySelector('.gallery');

    //Gets each element in the gallery object
    photoGallery.forEach(photo => {
      const img = document.createElement('img');
      img.src = photo.url;
      img.alt = photo.caption;
  
      const figcaption = document.createElement('figcaption');
      figcaption.textContent = photo.caption;
      
      //Append the figure to the gallery container
      const figure = document.createElement('figure');
      figure.appendChild(img);
      figure.appendChild(figcaption);
  
      gallery.appendChild(figure);
      
    });
  }
  
//---------------------Task Storage----------------------------

const taskNameInput = document.getElementById('taskName');
const taskDescriptionInput = document.getElementById('taskDescription');
const dueDateInput = document.getElementById('dueDate');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

//Load content when page has loaded
document.addEventListener('DOMContentLoaded', () => {
    getTasks();
  });

document.addEventListener('DOMContentLoaded', function() {
    addTaskButton.addEventListener('click', addTask);
});

//Add tasks
function addTask() {
    const taskName = taskNameInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();
    const dueDate = dueDateInput.value.trim();
  
    //Task object
    const task = {
      name: taskName,
      description: taskDescription,
      dueDate: dueDate
    };

//Add task to the list
  const item = document.createElement('ion-item');
  item.innerHTML = `
    <ion-label>${task.name}</ion-label>
    <ion-note slot="end">${task.dueDate}</ion-note>
    <ion-note>${task.description}</ion-note>
  `;
  taskList.appendChild(item);

  //Save task to local storage
  saveTask(task);
}

//Save tasks in a new array
function saveTask(task) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

//Get tasks from the local storage
function getTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = storedTasks.map(task => `
      <ion-item>
        <ion-label>${task.name}</ion-label>
        <ion-note>${task.description}</ion-note>
        <ion-note slot="end">${task.dueDate}</ion-note>
      </ion-item>
    `).join('');
}


