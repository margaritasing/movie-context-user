import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

const RickAndMortyApi = () => {

    const [rickList, setRickList] = useState([])

    useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
        .then( res =>{
          const apiRick = res.data.results                   
          setRickList(apiRick)            
         })
        }, [setRickList]);

   

  return (
    <div>

    <div className="row my-2 mx-2">
    {
        rickList?.map( (oneCharacter, index) => {
          return(            
                  <div className="col-md-3 col-sm-12" key={index}>
                    <div className="card my-2" style={{borderRadius:"15px"}}>
                      <img src={oneCharacter.image} style={{height:"300px", borderRadius:"15px 15px 0px 0px "}} className="card-img-top" alt="..."/>
                      <div className="card-body text-center" style={{height:"220px", backgroundColor:"#F7ECDE"}}>
                          <h5 className="card-title">{oneCharacter.name}</h5>
                          <p className="card-text">{oneCharacter.species}</p>
                          <p className="card-text">{oneCharacter.status}</p> 
                          <p className="card-text">{oneCharacter.origin.name}</p> 
                          <p className="card-text">{oneCharacter.gender}</p>                                                
                      </div>
                    </div>     
                  </div>           
              
          )
        })
    }
         
    </div>
    
 
    
    
    </div>
  )
}

export default RickAndMortyApi