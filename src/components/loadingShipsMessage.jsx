import { useContext, useEffect } from "react";
import { loadShipsObserver } from "../hooks/loadShipsObserver";
import { SwapiContext } from "../contexts/SwapiContext";

let isAlreadyLoading = false;

export default function LoadingShipsMessage() {

    const { askForStarships } = useContext(SwapiContext);

    // this controls when to fetch next ship page
    const [ loadRef, isLoadVisible ] = loadShipsObserver({
        threshold: 1.0
    })
    useEffect( () => {
        if (isLoadVisible && !isAlreadyLoading) {
            isAlreadyLoading = true;
            askForStarships().then(() => {
                isAlreadyLoading = false;
            });
        }
    }, [isLoadVisible])

    return (<>

    <div ref={loadRef} className="shipListLoadingDiv">
        <div className="shipListLoading">Loading more ships...</div>
    </div>

    </>)

}