import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import SignupForm from './SignupForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <SignupForm />
      </BrowserRouter>
    </div>
  );
}

export default App;
