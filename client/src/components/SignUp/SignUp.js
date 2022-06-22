import React, {useRef, useState} from "react"
import {signUp} from "../../services/UserService";
import ImageUploader from "react-images-upload";


export const SignUp = ()=>{
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const password = useRef()
    const [profileImage, setProfileImage] = useState("")



    function createUser(){
        const newUser = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            fullName: firstName.current.value + " " + lastName.current.value,
            isAdmin: true,
            creationDate: new Date(Date.now()),
            email: email.current.value,
            password: password.current.value,
            profileImage: ""
        }
        signUp(newUser)
    }

    function loadImage(files){
        console.log(files)
        console.log(files.length)
        const x = files[0].text().then(val=>console.log(val))
        //setProfileImage(files.length===0?"":files[0].text())
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
                    <br/>
                    <button type="submit" onClick={createUser}>sign up</button>

                </label>
            <ImageUploader
                withIcon={false}
                withPreview={true}
                label=""
                buttonText="Upload Image"
                onChange={loadImage}
                imgExtension={[".jpg", ".png", ".gif", ".svg"]}
                fileSizeError=" file size is too big"
            />
        </>
    )
}