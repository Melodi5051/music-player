import { RouterProvider } from 'react-router-dom';
import './styles/App.css';
import { Router } from './router/Router';
function App() {
  return <RouterProvider router={Router} />;
}

export { App };
