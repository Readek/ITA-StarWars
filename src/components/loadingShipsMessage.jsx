import { useContext, useEffect } from "react";
import { SwapiContext } from "../context/SwapiContext";
import { loadShipsObserver } from "../hooks/loadShipsObserver";

export default function LoadingShipsMessage() {

    const { askForStarships } = useContext(SwapiContext);

    // this controls when to fetch next ship page
    const [ loadRef, isLoadVisible ] = loadShipsObserver({
        threshold: 1.0
    })
    useEffect( () => {
        if (isLoadVisible) askForStarships();
    }, [isLoadVisible])

    return (<>

    <div ref={loadRef} className="shipListLoadingDiv">
        <div className="shipListLoading">Loading more ships...</div>
    </div>

    </>)

}