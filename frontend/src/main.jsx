import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Toaster } from "react-hot-toast"
import "bootswatch/dist/lux/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
);
