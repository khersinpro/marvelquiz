import React, {useState, Fragment, useContext, useEffect} from 'react';
import { FireBaseContext } from '../FireBase';
import { useNavigate } from 'react-router-dom';
import Quiz from '../Quiz';
import Logout from '../LogOut';

const Welcome = () => {

  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});

  const firebase = useContext(FireBaseContext);
  const navigate = useNavigate()

  useEffect(() => {
    //firebase.auth.onstatechanged control laccés aux page Logout Quiz , if user -> ok else redirected to "/"
    let listenner = firebase.auth.onAuthStateChanged(user => {
      user ? setUserSession(user): navigate("/")
    })

    //recupération des données user
    if(userSession !== null){
      firebase.user(userSession.uid)
      .get()
      .then(data => {       
        if(data){     
          setUserData(data.data()) //"data()" permet de recuperer les infos de l'user dans la variable data
        } 
      })
      .catch(error => {
        console.log(error);
      })
    }

    return () => {
     listenner()
    };
  }, [userSession]);
  

  


  return userSession === null ? (
    <Fragment >
       <div className='loader'></div>
       <p style={{textAlign: 'center', color:'white'}}>Loading...</p>
       
    </Fragment>
  ) : (
    <div className='quiz-bg'>
      <div className='container'>
        <Logout />
        <Quiz userData={userData} /> 
      </div>
    </div>
  );
};

export default Welcome;
