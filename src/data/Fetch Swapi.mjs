const url = "https://swapi.dev/api/";

/**
 * Asks for starships in a given page
 * @param {String?} pageParam - To ask for specific pages
 */
export async function fetchStarships(pageParam = "") {
    
    const data = await fetch(`${url}starships/${pageParam || ""}`);
    if (!data.ok) return null;
    return data.json();

}

/**
 * Asks for a specific starship
 * @param {Number} id - Ship id
 */
export async function fetchStarship(id) {
    
    const data = await fetch(url + "starships/" + id);
    if (!data.ok) return null;
    return data.json();

}

/**
 * Asks for a specific character
 * @param {Number} id - Character id
 */
export async function fetchPeople(id) {
    
    const data = await fetch(url + "people/" + id);
    if (!data.ok) return null;
    return data.json();

}