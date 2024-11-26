import { useContext, useEffect } from "react";
import NavBar from "../components/navbar";
import { fetchStarships } from "../data/Fetch Swapi.mjs";
import { useState } from "react";
import Starship from "../components/starship";
import "../assets/starships.css";
import { SwapiContext } from "../context/SwapiContext";

let storedNextPage = "";

export default function Starships() {

    const { shipsData, setShipsData } = useContext(SwapiContext);
    const [nextPage, setNextPage ] = useState();

    /* useEffect( () => {
        if (!nextPage) return;
        askForStarships(nextPage);
    }, [nextPage]) */

    // initial fetch
    useEffect( () => {
        if (!shipsData.length) askForStarships();
    }, []);

    function askForStarships(page) {

        fetchStarships(page).then((jsonData) => {

            const newArr = [...shipsData];
            jsonData.results.forEach(result => {

                newArr.push(result);

                // for some reason, this api doesnt include an id field
                // so we have to manually create one
                const splits = result.url.split("/");
                newArr.at(-1).id = splits.at(-2);

            });

            storedNextPage = jsonData.next;

            setShipsData(newArr);

        })

    }

    return (<>

    <NavBar curPage={"Starships"} highlightColor={true}/>

    <div className="shipList">
    
    {shipsData.length ? (
        <>
        {shipsData.map(ship => (
        <Starship
            name={ship.name}
            model={ship.model}
            id={ship.id}
        />
        ))}
        </>
    ) : null}

    </div>

    </>)

}
