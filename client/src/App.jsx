import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { ROUTES } from "./utils/routes";
import { checkAuth } from "./utils/auth";

function App() {
  const router = createBrowserRouter([
    {
      path: ROUTES.home,
      element: <Home />,
    },
    {
      path: ROUTES.signup,
      element: <SignUp />,
    },
    {
      path: ROUTES.me,
      element: <h1>Me uhul</h1>,
      loader: () => checkAuth()
    },
    {
      path: ROUTES.posts,
      // element: <RouteAuthenticated pageElement={<h1>Me</h1>} />,
      element: <h1>postssssss</h1>,
      loader: () => checkAuth()
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
