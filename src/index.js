import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'Base/Context/AuthContext';
import App from 'App';
import 'index.css';
import ErrorBoundary from 'ErrorBoundary';

ReactDOM.render(
  <AuthProvider>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </AuthProvider>,
  document.getElementById('root'),
);
