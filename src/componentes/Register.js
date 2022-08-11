import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import swal from 'sweetalert';



export default function Register() {
  const { signup } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      swal("Bien","Gracias por registrarte, la proxima vez, debes hacer login","success");
      navigate("/tarjetas");
    } catch (error) {
      setError(error.message);
      if(error.code === "auth/weak-password"){
        setError("La contraseña debe ser superior a 6 caracteres")
      }
      if (error.code === "auth/invalid-email") {
        setError("Correo no valido")        
      }

      if (error.code === "auth/internal-error") {
        setError("Correo no valido")        
      }

      if (error.code === "auth/email-already-in-use") {
        setError("Este email ya esta en uso")
      }

      if (error.code === "auth/missing-email") {
        setError("Debes escribir un correo valido")
        
      }
    }
  };

  return (
    <div className="row g-3 align-items-center justify-content-center my-3">  
    {error && <h2 className="text-white">{error}</h2>}   
          <div>
               <form onSubmit={handleSubmit}>
                    <div className="mb-3 col-md-4 col-sm-12">
                              <label  htmlFor="inputPassword6" className="form-label text-white">Email</label>
                              <input type="email" 
                              onChange={(e) => setUser({ ...user, email: e.target.value })}
                              className="form-control" 
                              id="inputPassword6" 
                              aria-describedby="emailHelp" />                
                    </div>
                    <div className="mb-3 col-md-4 col-sm-12">
                              <label  htmlFor="inputPassword6" className="form-label text-white">Password</label>
                              <input type="password"
                              onChange={(e) => setUser({ ...user, password: e.target.value })}
                              className="form-control"
                                id="inputPassword6" />
                    </div>               
                            <button type="submit" className="btn btn-primary">Registrar</button>
                  </form>
                    <p className="text-white my-3">
                        Ya tienes cuenta, entonces ve al Login
                        <Link to="/login" className="text-white mx-2">
                          Login
                        </Link>
                    </p>     
          </div>
    </div>
  );
}
