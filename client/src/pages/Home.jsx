import React from 'react'
import {LoadImage} from "../components/ImageUplaoder/ImageUploader";
import LogIn from "../components/LogIn/LogIn";

export default function Home() {
  return (
    <>
      <div>Home</div>
        <LoadImage/>
        <LogIn></LogIn>
    </>
  )
}
