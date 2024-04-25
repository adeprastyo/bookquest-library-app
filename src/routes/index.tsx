import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "@/pages";
import Login from "@/pages/auth/login";
import Dashboard from "@/pages/admin";
import Register from "@/pages/auth/register";
import ProtectedRoutes from "./protected-routes";
import Profile from "@/pages/user/profile";
import EditProfile from "@/pages/user/edit-profile";
import DetailBook from "@/pages/books/detail";
import { ThemeProvider } from "next-themes";

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/books/:id_book", element: <DetailBook /> },
      { path: "/profile", element: <Profile /> },
      { path: "/profile/edit-profile", element: <EditProfile /> },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
