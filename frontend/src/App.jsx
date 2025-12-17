import { Fragment, useCallback, useMemo ,useState,useRef,useEffect} from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/layout/DefaultLayout";
import { router } from "./Routes/AppRoutes";
import { RouterProvider } from "react-router-dom";


const Child = React.memo(({ data }) => {
  console.log('Child rendered with data:', data.count);

  return <div>Count: {data.count}</div>;
});

function App() {
 
  return (
    <RouterProvider router={router}
    />
    
  );
}

export default App;
