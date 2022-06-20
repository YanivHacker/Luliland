import React, {useRef, useState} from "react"
import {signUp} from "../../services/UserService";

export const SignUp = ()=>{
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const password = useRef()
    const profileImage = useRef()



    function createUser(){
        const newUser = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            fullName: firstName.current.value + " " + lastName.current.value,
            isAdmin: true,
            creationDate: new Date(Date.now()),
            email: email.current.value,
            password: password.current.value,
            profileImage: profileImage.current.value
        }
        signUp(newUser)
    }

    return (
        <>
                <label>
                    first name:
                    <input ref={firstName} type="text" />
                    <br/>
                    last name:
                    <input ref={lastName} type="text"/>
                    <br/>
                    email:
                    <input ref={email} type="email"/>
                    <br/>
                    password:
                    <input ref={password} type="password" />
                    <br/>
                    profile image:
                    <input ref={profileImage} type="text" />
                    <br/>
                    <button type="submit" onClick={createUser}>sign up</button>
                </label>
        </>
    )
}