import { useContext, useEffect } from "react";
import NavBar from "../components/navbar";
import Starship from "../components/starship";
import "../assets/starships.css";
import { SwapiContext } from "../contexts/SwapiContext";
import LoadingShipsMessage from "../components/loadingShipsMessage";

export default function Starships() {

    const {shipsData, shipsNextPage, askForStarships} = useContext(SwapiContext);

    // initial fetch
    useEffect( () => {
        if (!shipsData.length) askForStarships();
    }, []);

    return (<>

    <NavBar curPage={"Starships"} highlightColor={true}/>

    <div className="shipList">

        {shipsData[1] && (<>

            {shipsData.map(ship => (
                <Starship
                    name={ship.name}
                    model={ship.model}
                    id={ship.id}
                />
            ))}

            {shipsNextPage !== null && (
                <LoadingShipsMessage/>
            )}

        </>)}

    </div>

    </>)

}
