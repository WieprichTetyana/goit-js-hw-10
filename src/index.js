import { fetchBreeds, fetchCatByBreed } from './cat-api';
/* import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
 */
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderInfo = document.querySelector('.loader');
const errorInfo = document.querySelector('.error');

/* const slim  = new SlimSelect({
    select: '.breed-select',
    placeholder: 'Select a breed',
    searchPlaceholder: 'Search',
}); */

window.addEventListener('DOMContentLoaded', onLoad);
breedSelect.addEventListener('change', onBreedSelectorChange);


function templateBreed({ name, id }) {
    return `<option value="${id}">${name}</option>`;
}

function fillBreeds(breeds) {
    const markup = breeds.map(templateBreed).join('');
    breedSelect.insertAdjacentHTML('afterbegin', markup);
}

function onLoad() {
    hideElement(breedSelect);
    showElement(loaderInfo); 
    fetchBreeds()
        .then(res =>
        {
            fillBreeds(res)
            hideElement(loaderInfo);
            showElement(breedSelect);
        })
        .catch(err => {
            hideElement(loaderInfo); 
            showElement(errorInfo);
            
            console.error(err);
        });
}

function onBreedSelectorChange(event) {
    showElement(loaderInfo); 
    hideElement(catInfo);
    fetchCatByBreed(event.target.value)
        .then(res => {
            renderCat(res);
            hideElement(loaderInfo); 
            showElement(catInfo);
        })
        .catch(err => {
            hideElement(loaderInfo); 
            showElement(errorInfo);
            
            console.error(err);
        });
}

function showElement(element) {
    element.style.display = 'block';
}

function hideElement(element) {
    element.style.display = 'none';
}



function templateCatInfo(cat) {
    return `
    
    <img
    src = "${cat[0].url}"
    alt = "${cat[0].breeds[0].name}"
    width = "300"
     class = "catimage"/>
    
    <div class="cat">
    <h2 class="cat-name">${cat[0].breeds[0].name}</h2>
    <p class="cat-desc">${cat[0].breeds[0].description}</p>
    </div>`;
}

function renderCat(cat) {
    const markup = templateCatInfo(cat);
    catInfo.innerHTML= markup;
}