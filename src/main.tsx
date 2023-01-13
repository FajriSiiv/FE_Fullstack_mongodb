import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import moment from "moment";
import "moment/dist/locale/id";
import DetailBlog from "./pages/Blog/[detail]";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout";
import EditBlog from "./pages/Blog/[editId]";
import axios from "axios";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import AddBlog from "./pages/Blog/addblog";

axios.defaults.withCredentials = true;

moment().locale("id");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/blog",
    element: (
      <Layout>
        <Blog />
      </Layout>
    ),
  },
  {
    path: "/blog/detail/:detail",
    element: (
      <Layout>
        <DetailBlog />
      </Layout>
    ),
  },
  {
    path: "/blog/edit/:editId",
    element: (
      <Layout>
        <EditBlog />
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/addblog",
    element: (
      <Layout>
        <AddBlog />
      </Layout>
    ),
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
