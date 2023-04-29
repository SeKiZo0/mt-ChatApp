import React, { useContext, useEffect, useRef } from 'react'
import "../pages/Styles/homeStyle.css";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp } from 'firebase/firestore';

const Message = ({message}) => {

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message]);

  const seconds = message.date;
  console.log(seconds);

  const timestamp = new Timestamp(message.date.seconds, message.date.nanoseconds);

  const date = timestamp.toDate().toDateString();
  const time = timestamp.toDate().toLocaleTimeString();
  console.log(date);



  return (
    <div ref = {ref}
    className={`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="messageInfo">
            <img src={
              message.senderId === currentUser.uid 
              ? currentUser.photoURL 
              : data.user.photoURL}
               alt="" />
               <div className="timestamp">
               <span>{date}</span>
               <span>{time}</span>
               </div>
        </div>
        
        <div className="messageContent">
            <p>{message.text}</p>
            {message.img && <img src={message.img} alt="" />}
        </div>
    </div>
  )
}

export default Message