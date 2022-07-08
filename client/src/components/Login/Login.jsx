import React, {createRef, useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import validator from "validator/es";
import {login} from "../../services/UserService";
import "./login.css"

export default function FormDialog() {
    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState({})
    const [successLogIn,setSuccessLogIn] = useState("PENDING")
    const [validEmail,setValidEmail] = useState(true)
    const [validPassword,setValidPassword] = useState(true)
    const emailRef = useRef("")
    const passwordRef = useRef("")

    const validateError = () => {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        console.log({email,password});
        const currentErrors = errors
        setValidEmail(validator.isEmail(email))
        if(!validEmail)
            currentErrors.email = "Please provide a correct email address."
        setValidPassword(password.length!==0)
        if(!validPassword)
            currentErrors.password = "Password can't be empty."
        setErrors(currentErrors)
    }

    const signIn = async ()=> {
        const credentials = {email:emailRef.current.value,password: passwordRef.current.value}
        var res = true
        try{
            await login(credentials)
        }catch{
            res=false
        }
        if(res)
        {
            setSuccessLogIn("SUCCESS")
            handleClose()
        }
        else
            setSuccessLogIn("FAILED")
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Sign In
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your user credentials to sign in.
                    </DialogContentText>
                    <TextField
                        error={!validEmail}
                        inputRef={emailRef}
                        autoFocus
                        margin="dense"
                        label="Email Address"
                        type="email"
                        onChange={validateError}
                        helperText={!validEmail ? errors.email : ""}
                        fullWidth
                    />
                    <TextField
                        error={!validPassword}
                        inputRef={passwordRef}
                        autoFocus
                        margin="dense"
                        label="Password"
                        type="password"
                        onChange={validateError}
                        helperText={!validPassword ? errors.password : ""}
                        fullWidth
                    />
                    {successLogIn==="FAILED" &&
                        <label className={"errorMessage"}>email or password is wrong</label>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={signIn} color="primary" disabled={!validEmail || !validPassword}>
                        Sign In
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}