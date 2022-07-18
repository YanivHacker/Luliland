import React from 'react'
import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"
import "./customGoogleMap.css"

export default function CustomGoogleMap({points}){
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyDgRiuBRnyBk0p69oZpOwQQFzm8dLYuBKw"
    })
    return (
        <>
            {
                isLoaded ? <Map points={points}/> : <div></div>
            }
        </>
    )
}

const center = {lat: 32.072578, lng: 34.784779}

function Map({points}){
    return (
        <GoogleMap zoom={12} center={center} mapContainerClassName={"map-container"} >
            {points.lenght > 0 && points.map((val,key) => {
                return (
                    <div key={key} >
                        <Marker position={val}/>
                    </div>
                )
            })}
        </GoogleMap>
    )
}