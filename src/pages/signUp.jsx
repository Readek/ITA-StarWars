import { useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import { doCreateUserWithEmailAndPassword } from "../firebase/auth.mjs";
import { Link, Navigate } from "react-router-dom";
import "../assets/signInUp.css";

export default function SignUp() {

    const { userLoggedIn } = useAuth();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isSigningUp, setIsSigningUp ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningUp) {
            setIsSigningUp(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
            } catch (e) {
                setErrorMessage(e.message);
                setIsSigningUp(false);
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
                    placeholder="(Doesn't need to be a real email)"
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

            <span>Already have an account? <Link className="linkHighlight" to={"/SignIn"}>Sign in here</Link>.</span>

            {errorMessage && (
                <div className="signInErrorMessage">{errorMessage}</div>
            )}

            <button
                type="submit"
                disabled={isSigningUp}
                className="signInSubmitBtn"
            >
                {!isSigningUp ? "Sign Up" : "Signing Up..."}
            </button>

        </form>

    </div>
    

    </>)

}