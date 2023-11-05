import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import SignupForm from './SignupForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <SignupForm />
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
