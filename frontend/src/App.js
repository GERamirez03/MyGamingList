import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import BasicButtons from './BasicButtons';
import SignupForm from './SignupForm';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <BasicButtons/> 
        <SignupForm />
      </BrowserRouter>
    </div>
  );
}

export default App;
