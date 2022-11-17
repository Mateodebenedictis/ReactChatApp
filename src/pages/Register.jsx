import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { BsImage } from 'react-icons/bs';
import Swal from 'sweetalert2';


const Register = () => {
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {

      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {

            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");

          } catch (err) {

            Swal.fire({
              title: 'Oops...',
              icon: 'error',
              confirmButtonText: 'OK',
              text: 'Something went wrong',
              confirmButtonColor: '#65565d'
            });

            console.log(err);
            setLoading(false);
          }
        });
      });
    } catch (err) {

      Swal.fire({
        title: 'Oops...',
        icon: 'error',
        confirmButtonText: 'OK',
        text: 'Something went wrong',
        confirmButtonColor: '#65565d'
      });

      setLoading(false);
    }
  };

  return (

    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Mathew Chat</span>
        <span className="title">Register</span>

        <form onSubmit={handleSubmit}>

          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />

          <label htmlFor="file">
            <a> <BsImage className="svgFoto" /> </a>
            <span>Add an avatar</span>
          </label>

          <button disabled={loading}>Sign up</button>

          {loading && "Uploading and compressing the image please wait..."}
        </form>

        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;