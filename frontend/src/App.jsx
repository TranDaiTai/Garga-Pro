import React from "react";
import { router } from "./Routes/AppRoutes";
import { RouterProvider } from "react-router-dom";

function App() {
 
  return (
    <RouterProvider router={router}
    />
    
  );
}

export default App;
