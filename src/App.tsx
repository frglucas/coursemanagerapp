import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Error, Login } from './pages';
import { ToastProvider } from './contexts';
import { LoggedInUserProvider } from './contexts/LoggedInUser.context';

const App = () => {
  return (
    <BrowserRouter>
      <LoggedInUserProvider>
        <ToastProvider>
          <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/error' element={<Error />} />
            <Route path='*' element={<Navigate to={'/error'} />} />
          </Routes>
        </ToastProvider>
      </LoggedInUserProvider>
    </BrowserRouter>
  )
}

export default App;
