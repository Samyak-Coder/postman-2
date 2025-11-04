import { useEffect, useState } from 'react';
import './Main.css';
import axios from 'axios';
import debounce from "lodash/debounce";
import { useParams } from 'react-router-dom';

const Main = () => {

    const [finalMovie, setFinalMovie] = useState("")

    const username = useParams();

    const fetchMovies = async(name)=>{
      try{
        const response = await axios.get("http://www.omdbapi.com/?apikey=1394625b&i="+name)
        const data1 = response.data
        console.log("Data", data1)

        setFinalMovie(data1)
        
      }catch(err){
        console.log(`Error: ${err}`)
      }
    }
    useEffect(()=>{
        fetchMovies(username.moviename)
    // console.log(finalMovie)
    }, [username.moviename])
    
  return (
    
    <div>
        {finalMovie == "" ? (<div>safadsfas</div>) : (
      <div className='container'>
        <h1 className='title'>{finalMovie.Title}</h1>
        <img src={finalMovie.Poster} />
        <div className='lineme' >
        <p className='ratings'>iMDB Ratings: {finalMovie.imdbRating}</p>
        <p className='year'>Released: {finalMovie.Year}</p>
        </div>
        <p className='genre'>Genre: {finalMovie.Genre}</p>
        <p>Directed by {finalMovie.Director}</p>
        <p>Written by {finalMovie.Writer}</p>
        <p>Cast: {finalMovie.Actors}</p>
        <p>Languages: {finalMovie.Language}</p>
        <p>Awards: {finalMovie.Awards}</p>
        <p>Plot: {finalMovie.Plot}</p>
      </div>
      )}
    </div>
    
  )
}

export default Main
