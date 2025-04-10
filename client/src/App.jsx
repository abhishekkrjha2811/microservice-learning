 
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./components/Home";
const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  }
])
function App() {
  return (
    <div className="container max-w-6xl mx-auto">

      <RouterProvider router={appRouter}/>

    </div>
  ) 
}

export default App;
