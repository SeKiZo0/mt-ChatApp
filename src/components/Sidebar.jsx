import React, { useState } from "react";
import "../pages/Styles/homeStyle.css";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({ children }) => {

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);


    return (
        <div>
 <div className="sidebarspacer"></div>
        <div style={{ width: isOpen ? "300px" : "80px" }} className="sidebar">

            <div className="sidebarToggle">
                <FontAwesomeIcon icon={faBars} className="icon" onClick={toggle} />
            </div>
            <div style={{ display: isOpen ? "block" : "none"}}>
                <Navbar data={isOpen}/>
                <Search />
                </div>
            <Chats data={isOpen}/>

            <main>{children}</main>
        </div>
        </div>
    )
}

export default Sidebar 
