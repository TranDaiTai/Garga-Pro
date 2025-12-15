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
 
//   return (
//     <RouterProvider router={router}
//     />
    
//   );
//   import React, { useState, useRef, useEffect } from 'react';

// const Child = React.memo(({ data }) => {
//   console.log('Child rendered with data:', data);
//   return <div>Count: {data.count}</div>;
// });
  const inital = {
    count : 0, 
  }
  const [parentCount, setParentCount] = useState(inital);
  
  const value = useMemo(() => {
    return {count:10}
  },[]);

  
  useEffect(() => {
    console.log('Parent rendered');

  });

  const handleClick=()=>{
    setParentCount(prev => ({...prev,count:prev.count + 1}));
  }
  
  return (
    <div>
      <h3>Parent Count: {parentCount.count}</h3>
    
      <button onClick={handleClick}>
        Update Ref Value
      </button>
      
      <Child data={value} />
      
    </div>
  );
}

export default App;
