import React, {useState, useEffect , useContext} from 'react';
import ReactTooltip from 'react-tooltip';
import {FireBaseContext} from '../FireBase'

const Logout = () => {
    const [checked, setChecked] = useState(false);
    const firebase = useContext(FireBaseContext);
    
    useEffect(() => {
      if(checked){
          firebase.signOutUser()
      }
    }, [checked]);
    
    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    return (
      <div className='logoutContainer'>
          <label className='switch'>
              <input type='checkbox'  onChange={handleChange} />
              <span className='slider round' data-tip="Déconnexion"></span>         
          </label>
          <ReactTooltip
          place='left'
          effect='solid'
          
          />
      </div>
  )
};

export default Logout;
