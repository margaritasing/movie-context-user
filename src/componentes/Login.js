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
      }
    };


   
      return (
      <>      
      {error && <h2>{error}</h2>}
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
                  <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#!"
                  onClick={handleResetPassword}
                >
                  Forgot Password?
                </a>
            </form>  
            <button
            onClick={handleGoogleSignin}
            className="bg-slate-50 hover:bg-slate-200 text-black  shadow rounded border-2 border-gray-300 py-2 px-4 w-full"
          >
            Google login
          </button>
          <p className="text-white">
            Don't have an account? 
            <Link to="/register" className="text-blue-700 hover:text-blue-900">
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
 
`;

export default Login