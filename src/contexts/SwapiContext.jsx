import { createContext, useState } from 'react';
import { fetchFilms, fetchPeople, fetchStarships } from "../data/Fetch Swapi.mjs";

const SwapiContext = createContext();

function SwapiProvider({ children }) {

    const [shipsData, setShipsData] = useState([]);
    const [shipsNextPage, setShipsNextPage] = useState();
    const [peopleData, setPeopleData] = useState({});
    const [filmsData, setFilmsData] = useState({});

    async function askForStarships() {

        fetchStarships(shipsNextPage).then((jsonData) => {

            const newArr = [...shipsData];
            jsonData.results.forEach(result => {

                newArr.push(result);

                // for some reason, this api doesnt include an id field
                // so we have to manually create one
                const splits = result.url.split("/");
                newArr.at(-1).id = splits.at(-2);

            });

            // it also doesnt say which page are we on
            if (jsonData.next) {
                const splits = jsonData.next.split("/");
                setShipsNextPage(splits.at(-1));
            } else {
                setShipsNextPage(null);
            }

            setShipsData(newArr);

        })

    }

    async function askForCharacter(id) {
        const jsonData = await fetchPeople(id);
        setPeopleData(pd => addToObject(pd, jsonData, id));
        return jsonData;
    }

    async function askForFilm(id) {
        const jsonData = await fetchFilms(id);
        setFilmsData(fd => addToObject(fd, jsonData, id));
        return jsonData;
    }

    function addToObject(object, newData, id) {
        const tempData = {...object};
        tempData[id] = newData;
        return tempData;
    }

    return (
        <SwapiContext.Provider value={{
            shipsData: shipsData, shipsNextPage: shipsNextPage,
            askForStarships: askForStarships,
            peopleData: peopleData, askForCharacter: askForCharacter,
            filmsData: filmsData, askForFilm: askForFilm
        }}>
            {children}
        </SwapiContext.Provider>
    );

}

export { SwapiContext, SwapiProvider };
