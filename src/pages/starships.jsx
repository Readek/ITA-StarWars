import { useEffect } from "react";
import NavBar from "../components/navbar";
import { fetchStarships } from "../data/Fetch Swapi.mjs";
import { useState } from "react";
import Starship from "../components/starship";
import "../assets/starships.css";

let storedNextPage = "";

export default function Starships() {

    const [shipData, setShipData ] = useState([]);
    const [nextPage, setNextPage ] = useState();

    useEffect( () => {
        askForStarships(nextPage);
    }, [nextPage])

    function askForStarships(page) {

        const data = fetchStarships(page);
        data.then((jsonData) => {

            const newArr = [...shipData];
            jsonData.results.forEach(result => {
                newArr.push(result);
            });
            setShipData(newArr);

            storedNextPage = jsonData.next;

        })

    }
    
    // initial fetch
    useEffect( () => {
        askForStarships();
    }, []);

    return (
        <>

            <NavBar curPage={"Starships"} highlightColor={true}/>
            
            {shipData.length ? (
                <div className="shipList">
                    {shipData.map(ship => (
                    <Starship name={ship.name} model={ship.model} />
                    ))}
                </div>
            ) : null}

        </>
    )
}