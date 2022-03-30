import React, {useState, useEffect, useContext} from 'react';
import { FireBaseContext } from '../FireBase';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const firebase = useContext(FireBaseContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if(password.length > 5 && email !== ''){
      setBtn(true)
    }else if(btn) {
      setBtn(false)
    } 
  }, [password, email])

  const handleSubmit = e => {
    e.preventDefault();
    firebase.loginUser(email, password)
    .then(user => {
      setEmail("");
      setPassword("");
      navigate('/welcome')
    })
    .catch(error => {
      setError(error)
      setEmail("");
      setPassword("");
    })
  }

  return(
    <div className='signUpLoginBox'>
      <div className='slContainer'>

        <div className='formBoxLeftLogin'>
        </div>

        <div className='formBoxRight'> 
          <div className='formContent' >

            {error !== "" && <span>{error.message}</span>}
            <h2>Connexion</h2>

            <form onSubmit={handleSubmit}>
                {/* Email */}
              <div className='inputBox'>
                <input onChange={e => setEmail(e.target.value)} value={email} type='email' id='email' autoComplete="off" required />
                <label htmlFor='email'>Email</label>
              </div>
                {/* Password */}
              <div className='inputBox'>
                <input onChange={e => setPassword(e.target.value)} value={password} type='password' id="password" autoComplete="off" required />
                <label htmlFor='password'>Mot de passe</label>
              </div>

              {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}
            </form>
            
            <div className='linkContainer'>
              <Link className='simpleLink' to="/signup">Nouveau sur Marvel Quiz? Inscrivez-vous.</Link>
              <br/>
              <Link className='simpleLink' to="/forgetpassword">Mot de passe oublié? Cliquez-ici</Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;
