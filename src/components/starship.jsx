import { Link } from "react-router-dom";
import "../assets/starship.css";

export default function Starship({name, model, id}) {

    return (
        <Link to={"/Starship-Details/"+id} className="shipListDiv">
            <div className="shipListTitle">{name}</div>
            <div className="shipListModel">{model}</div>
        </Link>
    )

}