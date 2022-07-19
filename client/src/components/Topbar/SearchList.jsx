import { React, useState } from 'react'
import {SERVER_URL} from "../../services/HttpServiceHelper";
import axios from "axios";
import {Link} from "react-router-dom";

function SearchList(props, userList, isFirstName, isLastName, isEmail) {
    // let response = async() => await axios.get(SERVER_URL + `/users`)
    //create a new array by filtering the original array
    // console.log("User list: " + userList.toString())
    const filteredData = userList.filter((el) => {
        if (props.input === '') {
            return true;
        }
        //return the item which contains the user input
        else {
            let toSearch = "";
            if(isFirstName)
                toSearch += el.firstName;
            if(isLastName)
                toSearch += el.lastName;
            if(isEmail)
                toSearch += el.email;

            return toSearch.toLowerCase().includes(props.input)
        }
    })
    return (
        <div>
            {filteredData && filteredData.map((u) => (
                <div className="usersContainer">
                <Link to={`/profile/${u.email}`}>
                    <img
                            className="userProfileImg"
                            src={u.profilePicture ? u.profilePicture : "assets/person/person-icon.png"}
                            alt=""
                        />
                </Link>
                <span className="username">
                                        {u.firstName}
                                    </span>
                </div>
                ))}
        </div>
    )
}

export default SearchList