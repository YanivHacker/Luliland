import "./topbar.css"
import {Search, Person, Chat, Notifications} from "@material-ui/icons"
import {Button} from '@material-ui/core'
import {Link, useLocation, useNavigate} from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../services/HttpServiceHelper";
import SearchList from "./SearchList";
import {FormControlLabel, FormGroup} from "@mui/material";
import {Checkbox} from "antd";

export default function Topbar() {
    const isUserNameExists  = localStorage.getItem("username");
    const isUserPasswordExists  = localStorage.getItem("password");
    const nav = useNavigate();
    const [inputText, setInputText] = useState("");
    const [users, setUsers] = useState([]);
    let isFirstName = true, isLastName = true, isEmail = true;

    let inputHandler = (e) => {
        //convert input text to lower case
        let lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    const onClickLogOut = (isUserNameExists,isUserPasswordExists) => {
            localStorage.clear();
            nav('/logout');

        return
    };

    const fetchUsers = async () => {
        const response = await axios.get(SERVER_URL + `/users`);
        const { data } = response;
        setUsers(data);
    };
    useEffect( () => {
        fetchUsers();
    });

    console.log("Users " + users.length)

    return (
        <div className="topbarContainer">
            <div className="topbarleft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Luliland</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search
                    />
                    <TextField placeholder="Search for friends!"
                               label="Search"
                               variant="outlined"
                               id="outlined-basic"
                               className="searchInput"
                               onChange={inputHandler}
                    />

                    <SearchList input={inputText} userList={users} isFirstName={isFirstName} isLastName={isLastName} isEmail={isEmail}/>
                </div>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked/>} label="First Name" onClick={() => {
                        isFirstName = !isFirstName;
                    }}/>
                    <FormControlLabel control={<Checkbox defaultChecked/>} label="Last Name" onClick={() => {
                        isLastName = !isLastName;
                    }}/>
                    <FormControlLabel control={<Checkbox defaultChecked/>} label="Email" onClick={() => {
                        isEmail = !isEmail;
                    }}/>
                </FormGroup>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <div className="topbarImage">
                    <Link to="/updateUser" style={{textDecoration:"none"}}>
                        <Person />
                    </Link>
                </div>
                <div className="topbarImage">
                    <Button onClick={(e) => {
                        onClickLogOut(isUserNameExists, isUserPasswordExists)
                    }} style={{background:"grey"}}>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}
