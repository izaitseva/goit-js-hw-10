import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
let countriesInfo = document.querySelector('.country-info')
let countrieslist = document.querySelector('.country-list');
let inputRef = document.getElementById('search-box');

console.log('loh');

inputRef.addEventListener('input', debounce(() => {
    onInput();
}, DEBOUNCE_DELAY));

function onInput() {
    let name = inputRef.value.trim();

    if (!name) {
        countrieslist.innerHTML = '';
        return;
    }

    fetchCountries(name)
        .then(data => {
            if (data.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (data.length >= 2 && data.length <= 10) {
                const markup = data.map(item => `
                <li class="item item_2">
                    <img class="img_2" src="${item.flags.svg}" alt="flag_image">
                    <p class="name_2">${item.name.official}</p>
                </li>
                `).join('')
                countrieslist.innerHTML = markup
            } else {
                const markup = data.map(item => `
                        <li class="item">
                            <img class="img" src="${item.flags.svg}" alt="flag_image">
                            <p class="name">${item.name.official}</p>
                            <p class="capital"><b>Capital:</b> ${item.capital}</p>
                            <p class="population"><b>Population:</b> ${item.population}</p>
                            <p class="languages"><b>Languages:</b> ${item.languages ? Object.values(item.languages).toString() : ''}</p>
                        </li>
                        `).join('')
                countrieslist.innerHTML = markup
            }
        }).catch(() => {
            Notiflix.Notify.failure("Oops, there is no country with that name");
        });
}
