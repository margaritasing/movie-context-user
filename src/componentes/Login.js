import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

const Login = () => {

   const [user, setUser] = useState({
      email: "",
      password: "",
    });

    const { login, loginWithGoogle, resetPassword } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try {
        await login(user.email, user.password);
        navigate("/tarjetas");
      } catch (error) {
        setError(error.message);
        if (error.code === "auth/wrong-password") {
         setError("Contraseña equivocada")         
        }
        if (error.code === "auth/user-not-found") {
         setError("Usuario Incorrecto")         
        }

        if (error.code === "auth/invalid-email") {
          setError("Por favor introduce un correo valido")              
        }
      
      }
    };
  
    const handleChange = ({ target: { value, name } }) =>
      setUser({ ...user, [name]: value });
  
    const handleGoogleSignin = async () => {
      try {
        await loginWithGoogle();
        navigate("/tarjetas");
      } catch (error) {
        setError(error.message);
      }
    };
  
    const handleResetPassword = async (e) => {
      e.preventDefault();
      if (!user.email) return setError("Escriba un correo electrónico para restablecer la contraseña");
      try {
        await resetPassword(user.email);
        setError('Te enviamos un correo electrónico. Revisa tu correo')
      } catch (error) {
        setError(error.message);
        if(error.code === "auth/user-not-found"){
          setError("Correo no registrado")
        }
      }
    };


   
      return (
      <>      
      {error && <h2 className="text-white">{error}</h2>}
      <Section className='principal'>
      
          <div className='login'>            
           <h3>Formulario de login</h3>
            <form className="formulario" onSubmit={handleSubmit}>
                  <label>
                     <span>Correo electronico: </span> <br/>
                        <input type='email' name='email' placeholder='Email' onChange={handleChange} />          
                  </label>
                  <br/>

                  <label>
                  <span>Contraseña: </span><br/>
                        <input type='password' name='password' placeholder='Contraseña' onChange={handleChange}/>          
                  </label>     
                  <br/>
                  <br/>
                  <button type='submit'>Ingresar</button>   
                 <div className="my-3">
                      <a
                      className="text-white my-3"
                      href="#!"
                      onClick={handleResetPassword}
                    >
                      ¿ Se te olvido la contraseña? 
                    </a>               
                 </div>
            </form>  
            <button
            onClick={handleGoogleSignin}
            className="text-white"
          >
            Google login
          </button>
          <p className="text-white">
            No tienes cuenta?, Por favor registrate
            <Link to="/" className="text-white mx-2">
              Register
            </Link>
          </p>            
         </div>       
      </Section>
      </>
  )
}

const Section = styled.section`


   
   width: 100%;  
   display:flex;
   justify-content: center;
   align-items: center;
  


.login{
   background-color:#FFF9CA;
   width: 400px; 
   height: 250px;
   padding:10px;
   margin-top:30px;
   border-radius:25px; 
}

input{
   border-radius:15px;
   border:none;
   width: 350px; 
   height: 30px;
   margin:10px 10px 10px 0;
   background-color:#fff;
}

.login h3{
   text-align:center;
   font-size:20px;
}

.login button{
   width: 100%; 
   height: 30px;
   border-radius:25px;
   background-color:#B2A4FF;
   border:none;
}

button:hover {
   background-color:#FFB4B4;
 }

 @media screen and (min-width: 280px) and (max-width: 720px) {

  .login{
    background-color:#FFF9CA;
    width: 100%; 
    height: 250px;
    padding:10px;
    margin-top:30px;
  
 }

 input{
 
  width: 250px; 
  height: 30px;
  

}



 }
 
`;

export default Login