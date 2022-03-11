import React from 'react'
import NoteContext from './noteContext'
import { useState } from 'react'
const NoteState = (props) => {
  const host = "http://localhost:5000";
    const notesInitial =[]
    const [notes, setnotes] = useState(notesInitial)
      
    // get note
    const getNotes = async () => {
      // api 
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
    
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json()
        setnotes(json);
    }
    
      //Adding note
      const addNote = async (title, description, tag) => {
        // TODO: API Call
        // API Call 
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
    
        const note = {
          "_id": "61322f119553781a8ca8d0e08",
          "user": "6131dc5e3e4037cd4734a0664",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        };
        setnotes(notes.concat(note))
      }
    

      //Deleting node
      const deleteNote = async (id) => {
        //api
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
      
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
        });
        const json =  response.json();
        //delete
        const newNotes = notes.filter((note)=> {return note._id!==id})
        setnotes(newNotes);
      }

      // Edit a Note
      const editNote =  async (id, title, description,tag) => {

        //fetch api

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
      
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description,tag})
        });
        const json =  response.json();
      
        let newNotes = JSON.parse(JSON.stringify(notes))
        // edit
        for(let i=0; i<newNotes.length;i++){
          const element = newNotes[i];
          if(element._id===id){
            newNotes[i].title = title;
            newNotes[i].description = description;
            newNotes[i].tag = tag;
          break;

          }
        }
        setnotes(newNotes)
      }

    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
                {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;