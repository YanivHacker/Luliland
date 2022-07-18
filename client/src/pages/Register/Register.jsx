import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import {signUp} from "../../services/UserService";

export default function Register() {
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                fullName: firstName.current.value + " " + lastName.current.value,
                isAdmin: true,
                creationDate: new Date(Date.now()),
                email: email.current.value,
                password: password.current.value,
                profileImage: ""
            };
            signUp(user);
            history("/login")
        }
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
                            placeholder="First Name"
                            required
                            ref={firstName}
                            className="loginInput"
                        />
                        <input
                            placeholder="LastName"
                            required
                            ref={lastName}
                            className="loginInput"
                        />
                        <input
                            placeholder="Email"
                            required
                            ref={email}
                            className="loginInput"
                            type="email"
                        />
                        <input
                            placeholder="Password"
                            required
                            ref={password}
                            className="loginInput"
                            type="password"
                            minLength="6"
                        />
                        <input
                            placeholder="Password Again"
                            required
                            ref={passwordAgain}
                            className="loginInput"
                            type="password"
                        />
                        <button className="loginButton" type="submit">
                            Sign Up
                        </button>
                        <button className="loginRegisterButton">Log into Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}