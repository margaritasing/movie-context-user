
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Login from './componentes/Login';
import Listado from "./componentes/Listado";
import Header from "./componentes/Header";
import Detalle from "./componentes/Detalle";
import Resultados from "./componentes/Resultados";
import Favoritos from "./componentes/Favoritos";
import swal from 'sweetalert';
import "./App.css"
import Banderas from "./componentes/Banderas";
import CardComponente from "./componentes/CardComponente/CardComponente";
import Register from "./componentes/Register";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProtectedRegister } from "./ProtecterRegister";
import ApiDog from "./componentes/ApiDog";
import RickAndMortyApi from "./componentes/RickAndMortyApi";




function App() { 

  const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const favInLocal = localStorage.getItem('favs');
       
        if (favInLocal !== null) {
          const favsArrays = JSON.parse(favInLocal);
         
          setFavoritos(favsArrays);        
        }
    }, [])
    

  const addOrRemoveFromFavs=  e =>{

    const favMovie = localStorage.getItem('favs');

    let tempMoviesInFavs;
  
    if (favMovie === null) {
      tempMoviesInFavs = []    
    }else{    
      tempMoviesInFavs = JSON.parse(favMovie)
    }


    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title =  parent.querySelector('h5').innerText;
    const overview =  parent.querySelector('p').innerText;
    const movieData = {
      imgURL, title, overview,
      id:btn.dataset.movieId
    }

    let movieIsInArray = tempMoviesInFavs.find(oneMovie =>{
      return oneMovie.id === movieData.id
    }) 
   
    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);      
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
      setFavoritos(tempMoviesInFavs);
      swal("Bien","Se agrego la pelicula a favoritos","success");             
    } else {
        let moviesLeft = tempMoviesInFavs.filter(oneMovie => {
        return oneMovie.id !== movieData.id
      })
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
      setFavoritos(moviesLeft);
      swal("Bien","Se elimino la pelicula de favoritos","success");
    } 
 
  }

  return (
    <>
    <AuthProvider>
    <Header favoritos={favoritos} />
      <div className="container">
          <Routes>
            <Route path="/" element={ 
              <ProtectedRoute>
                 <Register />
              </ProtectedRoute>
            
            } />
            <Route exact path="/login" element={
            <ProtectedRoute>
                <Login />
            </ProtectedRoute>
             
            
            } /> 
                
            <Route path="/listado"  element={  <Listado addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
            <Route path="/detalle"  element={<Detalle addOrRemoveFromFavs={addOrRemoveFromFavs}/>} /> 
            <Route path="/resultados"  element={<Resultados addOrRemoveFromFavs={addOrRemoveFromFavs}  />} />
            <Route path="/favoritos"  element={<Favoritos favoritos={favoritos} addOrRemoveFromFavs={addOrRemoveFromFavs}  />} />            
            <Route path="/banderas"  element={<Banderas />} /> 
            <Route path="/tarjetas" element={<CardComponente/> } />
            <Route path="/dog" element={
              <ProtectedRegister>
                  <ApiDog/>
              </ProtectedRegister>      

            } />
            <Route path="/rickandmorty" element={
              <ProtectedRegister>              
                <RickAndMortyApi /> 
              </ProtectedRegister>
            } />
         </Routes>
      </div>
      </AuthProvider>
      </>
  );
}

export default App;
