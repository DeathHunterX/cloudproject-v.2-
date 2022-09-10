import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import io from 'socket.io-client'


import PageRender from './customRouter/PageRender';
import PrivateRouter from './customRouter/PrivateRouter';

import Home from './pages/home'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import ForgotPassword from './pages/auth/forgot_password';
import ResetPassword from './pages/auth/reset_password';
import BrowseJobs from './pages/browse';

import Alert from './components/Alert/Alert.js';

import { GLOBALTYPES } from './redux/actions/globalTypes';
import { refreshToken } from './redux/actions/authAction'

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer.jsx';

import SocketClient from './SocketClient';
import PrivacyPolicy from './pages/privacyPolicy';



function App() {
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  
  useEffect(() => {
    dispatch(refreshToken())

    const sockets = io.connect("http://localhost:5000")
    dispatch({type: GLOBALTYPES.SOCKET, payload: sockets})
    return () => sockets.close()
  }, [dispatch])

  
  return (
    <Router>


      <Alert />

      <div className="App">
        <div className="main">

          <Header />
          {auth.token && <SocketClient />}
          <Routes>
            <Route exact path='/' element={ <Home /> } />

            {/* Authentication & Authorization */}
            <Route exact path='/login' element={ <Login /> } />
            <Route exact path='/register' element={ <Register /> } />
            <Route exact path='/forgotPassword' element={ <ForgotPassword /> } />
            <Route exact path='/user/reset/:token' element={ <ResetPassword /> } />
            
            {/* Header */}
            <Route exact path='/browse' element={ <BrowseJobs /> } />



            <Route exact path='/' element={ <PrivateRouter/> }>
              <Route exact path="/:page" element={ <PageRender /> } />
              <Route exact path="/:page/:id" element={ <PageRender /> } />
            </Route>
          
            {/* Footer */}
            <Route exact path="/privacyPolicy" element={ <PrivacyPolicy /> } />
            
          </Routes>
          
          <Footer />

        </div>
      </div> 
    </Router>
  );
}

export default App;
