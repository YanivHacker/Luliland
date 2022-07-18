import "./share.css";
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
} from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import getUserByEmail from "../../services/UserService";

const {SERVER_URL} = require("../../services/HttpServiceHelper");
const POST_SERVICE = SERVER_URL + '/posts';

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const content = useRef();
    const [file, setFile] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userEmail: user.email,
            content: content.current.value,
        };
        debugger
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            //newPost.img = fileName;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function() {
                var base64data = reader.result;
                newPost.image = base64data;
                console.log(base64data);
            }
            console.log(newPost);
            // try {
            //     await axios.post("/:", data);
            // } catch (err) {}
        }
        try {
            await axios.post(POST_SERVICE, newPost);
            window.location.reload();
        } catch (err) {}
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        className="shareProfileImg"
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "person/noAvatar.png"
                        }
                        alt=""
                    />
                    <input
                        placeholder={"What's in your mind " + JSON.parse(localStorage.getItem("user")).firstName + "?"}
                        className="shareInput"
                        ref={content}
                    />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">
                        Share
                    </button>
                </form>
            </div>
        </div>
    );
}