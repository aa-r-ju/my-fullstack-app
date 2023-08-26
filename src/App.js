import { useState ,useEffect} from 'react'

import Note from "./Note"
import axios from 'axios'
import noteServices from "./notes"
import { logDOM } from '@testing-library/react'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
 
useEffect(() => {
  console.log("Hello");
  //1. get data from backend server
  let myAxiosPromise = noteServices.getAll()
  myAxiosPromise.then((myResult) => {
    console.log("returned promise")
    console.dir(myResult.data)
      //2. put tha data into note state
    setNotes(myResult.data)
  })

  console.log(myAxiosPromise)
},[])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

   let postPromise = noteServices.create(noteObject)
   postPromise.then((result) => {
    console.log(result.data)
    setNotes(notes.concat(result.data))
    setNewNote('')


   })
      
    }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)


    const updateData = (id) => {
      //1. update the server 
      let currentNote = notes.find((note) => {
        return note.id === id
        })
      let updatedNote = {...currentNote , important: !currentNote.important}
   let putPromise = noteServices.update(id,updatedNote)
   putPromise.then((result) => {
    console.dir(result)
    let updatedNote = result.data;
          //2. update the state
        setNotes(notes.map((note)=>note.id === updatedNote.id ? updatedNote :note))
   })
   .catch((err) => {
    console.log("some error here")
    console.dir(err);
    if(err.response.status === 404) {
      console.log("this means the id does not exist in the server");
      alert(`sorry this note"${currentNote.content}" does not exist`);
      setNotes(notes.filter((note) => note.id !== currentNote.id));
    } else {
      console.log("this is some other error");
    }
  }
    )}



    const myStyle = {fontSize:"60px"}

  return (
    <div>
      <h1 style = {myStyle} className='redbackground'>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>

      <ul>
      {notesToShow.map(note => 
          <Note key={note.id} note={note} updateNote={() => {
            updateData(note.id)
            }}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>   

    </div>
  )
}

export default App