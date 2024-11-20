const url = "https://swapi.dev/api/";

/**
 * Asks for starships in a given page
 * @param {String?} customUrl - To ask for specific pages
 */
export async function fetchStarships(customUrl = null) {
    
    const data = await fetch(customUrl || url + "starships");
    if (!data.ok) return null;
    return data.json();

}