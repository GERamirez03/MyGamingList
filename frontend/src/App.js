import React, { useEffect } from 'react';
import Router from './Router';
import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Navbar from "./Navbar";
import { useSelector } from 'react-redux';
import MyGamingListApi from './api';
import UserContext from './userContext';

function App() {

  /** Idea 
   * Check Redux store for user information
   * if there is user/token info there, initialize an apiHelper with that info
   * otherwise, still make an apiHelper with null (null is default for store AND apiHelper constructor!)
   * put that apiHelper in context
   * provide that context to rest of app
   * access apiHelper via context in whatever components need it
  */

  const username = useSelector(store => store.username);
  const token = useSelector(store => store.token);
  const apiHelper = new MyGamingListApi(token, username);
  console.debug(apiHelper);

  /** Other Side
   * how does this affect my login/signup processes?
   * does this affect my login/signup processes?
   */

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
