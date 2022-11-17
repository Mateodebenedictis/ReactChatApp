import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Swal from 'sweetalert2';


const Login = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")

    } catch (err) {

      Swal.fire({
        title: 'Oops...',
        icon: 'error',
        confirmButtonText: 'OK',
        text: 'Something went wrong',
        confirmButtonColor: '#65565d'
      });

    }
  };

  return (

    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Mathew Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          
          <input type="email" placeholder="email" required />
          <input type="password" placeholder="password" required />
          <button>Sign in</button>

        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>

  );
};

export default Login;
