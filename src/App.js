/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import './App.css';
import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message';
import db from "./Firebase";
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([



  ]);
  const [username, setUserName] = useState("");


  const sendMessage = (event) => {
    event.preventDefault();
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput("");

  }
  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
      });
  }, [])
  useEffect(() => {
    setUserName(prompt("adını gir lan"));
  }, []);
  return (
    <div className="App">
      <img alt="rrrr" src="data:image/jpeg;base64,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" />
      <h1 id="h1">WELCOME TO THE MESSANGER</h1>
      <h2 id="h2">{username}</h2>
      <form className="app_form" id="raf">
        <FormControl className="app_formControll">

          <Input placeholder="Enter your message" className="app_input" value={input} onChange={event => setInput(event.target.value)} />
          <IconButton className="app_iconButton" disabled={!input} variant="contained" color="primary" onClick={sendMessage}>
            <SendIcon />
          </IconButton>


        </FormControl>
      </form>
      <FlipMove>
        {
          messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />

          ))
        }
      </FlipMove>

    </div >
  );
}

export default App;
