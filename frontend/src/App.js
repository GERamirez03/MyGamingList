import React from 'react';
import Router from './Router';
import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Navbar from "./Navbar";
import { useSelector } from 'react-redux';
import MyGamingListApi from './api';
import UserContext from './userContext';

function App() {

  /** 
   * On App render, initialize an instance of MyGamingListApi
   * helper class with user information in persisted Redux store.
   * 
   * Redux initial state and API Helper constructor have username
   * and token set to null by default.
   * 
   * Store the apiHelper instance in React Context UserContext
   * and provide that context to the rest of the application.
   * 
   * Child components use hook useContext to access apiHelper.
  */

  const username = useSelector(store => store.username);
  const token = useSelector(store => store.token);
  const apiHelper = new MyGamingListApi(token, username);
  console.debug("API Helper:", apiHelper);

  return (
    <>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <main>
            <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <UserContext.Provider value={apiHelper}>
                  <Router />
                </UserContext.Provider>
            </Box>
          </main>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
