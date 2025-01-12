import  ReactDOM  from "react-dom/client";
import "./index.css"

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/MainRoute/Header/Header";
import Body from "./components/MainRoute/Body/Body";
import Footer from "./components/MainRoute/Footer.jsx/Footer";
import EventDetails from "./components/MainRoute/EventDetails/EventDetails";
import NonEventDetails from "./components/MainRoute/NonEventDetails/NonEventDetails";
import Register from "./components/MainRoute/Auth/Register";
import Login from "./components/MainRoute/Auth/Login";



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
const root= ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}></RouterProvider>);