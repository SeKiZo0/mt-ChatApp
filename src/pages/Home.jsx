import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import "../pages/Styles/homeStyle.css";


const Home = () => {


    return (
        <div className="home">
            <div className="container">
                <div className="sidebarspace"></div>
                <div className="ontop"><Sidebar /></div>
                <Chat />
            </div>
        </div>

    )
}

export default Home