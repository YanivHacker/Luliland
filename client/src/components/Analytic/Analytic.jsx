import React, {useEffect, useRef, useState} from 'react'
import PieChart from "../PieChart/PieChart";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {getDistributionTag} from "../../services/PostService";

export default function Analytic() {

    const [distributionBetweenPost, setDistributionBetweenPost] = useState(null)
    const tag1 = useRef()
    const tag2 = useRef()
    const tag3 = useRef()
    const initalizeTagsDist = async () => {
        if (!(tag1.current.value && tag2.current.value && tag3.current.value)) {
            setDistributionBetweenPost(null)
            return
        }
        if(tag1.current.value === tag2.current.value || tag2.current.value === tag3.current.value || tag1.current.value === tag3.current.value){
            setDistributionBetweenPost(null)
            return
        }
        const res = await getDistributionTag(tag1.current.value,tag2.current.value,tag3.current.value)
        setDistributionBetweenPost(res)
    }
    return (
        <>
            <h2>Distribution Between Words in Posts</h2>
            <div className="tags-container">
                <div className="tag">
                    <TextField placeholder="tag1" inputRef={tag1}/>
                </div>
                <div className="tag">
                    <TextField placeholder="tag2" inputRef={tag2}/>
                </div>
                <div className="tag">
                    <TextField placeholder="tag3" inputRef={tag3}/>
                </div>
                <div className="submit">
                    <Button onClick={()=>{initalizeTagsDist()}} variant="contained" color="success">
                        submit
                    </Button>
                </div>
            </div>
            {distributionBetweenPost && <PieChart/>}

        </>
    )
}