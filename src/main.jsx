import { createRoot } from 'react-dom/client'
import './index.css'
import Landing from './LoggedOut/LandingPage.jsx'
import Home from './LoggedIn/Home.jsx'
import Profile from './LoggedIn/body/profile/Profile.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "Home/",
    element: <Home />,
  },
  {
    path: "Profile/:username",
    element: <Profile />,
  },
]);

createRoot(document.getElementById('root')).render(
      <RouterProvider router={router} />
)
