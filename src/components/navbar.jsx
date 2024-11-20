import "../assets/navbar.css";
export default function NavBar({curPage, highlightColor}) {

    return (

        <div id="topNavBarDiv">
            
            <div className="topNavBarLogoLogin">
                <img className="topNavBarLogo" src="/SW_Logo.png" alt="Star Wars Logo"/>
                <img className="topNavBarLogoM" src="/SW_Logo_Mobile.png" alt="Star Wars Logo"/>
                <div className="topNavBarLoginDiv">
                    <a href="/">Log In</a>
                    <div className="topNavBarLoginSep">//</div>
                    <a href="/">Sign Up</a>
                </div>
            </div>

            <div className="topNavBarPageSelect">
                <a href="/" className="topNavBarPageLink">
                    <button className={
                        "topNavBarPageBtn "
                        + (curPage == "Home" ? "topNavBarPageActive " : "")
                        + (highlightColor ? "topNavBarPageActiveBlue" : "")
                    }>Home</button>
                </a>
                <a href="/Starships" className="topNavBarPageLink">
                    <button className={
                        "topNavBarPageBtn "
                        + (curPage == "Starships" ? "topNavBarPageActive " : "")
                        + (highlightColor ? "topNavBarPageActiveBlue" : "")
                    }>Starships</button>
                </a>

            </div>

        </div>

    )

}