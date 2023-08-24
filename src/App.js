import { useState ,useEffect} from 'react'

import Note from "./Note"
import axios from 'axios'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
 
useEffect(() => {
  console.log("Hello");
  //1. get data from backend server
  let myAxiosPromise = axios.get("http://localhost:3001/notes")
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

   let postPromise = axios.post("http://localhost:3001/notes", noteObject)
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


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>

      <ul>
      {notesToShow.map(note => 
          <Note key={note.id} note={note} />
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