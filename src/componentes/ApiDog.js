import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';






const ApiDog = () => {

    const [dogList, setDogList] = useState([])
    useEffect(() => {
    axios.get('https://dog.ceo/api/breed/hound/images')
        .then( res =>{
          const dog = res.data.message            
          setDogList(dog)     
           
         })
        }, [setDogList]);    





  return (
    
    <div>
    <div className="row my-2 mx-2">
          {
                dogList.slice(50, 102).map( (doglittle, index) =>(
                <div className="col-md-3 col-sm-12" key={index} >
                    <div className="card my-2">
                        <img src={doglittle} className="card-img-top"  style={{ width:"100%", height:"200px" }} alt="..."/>                      
                   </div>
                </div>
                ))
            } 
           
    </div>
    
    
    
    </div>
  )
}

export default ApiDog