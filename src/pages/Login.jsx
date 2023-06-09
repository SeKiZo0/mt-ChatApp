import React, { useState } from "react";
import "./Styles/FormStyle.css";
import { useNavigate, Link} from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import GoogleButton from "react-google-button";



const Login = () => {

    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const googleSignIn = async () => {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        navigate("/");
      } catch (err) {
        setErr(true);
        setLoading(false);
      }
    }
  console.log(loading);
    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      } catch (err) {
        setErr(true);
        setLoading(false);
      }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">woofer</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" id="email" placeholder="email" />
                    <input type="password" name="password" id="password" placeholder="password " />
                    <button>Sign in</button>
                </form>
                <GoogleButton onClick={googleSignIn}/>
                <p>You don't have an account? <Link to="/register">Sign up</Link></p>
                {err && <span>Something went wrong</span>}
            </div>
        </div>
    )
}

export default Login