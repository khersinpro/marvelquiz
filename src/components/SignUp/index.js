import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {FireBaseContext} from '../FireBase'

const SignUp = (props) => {
  
  const navigate = useNavigate()
  //création de firebase pour acceder au module auth de firebase
  const firebase = useContext(FireBaseContext);

  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loginData, setLoginData] = useState(data); 

  const [error, setError] = useState("");

  //récuperation des données passé dans les input [e.target.id]: e.target.id === email = "******" ect...
  const handleChange = e => {
    setLoginData({...loginData, [e.target.id]: e.target.value})
  }

  const {pseudo , email, password, confirmPassword} = loginData

  const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword
  ? <button disabled>Inscription</button> : <button>Inscription</button> ;

  const handleSubmit= e => {
    e.preventDefault()
    firebase.signupUser(email, password)
    .then(authUser => { firebase.user(authUser.user.uid).set({pseudo, email})})
    .then(() => {
      setLoginData({...data})
      navigate('/welcome')
    })
    .catch(error => {
      setError(error)
      setLoginData({...data})
    })
  }

  //error gestion
  const errorMsg = error !== "" && <span>{error.message}</span>

  return (
      <div className='signUpLoginBox'>
          <div className='slContainer'>

            <div className='formBoxLeftSignup'>
            </div>

            <div className='formBoxRight'> 
              <div className='formContent' >
                {errorMsg}
                <h2>Inscription</h2>
                <form onSubmit={handleSubmit}>
                  {/* Pseudo */}
                  <div className='inputBox'>
                    <input onChange={handleChange} value={pseudo} type='text' id="pseudo" autoComplete="off" required />
                    <label htmlFor='pseudo'>Pseudo</label>
                  </div>
                    {/* Email */}
                  <div className='inputBox'>
                    <input onChange={handleChange} value={email} type='text' id="email" autoComplete="off" required />
                    <label htmlFor='email'>Email</label>
                  </div>
                    {/* Password */}
                  <div className='inputBox'>
                    <input onChange={handleChange} value={password} type='password' id="password" autoComplete="off" required />
                    <label htmlFor='password'>Mot de passe</label>
                  </div>
                    {/* ConfirmPassword */}
                  <div className='inputBox'>
                    <input onChange={handleChange} value={confirmPassword} type='password' id="confirmPassword" autoComplete="off" required />
                    <label htmlFor='confirmPassword'>Confirmer le mot de passe</label>
                  </div>

                  {btn}

                </form>
                <div className='linkContainer'>
                  <Link className='simpleLink' to="/login">Déjà inscrit? Connectez-vous.</Link>
                </div>
              </div>
            </div>
          </div>
      </div>
  )
}
export default SignUp;
