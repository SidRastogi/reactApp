import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userLoginStateFromLocalStorage = localStorage.getItem('LoginUserState');

  useEffect(() => {
    if (userLoginStateFromLocalStorage === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    localStorage.setItem('LoginUserState', '1');
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.setItem('LoginUserState', '0');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logoutHandler }}>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
