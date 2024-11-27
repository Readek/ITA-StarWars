import { useEffect, useRef, useState } from "react";

export const loadShipsObserver = (options) => {

    const loadRef = useRef();
    const [ isLoadVisible, setIsVisible ] = useState(false);  

    const callbackFunction = (entries) => {
        const [ entry ] = entries;
        setIsVisible(entry.isIntersecting);
    }

    useEffect( () => {
        const observer = new IntersectionObserver(callbackFunction, options);
        if (loadRef.current) observer.observe(loadRef.current);

        return () => {
            if (loadRef.current) observer.unobserve(loadRef.current);
        }
    }, [loadRef, options])

    return [loadRef, isLoadVisible];

}