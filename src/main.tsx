import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom';
import {SnackbarProvider} from 'notistack';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider/>
      <App/>
    </BrowserRouter>
  </React.StrictMode>

);
