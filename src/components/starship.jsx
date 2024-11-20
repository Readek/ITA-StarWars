import "../assets/starship.css";

export default function Starship({name, model}) {
    
    return (
        <div className="shipListDiv">
            <div className="shipListTitle">{name}</div>
            <div className="shipListModel">{model}</div>
        </div>
    )

}