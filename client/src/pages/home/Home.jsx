import React from 'react'
import "./home.css"
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Home() {
  return (
      <>
        <Topbar />
        <div className="homeContainer">
          <Sidebar />
        </div>
      </>
  )
}
