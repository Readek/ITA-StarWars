import { useContext, useEffect, useState } from "react"
import { SwapiContext } from "../contexts/SwapiContext";
import "../assets/film.css";

const visualUrl = "https://starwars-visualguide.com/assets/img/films/";

export default function Film({filmId}) {

    const { filmsData, askForFilm } = useContext(SwapiContext);
    const [ filmData, setFilmData ] = useState()
    const [ id, setId ] = useState();

    useEffect( () => {

        // get proper id number      
        const splits = filmId.split("/");
        const actualId = splits.at(-2);
        setId(actualId);
        
        if (!filmsData[actualId]) {
            askForFilm(actualId).then((fData) => {
                setFilmData(fData);
            });
        } else {
            setFilmData(filmsData[actualId]);
        }

    }, [])

    return (<>
    
    {filmData && (

        <div className="filmDiv">

            <img className="filmImg" src={`${visualUrl+id}.jpg`} alt="Film Image" />
            <div className="filmName">{filmData.title}</div>

        </div>

    )}

    </>)
    
}