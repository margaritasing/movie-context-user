import React from 'react'


const Footer = () => {

  return (

   <>
   

   <div className="bg-dark">
       <footer className="d-flex flex-wrap justify-content-between align-items-center py-0 my-5 border-top">
           <p className="col-md-4 mb-0 text-white">&copy; 2022 Challenger, Inc</p>
           <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">           
           </a>
           <ul className="col-md-4 justify-content-end">
               <li className="nav-item"><a href="/" className="nav-link px-2 text-white">Instagram</a></li>
               <li className="nav-item"><a href="/" className="nav-link px-2 text-white">Facebook</a></li>
               <li className="nav-item"><a href="/" className="nav-link px-2 text-white">Twitter</a></li>              
           </ul>
       </footer>
   </div>  
   </>
   
  )
}

export default Footer