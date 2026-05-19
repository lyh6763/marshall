import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/reset.css';
import './styles/marshall.css';
import './styles/marshall768.css';
import './styles/marshall1024.css';
import './styles/marshall1920.css';
import './styles/animations.css';
import './styles/react.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
