import React from 'react'
import {Link, useNavigate } from 'react-router-dom';
import Buscador from './Buscador';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';


const Header = (props) => {

  let navigate = useNavigate();

  const { logout, user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login")
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) {
    return <h1> Cargando</h1>
    
  }
  

  return (
      <>
      {user &&

        <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
              <div className="container-fluid">            
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                      <div className="navbar-nav">
                          <Link to="/" className="nav-link active" aria-current="page" >Home</Link>
                          <Link to="/tarjetas" className="nav-link" >Tarjetas</Link>   
                          <Link to="/listado" className="nav-link" >Listado</Link>                    
                          <Link to="/favoritos" className="nav-link" >Favoritos</Link>  
                          <Link to="/banderas" className="nav-link" >Banderas</Link> 
                          <span className='d-flex text-white align-items-center'>       
                          {
                            props.favoritos.length > 0 && <>Favoritas: {props.favoritos.length}</>}
                          
                          </span>  
                          
                            <button className="btn btn-warning text-dark text-center mx-4 my-1" onClick={handleLogout} >
                            logout
                          </button>
                                                  
                      </div>
                  </div>
                <Buscador />
              </div>
        </nav>











      }   
      </>  

  )
}

export default Header