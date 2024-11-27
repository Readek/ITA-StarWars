import { createContext, useState } from 'react';
import { fetchStarships } from "../data/Fetch Swapi.mjs";

const SwapiContext = createContext();

function SwapiProvider({ children }) {

    const [shipsData, setShipsData] = useState([]);
    const [shipsNextPage, setShipsNextPage] = useState();

    function askForStarships() {

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
    

    return (
        <SwapiContext.Provider value={{
            shipsData: shipsData, setShipsData: setShipsData,
            shipsNextPage: shipsNextPage, setShipsNextPage: setShipsNextPage,
            askForStarships: askForStarships
        }}>
            {children}
        </SwapiContext.Provider>
    );

}

export { SwapiContext, SwapiProvider };
