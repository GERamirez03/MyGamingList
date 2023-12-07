import React from 'react';
import Router from './Router';
import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Navbar from "./Navbar";

function App() {
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
                <Router />
            </Box>
          </main>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
