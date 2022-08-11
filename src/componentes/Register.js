import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



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
      navigate("/");
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
    }
  };

  return (
    <div className="row">  
    {error && <h2>{error}</h2>}   
      <form
        onSubmit={handleSubmit}
        className=""
      >
        <div className="text-white">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="text-white"
            placeholder="youremail@company.tld"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="text-white"
          >
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="text-white"
            placeholder="*************"
          />
        </div>

        <button className="btn btn-warning">
          Register
        </button>
      </form>
      <p className="text-white">
        Already have an Account?
        <Link to="/login" className=">text-white">
          Login
        </Link>
      </p>
    </div>
  );
}
