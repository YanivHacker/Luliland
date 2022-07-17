import { useContext, useRef } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import login from  "../../services/UserService";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const {SERVER_URL} = require("../../services/HttpServiceHelper");

const USER_SERVICE = SERVER_URL + '/users'

export const loginCall = async (userCredential) => {
    try {
        const res = await axios.post(USER_SERVICE + "/login", userCredential);
    } catch (err) {
        console.log("Error in Login")
    }
};

export default function Login() {
    const email = useRef();
    const password = useRef();
    // const [isFetching, dispatch] = useContext(AuthContext);
    const isUserNameExists  = localStorage.getItem("email");
    const isUserPasswordExists  = localStorage.getItem("password");
    const navigate = useNavigate();
    const handleClick = (e) => {
        loginCall({email: email.current.value, password: password.current.value})
        localStorage.setItem("email",email.current.value)
        localStorage.setItem("password",password.current.value)
        navigate("/")
        e.preventDefault();
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Lamasocial</h3>
                    <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Email"
                            type="email"
                            required
                            className="loginInput"
                            ref={email}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            required
                            minLength="6"
                            className="loginInput"
                            ref={password}
                        />
                        <button className="loginButton" type="submit" onSubmit={handleClick}>
                            Log In
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">
                            Create a New Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
