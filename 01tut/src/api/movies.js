import { useEffect, useState } from 'react';
// import './App.css';
import axios from 'axios';
// import movies from './api/movies';


function App() {
  const[movie, setMovie] = useState()

    async function fetchMovies(name){
      try{
        const response = await axios.get("http://www.omdbapi.com/?apikey=1394625b&s="+name+"&plot=short")
        const data1 = response.data.Search
        setMovie(data1)
      }catch(err){
        console.log(`Error: ${err}`)
      }
    }
console.log(movie)
  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <div className='input-container'>
      <input className="my-input" onChange={(e)=>fetchMovies(e)}/>
      <div className='text'>{movie}</div>
      </div>
    </div>
  ); 
}

export default App;
