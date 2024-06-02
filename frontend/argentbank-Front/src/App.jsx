import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './Pages/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <Error />
  },
  { 
    path: 'About',
    element: <About />,
    errorElement: <Error />
  },
  {
    path: 'logements/:id',
    element: <Logements />,
    errorElement: <Error />
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;