import { useEffect, useState } from 'react'
import Register from './component/Register'
import { db, auth, storage } from './config/firebase'
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import './App.css'

function App() {

  const [movieList, setMovieList] = useState([]);

  //New movie state
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [yearReleased, setYearReleased] = useState(0);
  const [isTopRated, setIsTopRated] = useState(false);

  //Update movie title state
  const [newUpdatedTitle, setNewUpdatedTitle] = useState("")

  //Upload file state
  const [fileUpload, setFileUpload] = useState(null);

  const movieCollectionRef = collection( db, "Movie" );

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(filteredData);
      setMovieList(filteredData);
    }
    catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getMovieList()
  }, [])

  const onAddMovie = async () => {
    try {
      await addDoc( movieCollectionRef, {
        title: newMovieTitle,
        topRated: isTopRated,
        year: yearReleased,
        userId: auth?.currentUser?.uid,
      }); 

      getMovieList();
    }
    catch(err) {
      console.error(err)
    }
  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "Movie", id);
    await deleteDoc(movieDoc);

    getMovieList();
  }


  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "Movie", id);
    await updateDoc(movieDoc, {
      title: newUpdatedTitle,
    });

    getMovieList();
  }

  const uploadFile = async () => {
    if(!fileUpload) return;
    const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(fileFolderRef, fileUpload);
    }
    catch(err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Register />

      <div>
        <input type="text" placeholder='Movie title'
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input type="number" placeholder='Year released'
          onChange={(e) => setYearReleased(Number(e.target.value))}
        />
        <input type="checkbox"
          checked={isTopRated}
          onChange={(e) => setIsTopRated(e.target.checked)}
        />
        <label>Top rated?</label>
        <button onClick={onAddMovie}>Submit</button>
      </div>

      <div>
        {movieList.map((movie, index) => (
          <div key={index}>
            <h1 style={{color: movie.topRated ? "aqua" : "red"}}>{ movie.title }</h1>
            <p>Released date: { movie.year }</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>

            <input type="text" placeholder='New title' onChange={(e) => setNewUpdatedTitle(e.target.value)}/>
            <button onClick={() => updateMovieTitle(movie.id)}>Update</button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  )
}

export default App
