import { useCallback, useState } from 'react';
import './App.css';
import axios from 'axios';
import movies from './api/movies';
import debounce from "lodash/debounce";


function App() {
  const[movie, setMovie] = useState('')
  const[squery, setSquery] = useState('')

  const fetchMovies = async(name)=>{
      try{
        const response = await axios.get("http://www.omdbapi.com/?apikey=1394625b&s="+name+"&plot=short")
        const data1 = response.data.Search
        setMovie(data1)
      }catch(err){
        console.log(`Error: ${err}`)
      }
    }

    const debouncedFunction = useCallback(debounce(fetchMovies, 600), [])

  return (
    <div className="App">

      <h1>Movie Search App</h1>
      <div className='input-container'>
        <input className="my-input" onChange={(e)=>debouncedFunction(e.target.value)}/>
      </div>
      <div className='movie-container'>
        {movie == '' ? (<div>safadsfas</div>) : (
        
          <ul>
            {movie.map((item)=>(
              <li>
                <div className='item-container'>
                <img className="poster" src = {item.Poster} />
                <h3>{item.Title}</h3>
                </div>
                </li>
            ))}
         </ul>

        )}
      </div>
      
    </div>
  ); 
}

export default App;
