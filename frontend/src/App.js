import React from 'react';
import Router from './Router';
import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

function App() {
  return (<>
    <CssBaseline />
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
