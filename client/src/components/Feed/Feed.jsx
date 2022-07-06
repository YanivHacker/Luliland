import "./feed.css";
import Share from "../../components/Share/Share";
import Post from "../../components/Post/Post";
import { Posts } from "../../dummyData";


export default function Feed() {
    return (
        <div className="feed">
            <div className="feedContainer">
                <Share />
                {Posts.map((p) => (
                    <Post key={p.id} post={p} />
                ))}
            </div>
        </div>
    );
}