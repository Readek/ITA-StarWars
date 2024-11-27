import { useLoaderData } from "react-router-dom";
import NavBar from "../components/navbar";
import { fetchStarship } from "../data/Fetch Swapi.mjs";
import { useContext, useEffect, useState } from "react";
import "../assets/starship-details.css"
import { SwapiContext } from "../context/SwapiContext";

const visualUrl = "https://starwars-visualguide.com/assets/img/";

export async function loader({params}) {
    return params.shipId;
}

export default function StarshipDetails() {

    const { shipsData } = useContext(SwapiContext);
    const [shipData, setShipData ] = useState({});

    const shipId = useLoaderData();
    
    // initial fetch
    useEffect( () => {

        // stored data
        for (let i = 0; i < shipsData.length; i++) {
            if (shipsData[i].id == shipId) {
                setShipData(shipsData[i]);                
                return;
            }
        }

        // no matching stored data? go fetch it
        fetchStarship(shipId).then((data) => {
           setShipData(data)
        });

    }, []);

    return (<>

    <NavBar curPage={"Starships"} highlightColor={false}/>

    <div className="shipDetailsContent">

        <div className="shipDetailsStarshipTitle">Starship</div>

        <div className="shipDetailsShipDiv">

            <img
                src={`${visualUrl}starships/${shipId}.jpg`}
                alt="Starship Image"
                className="shipDetailsShipImg"
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="/Starship_Placeholder.jpg";
                }}
            />

            <div className="shipDetailsDetDiv">

                <div className="shipDetailsDetName">{shipData.name}</div>
                <div className="shipDetailsDetDesc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus est similique voluptatem. Deleniti dignissimos debitis facilis necessitatibus! Maiores adipisci numquam omnis nihil! Quidem quasi expedita, ipsa consequuntur nulla adipisci veritatis!</div>
                <div className="shipDetailsDetProps">
                    <div>Model: {shipData.model}</div>
                    <div>Manufacturer: {shipData.manufacturer}</div>
                    <div>Cost in credits: {shipData.cost_in_credits}</div>
                    <div>Length: {shipData.length}</div>
                    <div>Atmospheric Speed: {shipData.max_atmosphering_speed}</div>
                    <div>Crew: {shipData.crew}</div>
                </div>

            </div>

        </div>

    </div>

    </>)

}