import React from 'react';
import Router from './Router';
import { Box } from '@mui/material';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
