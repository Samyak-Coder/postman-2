import { useCallback, useState } from 'react';
import './App.css';
import axios from 'axios';
import debounce from "lodash/debounce";
import { Link } from 'react-router-dom'
// import Main from './Main';

function App() {
  const[movie, setMovie] = useState('');

  const apikey = process.env.REACT_APP_API;

  console.log(process.env.REACT_APP_API)
  const fetchMovies = async(name)=>{
      try{
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apikey}&s=${name}&plot=short`)
        const data1 = response.data.Search
        setMovie(data1)
        // console.log(`http://www.omdbapi.com/?apikey=${apikey}&s=${name}&plot=short`)
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
        {movie == '' ? (<div>. ... .</div>) : (
        
          <ul>
            {movie.map((item)=>(
              <li>
                <Link to={`/movie/${item.imdbID}`}>
                <div className='item-container'>
                <img className="poster" src = {item.Poster} />
                <h3>{item.Title}</h3>
                </div>
                </Link>
                </li>
            ))}
         </ul>

        )}
      </div>
      <div>. ... .</div>
    </div>
  ); 
}

export default App;
