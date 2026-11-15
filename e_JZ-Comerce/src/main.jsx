import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; 
import { CarritoProvider } from './Context/CarritoContext.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import { SearchProvider } from './Context/SearchContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
