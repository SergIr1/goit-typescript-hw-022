import React, { StrictMode } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import 'modern-normalize';
import App from './components/App/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
