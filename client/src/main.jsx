import  ReactDOM  from "react-dom/client";
import "./index.css"
import App from "./App";
import React from "react"



const Applayout = ()=>{
  return(
    <>
      <Header></Header>
      <Body></Body>
      {/* ajfkas */}
      <Footer></Footer>
    </>
  )
}
const  appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Applayout></Applayout>
  },
  {
    path:"/event/:id",
    element:<EventDetails></EventDetails>
  },
  {
    path:"/nonevent/:id",
    element:<NonEventDetails></NonEventDetails>
  },
  {
    path:"/register",
    element:<Register></Register>
  },{
    path:"/login",
    element:<Login></Login>
  }
  
 
])
6093
root= ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);