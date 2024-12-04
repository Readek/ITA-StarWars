import { useContext, useEffect, useState } from "react"
import { SwapiContext } from "../contexts/SwapiContext";
import "../assets/pilot.css";

const visualUrl = "https://starwars-visualguide.com/assets/img/characters/";

export default function Pilot({pilotId}) {

    const { peopleData, askForCharacter } = useContext(SwapiContext);
    const [ pilotData, setPilotData ] = useState()
    const [ id, setId ] = useState();

    useEffect( () => {

        // get proper id number        
        const splits = pilotId.split("/");
        const actualId = splits.at(-2);
        setId(actualId);
        
        if (!peopleData[actualId]) {
            askForCharacter(actualId).then((pilotData) => {                           
                setPilotData(pilotData);                
            });
        } else {
            setPilotData(peopleData[actualId]);
        }

    }, [])

    return (<>
    
    {pilotData && (

        <div className="pilotDiv">

            <img className="pilotImg" src={`${visualUrl+id}.jpg`} alt="Pilot Image" />
            <div className="pilotName">{pilotData.name}</div>

        </div>

    )}

    </>)
    
}