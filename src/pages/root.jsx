import NavBar from "../components/navbar";
import "../assets/root.css"
import { Link } from "react-router-dom";

export default function Root() {
    return (<>

    <NavBar curPage={"Home"} highlightColor={true}/>

    <div className="homeContent">
        <div className="homeTitle">Welcome!</div>
        <div className="homeDescriptionDiv">
            <div className="homeDescription">This is an IT Academy exercice themed around Star Wars.</div>
            <div className="homeDescription">It's a React project using react-router-dom, Firebase, and the SWAPI API.</div>
            <div className="homeDescription">Most of the bulk of this project is on the Starships page.</div>           
        </div>
        <Link to={"/Starships"}>
            <button className="homeStarshipsBtn">Go to Starships</button>
        </Link>
    </div>

    </>)
}