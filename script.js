const searchSection = document.querySelector('.wrapper_search');

//Create search form
const searchForm = document.createElement('form');
searchForm.classList.add('search__form');
//Вешаем событие, не забывать что у кнопки должен быть тип submit
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();//чтобы при клике на кнопку форма не обновлялась
  if (document.querySelector('.result-item')) deletePrevSearchResult();
  const request = Object.fromEntries(new FormData(e.target));
  const response = await fetch(`https://api.github.com/search/repositories?q=${request.name}`);

  if (response.ok) {
    const data = await response.json();
    if (document.querySelector('.error')) removeErrorMessage();
    if (data.items.length === 0 || searchInput.value.length < 2) {
      createErrorMessage();
    } else {
      createSearchResultItem(data);
    }
    searchInput.value = '';
    data.items.length = 0;
  } else {
    if (document.querySelector('.error')) removeErrorMessage();
    createErrorMessage();
  }
});

const searchInput = document.createElement('input');
searchInput.classList.add('search__input');
searchInput.setAttribute('name', 'name');

const searchButton = document.createElement('button');
searchButton.classList.add('search__button');
searchButton.setAttribute('type', 'submit');
searchButton.innerHTML = 'Search';

searchForm.appendChild(searchInput);
searchForm.appendChild(searchButton);

searchSection.appendChild(searchForm);

function createSearchResultItem(data) {
  const resultSection = document.querySelector('.wrapper_result');
  for (let item of data.items) {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');
    resultItem.innerHTML = `
    <a href="${item.clone_url}" class="result-item__link" target="_blank"><p class='result-item__name'>${item.name}</p></a>
    <p class='result-item__description'>${item.description}</p>
    <p class='result-item__language'>Language: ${item.language}</p>
    <p class='result-item__visiblity'>Visiblity: ${item.visibility}</p>
    `
    resultSection.appendChild(resultItem)
  }
}

function createErrorMessage() {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error');
  errorMessage.innerHTML = 'Repositories not found';
  searchForm.appendChild(errorMessage);
}

function removeErrorMessage() {
  errorMessage = document.querySelectorAll('.error');
  for (let item of errorMessage) {
    item.remove();
  }
}

function deletePrevSearchResult() {
  let items = document.querySelectorAll('.result-item');
  for (let item of items) {
    item.remove();
  }
}