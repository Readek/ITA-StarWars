import { Link, useNavigate } from "react-router-dom";
import "../assets/navbar.css";
import { useAuth } from "../contexts/AuthContext";
import { doSignOut } from "../firebase/auth.mjs";
export default function NavBar({curPage, highlightColor}) {

    const navigate = useNavigate();
    const { userLoggedIn, currentUser } = useAuth();

    return (

    <div id="topNavBarDiv">

        <div className="topNavBarLogoLogin">
            <img className="topNavBarLogo" src="/ITA-StarWars/SW_Logo.png" alt="Star Wars Logo"/>
            <img className="topNavBarLogoM" src="/ITA-StarWars/SW_Logo_Mobile.png" alt="Star Wars Logo"/>

            <div className="topNavBarLoginDiv">

                { !userLoggedIn ? <>

                    <Link to={"/SignIn"}>Sign In</Link>
                    <Link to={"/SignUp"}>Sign Up</Link>

                </> : <>
                    
                    <div className="topNavBarUserName">
                        {currentUser.displayName ? currentUser.displayName : currentUser.email}
                    </div> 
                    <button
                        className="topNavBarSignOut"
                        onClick={() => { doSignOut().then(() => {navigate('/')})}}
                    >Sign Out</button>

                </>}

            </div>

        </div>

        <div className="topNavBarPageSelect">
            <Link to={"/"} className="topNavBarPageLink">
                <button className={
                    "topNavBarPageBtn "
                    + (curPage == "Home" ? "topNavBarPageActive " : "")
                    + (highlightColor ? "topNavBarPageActiveBlue" : "")
                }>Home</button>
            </Link>
            <Link to={"/Starships"} className="topNavBarPageLink">
                <button className={
                    "topNavBarPageBtn "
                    + (curPage == "Starships" ? "topNavBarPageActive " : "")
                    + (highlightColor ? "topNavBarPageActiveBlue" : "")
                }>Starships</button>
            </Link>

        </div>

    </div>

    )

}