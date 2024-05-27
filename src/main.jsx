import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure you're using React 18
import App from './App.jsx'; // Ensure this file exists and is correctly exported
import './index.css'; // Ensure this file exists
import { BrowserRouter } from 'react-router-dom'; // Ensure react-router-dom is installed

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
