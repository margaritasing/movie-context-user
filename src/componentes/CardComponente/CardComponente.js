import React from 'react'
import "./style.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useAuth } from '../../context/AuthContext';

const CardComponente = (props) => {

  const { user, loading } = useAuth();  
 
 

  const [movieList, setMovieList] = useState([])

  useEffect(() => {
   const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=75b9f04bb9ba776a3e2318bbe7838f21&language=es-ES';
   axios.get(endPoint)
        .then( response =>{        
          const apiData = response.data;         
          setMovieList(apiData.results)
        })  
        .catch(error=>{
          swal("Error","Hubo errores, intenta mas tarde","error"); 
        } )
  }, [setMovieList]);

 

  if (loading) {
    return <h1> Cargando</h1>
    
  }


    
   
  return (    
    <>
    
   <h2 className='text-white text-center'>Bienvenido(a) {user.displayName || user.email}</h2>   
   <div className='contenedores'>
    <div className='wrapper'> 
    {movieList?.map((oneMovie, index) => (
    <div className='cartas' key={index}>
        <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..."/>
        
        <div className='info'>
            <h5>{oneMovie.title.substring(0, 30)}</h5>               
            <p className='titulo'>{oneMovie.overview.substring(0, 200)}...</p>
            <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-warning" >View details</Link>         
        </div>     
         
    </div> 
    
    ))}
    
    </div>
    
  </div> 
  </>

    

  )
}

export default CardComponente;