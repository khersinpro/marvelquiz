import React, {Fragment} from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from '../Header';
import Landing from '../Landing';
import ForgetPassword from '../ForgetPassword';
import Footer from '../Footer';
import Welcome from '../Welcome'
import Login from '../Login';
import SignUp from '../SignUp'
import ErrorPage from '../ErrorPage';
import '../../App.css'
import {IconContext} from 'react-icons'


function App() {
  return (
    <Fragment>
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Header />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>

        <Footer />
      </IconContext.Provider>
    </Fragment>
  );
}

export default App;
