import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/cadastro",
      element: <SignUp />,
    },
  ]);
  return <RouterProvider router={router} />;

}

export default App;
