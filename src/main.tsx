import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './Router/Router';
import { AuthProvider } from './Page/Authentication/AutheContext';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
  </AuthProvider>
)