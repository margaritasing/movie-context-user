import React from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Banderas = () => {

    const [banderaList, setBanderaList] = useState([])
    useEffect(() => {
    axios.get('https://restcountries.com/v2/all')
        .then( res =>{
          const banderas = res.data   
          setBanderaList(banderas)     
           
         })
        }, [setBanderaList]);

        const handleCLick = (nativeName) =>{
            return swal(`El nombre nativo del pais es: ${nativeName}`)

        }

      
        

  return (
    <div>
    <div className="row my-2 mx-2">
            {
                banderaList.map( (bande, index) =>(
                <div className="col-md-4 col-sm-12" onClick={()=> handleCLick(bande.nativeName)} key={index}>
                <h3 className="card-title text-white text-center">{bande.name}</h3>
                <h4 className="card-title text-white text-center">Capital: {bande.capital}</h4>
                <h4 className="card-title text-white text-center">Región: {bande.region}</h4>
                    <div className="card my-2">
                        <img src={bande.flag} className="card-img-top"  style={{ width:"100%", height:"200px" }} alt="..."/>                      
                   </div>
                </div>
                ))
            }
    
    </div>
    </div>
  )
}

export default Banderas