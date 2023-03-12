const searchSection = document.querySelector('.wrapper_search');

//Create search form
const searchForm = document.createElement('form');
searchForm.classList.add('search__form');
//Вешаем событие, не забывать что у кнопки должен быть тип submit
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();//чтобы при клике на кнопку форма не обновлялась

  const request = Object.fromEntries(new FormData(e.target));
  const response = await fetch(`https://api.github.com/search/repositories?q=${request.name}`);

  if (response.ok) {
    const data = await response.json();
    console.log(data)
    //Create search result item
    createSearchResultItem(data);

  } else {
    alert('Репозиторий не найден')
  }
  
})

const searchInput = document.createElement('input');
searchInput.classList.add('search__input');
searchInput.setAttribute('name', 'name');

const searchButton = document.createElement('button');
searchButton.classList.add('search__button');
searchButton.setAttribute('type', 'submit');
searchButton.innerHTML = 'Search'

searchForm.appendChild(searchInput);
searchForm.appendChild(searchButton);

searchSection.appendChild(searchForm);

function createSearchResultItem(data) {
  const resultSection = document.querySelector('.wrapper_result');
  for (let item of data.items) {
    console.log(item)
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');
    resultItem.innerHTML = `
    <a href="${item.clone_url}" target="_blank"><p class='result-item__name'>${item.name}</p></a>
    <p class='result-item__description'>${item.description}</p>
    `
    resultSection.appendChild(resultItem)
  }
  
}