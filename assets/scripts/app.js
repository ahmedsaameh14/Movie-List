const addModal = document.getElementById('add-modal');
const addMovieBtn = document.getElementById('add');
const backdrop = document.getElementById('backdrop');
const cancelModalBtn = document.getElementById('cancelmodal');
const addModalBtn = document.getElementById('addmodal');
const inputTitle = document.getElementById('title');
const inputImg = document.getElementById('image-url');
const inputRate = document.getElementById('rating');
const listRoot = document.getElementById('movie-list')

const movies = [];

const newMovieSection = (title, image, rate) =>{
    const newMovieElement = document.createElement('li');
    newMovieElement.className ='movie-element';
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
    <img src="${image}" alt="${title}">
    </div>
    <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rate}/5 Stars</p>
    </div>
    `;
    listRoot.append(newMovieElement);
    // Added
    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    newMovieElement.appendChild(span);
    saveData();
}



const toggleMovieModal = () => {
    addModal.classList.toggle('visible');
    backdrop.classList.toggle('visible');
    clearValues();
}

const clearValues = () => {
    inputTitle.value = '';
    inputImg.value = '';
    inputRate.value = '';  
}

const addMovieModal = () => {
    const titleValue = inputTitle.value;
    const imgValue = inputImg.value;
    const rateValue = inputRate.value;
    if ( 
        titleValue.trim() === '' ||
        imgValue.trim() === '' ||
        rateValue.trim() === '' || 
        +rateValue < 1 ||
        +rateValue > 5 ){
            alert("Please Enter Valid Values");
            return;
        }
    const newMovie = {
    title: titleValue,
    Image: imgValue,
    rating: rateValue
    };

    movies.push(newMovie);
    console.log(movies);
    toggleMovieModal();
    newMovieSection(newMovie.title , newMovie.Image , newMovie.rating);
    updateUI();
    saveData();
};

// To Save Data 
function saveData(){
    localStorage.setItem("data", listRoot.innerHTML);
}
function showTask(){
    listRoot.innerHTML = localStorage.getItem("data");
}
showTask()

addMovieBtn.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click' , toggleMovieModal);
cancelModalBtn.addEventListener('click' , toggleMovieModal);
addModalBtn.addEventListener('click', addMovieModal);
listRoot.addEventListener('click', (e) => {
    if (e.target.tagName === "SPAN")
        {
            e.target.parentElement.remove();
            saveData()
        }
})



