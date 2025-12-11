import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/layout/DefaultLayout";
import {  router} from "./Routes/AppRoutes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <RouterProvider router={router}
    />
  );
}

export default App;
