import React, {useContext, useState} from "react";
import noteContext from "../context/notes/noteContext" 

export default function AddNote(props) {

    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setnote] = useState({title: "", description: "", tag:""})

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);  
        setnote({title: "", description: "", tag:""});  
        props.showAlert("Added new Note", "success")
        
    }

    const onChange = (e) => {
        setnote({...note,[e.target.name]: e.target.value})
    }
    return (
    <div>
      <div className="container my-3">
        <h1>Add Note</h1>
        <form>
          <div className="form-group my-3 ">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              placeholder="Enter title"
              onChange={onChange}
            />

          </div>
          <div className="form-group my-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={note.description}
              name = "description"
              placeholder="Description"
              onChange={onChange}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              value={note.tag}
              name = "tag"
              placeholder="Tag"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-danger my-3" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
