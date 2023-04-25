import React, { useContext, useState } from 'react';
import "../pages/Styles/homeStyle.css";
import Add from "../image/add.png";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const InputMSG = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {

      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );

    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    });
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    });

    setText("")
    setImg(null)
  };

  return (
    <div className="input">
      <input type="text" 
      name="inputText" 
      id="inputText" 
      placeholder='type something...' 
      onChange={(e) => setText(e.target.value)}
      value={text} />
      <div className="send">
        <img src="" alt="" />
        <input type="file" 
        name="file" id="file" 
        style={{ display: "none" }} 
        onChange={e => setImg(e.target.files[0])} />
        <label htmlFor="file">
          <img src={Add} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default InputMSG