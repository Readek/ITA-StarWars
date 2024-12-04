import { useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import { doSignInWithEmailAndPassword } from "../firebase/auth.mjs";
import { Link, Navigate } from "react-router-dom";
import "../assets/signInUp.css";

export default function SignIn() {

    const { userLoggedIn } = useAuth();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isSigningIn, setIsSigningIn ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (e) {
                setErrorMessage(e.message);
                setIsSigningIn(false);
            }
        }
    }
    
    return (<>
    
    <div className="signInContent">

    <Link to={"/"}>
        <img className="topNavBarLogo" src="/ITA-StarWars/SW_Logo.png" alt="Star Wars Logo"/>
        <img className="topNavBarLogoM" src="/ITA-StarWars/SW_Logo_Mobile.png" alt="Star Wars Logo"/>
    </Link>
    

        {userLoggedIn && (<Navigate to={"/"} replace={true} />)}

        <form onSubmit={onSubmit} className="signInForm">

            <div className="signInFieldDiv">
                <label className="signInFieldLabel">Email</label>
                <input
                    className="signInFieldInput"
                    type="text"
                    autoComplete="email"
                    value={email} onChange={(e) => { setEmail(e.target.value)}}
                    placeholder="Email"
                    required
                />
            </div>

            <div className="signInFieldDiv">
                <label className="signInFieldLabel">Password</label>
                <input
                    className="signInFieldInput"
                    type="password"
                    required
                    value={password} onChange={(e) => { setPassword(e.target.value)}}
                    placeholder="Password"
                />
            </div>

            <span>Don't have an account? <Link className="linkHighlight" to={"/SignUp"}>Register here</Link>.</span>

            {errorMessage && (
                <div className="signInErrorMessage">{errorMessage}</div>
            )}

            <button
                type="submit"
                disabled={isSigningIn}
                className="signInSubmitBtn"
            >
                {!isSigningIn ? "Sign In" : "Signing In..."}
            </button>

        </form>

    </div>
    

    </>)

}