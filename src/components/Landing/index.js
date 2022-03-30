import React, {useRef, useEffect, useState, Fragment} from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {

    const [btn, setBtn] = useState(false);

    const refWolverine = useRef();


    
    useEffect(() => {
      refWolverine.current.classList.add('startingImg')
      setTimeout(() => {
          refWolverine.current.classList.remove('startingImg')
          setBtn(true)
      }, 1000);
    }, []);

    const setLeftImage = () => {
        refWolverine.current.classList.add('leftImg')
    }
    const setRightImage = () => {
        refWolverine.current.classList.add('rightImg')
    }

    const clearImg = () => {
        if(refWolverine.current.classList.contains('leftImg')){
            refWolverine.current.classList.remove('leftImg')
        }else{
            refWolverine.current.classList.remove('rightImg')
        }
    }
    const display = btn && (
        <Fragment>
            <div onMouseOver={setLeftImage} onMouseOut={clearImg} className='leftBox'>
                 <Link className='btn-welcome' to="/signup">Inscription</Link>
            </div>

            <div className='rightBox'>
                <Link onMouseOver={setRightImage} onMouseOut={clearImg} className='btn-welcome' to="login">Connexion</Link>
            </div> 
        </Fragment>
    )

    return (
        <main ref={refWolverine} className='welcomePage'>
            {display}
        </main>
  )
};

export default Landing;
