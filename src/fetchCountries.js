export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(response => response.json())
        .then(data => data.map(element => {
            return {
                name: element.name.official,
                capital: element.capital,
                population: element.population,
                languages: element.languages,
                flag: element.flags.svg,
            }
        }))
}
