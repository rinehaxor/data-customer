import RootLayout from '../layouts/RootLayout';
import Home from '../views/Home';
import { createBrowserRouter } from 'react-router-dom';

export const Router = createBrowserRouter([
   {
      path: '/',
      element: <RootLayout />,
      children: [{ path: '/', element: <Home /> }],
   },
]);
